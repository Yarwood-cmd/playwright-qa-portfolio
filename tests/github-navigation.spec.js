// @ts-check
import { test, expect } from '@playwright/test';

test.describe('GitHub Repository Navigation', () => {
  
  test('can navigate directly to Playwright repository', async ({ page }) => {
    // Go directly to Playwright repo
    await page.goto('https://github.com/microsoft/playwright');
    
    // Verify we're on the right page by checking URL
    await expect(page).toHaveURL(/microsoft\/playwright/);
    
    // Verify page title contains playwright
    await expect(page).toHaveTitle(/playwright/i);
    
    console.log('✓ Repository page loaded successfully');
  });
  
  test('can navigate to Issues tab', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    
    // Click Issues - use a more flexible selector
    await page.locator('a[href="/microsoft/playwright/issues"]').first().click();
    
    // Verify we're on issues page
    await expect(page).toHaveURL(/microsoft\/playwright\/issues/);
    
    console.log('✓ Successfully navigated to Issues');
  });
  
  test('can navigate to Pull Requests tab', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    
    // Click Pull Requests
    await page.locator('a[href="/microsoft/playwright/pulls"]').first().click();
    
    // Verify we're on pull requests page
    await expect(page).toHaveURL(/microsoft\/playwright\/pulls/);
    
    console.log('✓ Successfully navigated to Pull Requests');
  });
  
  test('can view issues list', async ({ page }) => {
    // Go directly to issues page
    await page.goto('https://github.com/microsoft/playwright/issues');
    
    // Verify we're on the issues page
    await expect(page).toHaveURL(/microsoft\/playwright\/issues/);
    
    // Verify page loaded (check title)
    await expect(page).toHaveTitle(/Issues.*playwright/i);
    
    console.log('✓ Issues list page loaded');
  });
});
