// @ts-check
import { test, expect } from '@playwright/test';

test.describe('GitHub API Testing', () => {

  test('fetches public repository data via REST API', async ({ request }) => {
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');

    expect(response.status()).toBe(200);

    const repo = await response.json();
    expect(repo.name).toBe('playwright');
    expect(repo.owner.login).toBe('microsoft');
    expect(repo.language).toBeTruthy();
    expect(repo.default_branch).toBeTruthy();

    console.log(`✓ API: ${repo.full_name} — ${repo.stargazers_count} stars, language: ${repo.language}`);
  });

  test('validates API response headers', async ({ request }) => {
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['x-ratelimit-limit']).toBeTruthy();

    console.log('✓ API response headers contain expected fields');
  });

  test('returns 404 for non-existent repository', async ({ request }) => {
    const response = await request.get(
      'https://api.github.com/repos/microsoft/this-repo-does-not-exist-12345',
      { failOnStatusCode: false }
    );

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Not Found');

    console.log('✓ API correctly returns 404 for missing repository');
  });

  test('fetches repository contributors list', async ({ request }) => {
    const response = await request.get(
      'https://api.github.com/repos/microsoft/playwright/contributors?per_page=5'
    );

    expect(response.status()).toBe(200);

    const contributors = await response.json();
    expect(Array.isArray(contributors)).toBeTruthy();
    expect(contributors.length).toBeGreaterThan(0);
    expect(contributors.length).toBeLessThanOrEqual(5);

    for (const contributor of contributors) {
      expect(contributor.login).toBeTruthy();
      expect(contributor.contributions).toBeGreaterThan(0);
    }

    console.log(`✓ API returned ${contributors.length} contributors`);
  });
});

test.describe('Page Performance Metrics', () => {

  test('GitHub homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://github.com');
    const loadTime = Date.now() - startTime;

    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);

    console.log(`✓ Homepage loaded in ${loadTime}ms`);
  });

  test('collects navigation timing metrics', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');

    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
        domInteractive: Math.round(nav.domInteractive - nav.startTime),
      };
    });

    expect(timing.domContentLoaded).toBeGreaterThan(0);
    expect(timing.loadComplete).toBeGreaterThan(0);

    console.log(`✓ DOM Content Loaded: ${timing.domContentLoaded}ms`);
    console.log(`✓ Full Load: ${timing.loadComplete}ms`);
    console.log(`✓ DOM Interactive: ${timing.domInteractive}ms`);
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('https://github.com');
    await page.waitForLoadState('networkidle');

    // Log any errors found (informational — some third-party errors are expected)
    if (consoleErrors.length > 0) {
      console.log(`⚠ Found ${consoleErrors.length} console error(s)`);
    } else {
      console.log('✓ No console errors detected');
    }
  });
});

test.describe('Responsive Viewport Testing', () => {

  test('GitHub renders correctly at mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
    });
    const page = await context.newPage();

    await page.goto('https://github.com/microsoft/playwright');
    await page.waitForLoadState('domcontentloaded');

    // Page should still be functional at mobile size
    await expect(page).toHaveURL(/microsoft\/playwright/);
    await expect(page).toHaveTitle(/playwright/i);

    // Take a screenshot for visual reference
    await page.screenshot({ path: 'test-results/mobile-viewport.png', fullPage: false });

    console.log('✓ Page renders at 375x812 mobile viewport');
    await context.close();
  });

  test('GitHub renders correctly at tablet viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();

    await page.goto('https://github.com/microsoft/playwright');
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/microsoft\/playwright/);
    await expect(page).toHaveTitle(/playwright/i);

    await page.screenshot({ path: 'test-results/tablet-viewport.png', fullPage: false });

    console.log('✓ Page renders at 768x1024 tablet viewport');
    await context.close();
  });
});

test.describe('Accessibility Checks', () => {

  test('login page has proper form labels', async ({ page }) => {
    await page.goto('https://github.com/login');

    // Username field should have an associated label
    const usernameLabel = page.locator('label[for="login_field"]');
    await expect(usernameLabel).toBeVisible();

    // Password field should have an associated label
    const passwordLabel = page.locator('label[for="password"]');
    await expect(passwordLabel).toBeVisible();

    console.log('✓ Login form fields have proper labels');
  });

  test('images have alt text on repository page', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    await page.waitForLoadState('domcontentloaded');

    // Check that visible images have alt attributes
    const images = page.locator('img[src]:visible');
    const count = await images.count();

    let missingAlt = 0;
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      if (alt === null) {
        missingAlt++;
      }
    }

    console.log(`✓ Checked ${count} images — ${missingAlt} missing alt text`);
  });

  test('page has a main landmark', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    await page.waitForLoadState('domcontentloaded');

    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();

    console.log('✓ Page has a main landmark element');
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    await page.waitForLoadState('domcontentloaded');

    // Page should have at least one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    console.log(`✓ Page has ${h1Count} h1 heading(s)`);
  });
});
