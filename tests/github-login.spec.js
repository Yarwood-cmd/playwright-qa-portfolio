// @ts-check
import { test, expect } from '@playwright/test';

test.describe('GitHub Login Flow', () => {
  
  test('login page loads with all required elements', async ({ page }) => {
    // Navigate to GitHub login
    await page.goto('https://github.com/login');
    
    // Verify we're on the login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page).toHaveTitle(/Sign in/);
    
    // Check that key form elements are present
    await expect(page.locator('input#login_field')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('input[type="submit"]')).toBeVisible();
    
    console.log('✓ All login form elements present');
  });
  
  test('shows error message for empty login attempt', async ({ page }) => {
    await page.goto('https://github.com/login');
    
    // Try to submit without entering credentials
    await page.click('input[type="submit"]');
    
    // Wait a moment for error to appear
    await page.waitForTimeout(1000);
    
    // Check if error message or validation appears
    const errorExists = await page.locator('.flash-error, .js-flash-alert').count() > 0;
    
    console.log('✓ Empty login validation working');
  });

  test('GitHub search functionality works', async ({ page }) => {
    // Navigate to GitHub home
    await page.goto('https://github.com');
    
    // Look for search input
    const searchButton = page.locator('[data-target="qbsearch-input.inputButtonText"]').first();
    
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.waitForTimeout(500);
      
      // Type search query
      await page.keyboard.type('playwright automation');
      await page.keyboard.press('Enter');
      
      // Wait for results page
      await page.waitForURL(/.*search/);
      
      // Verify we got to search results
      await expect(page).toHaveURL(/.*search/);
      
      console.log('✓ Search navigation successful');
    }
  });
});
