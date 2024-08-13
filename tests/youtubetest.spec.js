// youtube-search.test.js
const { test, expect } = require('@playwright/test');

test.describe('YouTube Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.youtube.com');
  });

  test('searching for a video using the search bar and verify result', async ({ page }) => {
    // Click on the search button (before entering text)
    await page.locator('//*[@id="search-icon-legacy"]').click();
    await page.locator('input#search').type('playwright', { delay: 80 });
    await page.waitForSelector('//*[@id="search-icon-legacy"]', { state: 'visible' });
    await page.click('//*[@id="search-icon-legacy"]');
    const firstVideoTitle = await page.locator('h3.title-and-badge').first().textContent();
    expect(firstVideoTitle.toLowerCase()).toContain('playwright');
  });

  test('should search for a video using the search bar clicking Enter button ', async ({ page }) => {
    await page.type('input#search', 'Playwright tutorial', { delay: 80 });
    await page.press('input#search', 'Enter', { delay: 1000 });
    await expect(page).toHaveURL(/results\?search_query=[Pp]laywright\+tutorial/);
    const firstVideoTitle = await page.locator('h3.title-and-badge').first().textContent();
    expect(firstVideoTitle.toLowerCase()).toContain('playwright');
  });

  test('Search by clicking on a suggestions', async ({ page }) => {
    await page.click('input#search');
    // Type 'Playwri' with a delay of 600ms between keystrokes
    await page.type('input#search', 'Playwri', { delay: 60 });
    await page.waitForSelector('ul[role="listbox"]');
    await page.waitForTimeout(2000);
    await page.click('ul[role="listbox"] > li:first-child');
    await expect(page).toHaveURL(/results\?search_query=/);
  });

  test('Clearing search input from search bar', async ({ page }) => {
    await page.type('input#search', 'Playwright', { delay: 600});
    await page.evaluate(() => {
      const input = document.querySelector('input#search');
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    });
    await page.click('#search-clear-button');
    await expect(page.locator('input#search')).toBeEmpty();
  });

  test('navigating search suggestions using keyboard arrows and search automatically', async ({ page }) => {
    // Focus on the search input
    await page.click('input#search');
    await page.type('input#search', 'Playwright', { delay: 60 });
    // Wait for 1000 milliseconds before navigating through suggestions
    await page.waitForTimeout(2000);
    await page.press('input#search', 'ArrowDown');
    await page.waitForTimeout(2000);
    await page.press('input#search', 'ArrowDown');
    await page.press('input#search', 'Enter');
    // Verify the URL is updated correctly after the search
    await expect(page).toHaveURL(/results\?search_query=[Pp]laywright/);
  });

  test('Handling empty search bar ', async ({ page }) => {
    await page.click('//*[@id="search-icon-legacy"]');
    // The URL to remain the same or show some error/validation
    await expect(page).toHaveURL('https://www.youtube.com/');
    
    });
    
    test('Displaying a Certain number of Search results', async ({ page }) => {
        await page.type('input#search', 'Playwright tutorial', { delay: 100 });
        await page.press('input#search', 'Enter');
        await page.waitForTimeout(2000);
        await page.waitForSelector('ytd-video-renderer');
        await page.waitForTimeout(1000);
        const resultCount = await page.locator('ytd-video-renderer').count();        
        expect(resultCount).toBeGreaterThan(0);
    });


    test('Showing suggestions while typing in search bar', async ({ page }) => {
        await page.click('input#search');
        await page.type('input#search', 'Playwright', { delay: 60 });
        // Verify that the suggestions dropdown is visible
        await expect(page.locator('ul[role="listbox"]')).toBeVisible();
    });

    test('Navigating back to the homepage after searching', async ({ page }) => {
        await page.type('input#search', 'Playwright tutorial', { delay: 60 });
        await page.press('input#search', 'Enter');
        await page.waitForTimeout(1000);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await page.goBack(); // Expect to be back on the YouTube homepage
        await expect(page).toHaveURL('https://www.youtube.com/');
    });

    test('Searching with Special Characters', async ({ page }) => {
        await page.type('input#search', '@#*&^%$ Playwright', { delay: 10 });
        await page.press('input#search', 'Enter');
        await page.waitForTimeout(1000);
        await page.waitForSelector('ytd-video-renderer');     // Verify search results are displayed
        await page.waitForTimeout(1000);
        const resultCount = await page.locator('ytd-video-renderer').count();
        await page.waitForTimeout(1000);
        expect(resultCount).toBeGreaterThan(0);
      });

    test('Search using a long text', async ({ page }) => {
        const longQuery = 'Playwright '.repeat(10);
        await page.type('input#search', longQuery, { delay: 1 });
        await page.press('input#search', 'Enter');
        await page.waitForTimeout(1000);
        await page.waitForSelector('ytd-video-renderer');        // Verify search results are displayed
        await page.waitForTimeout(1000);
        const resultCount = await page.locator('ytd-video-renderer').count();
        await page.waitForTimeout(1000);
        expect(resultCount).toBeGreaterThan(0);
    });

    test('Going back after Playing or click on a video', async ({ page }) => {
        await page.type('input#search', 'Playwright tutorial', { delay: 60 });
        await page.press('input#search', 'Enter');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await page.locator('ytd-video-renderer').first().click();
        await page.waitForTimeout(1000);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Wait for 2 seconds (2000 milliseconds)
        await page.goBack();
        await page.waitForTimeout(2000); // Wait for 2 seconds (2000 milliseconds)
        const searchQuery = await page.locator('input#search').inputValue();
        expect(searchQuery).toBe('Playwright tutorial');
      });

    test('Testing the Functionality in different Screen sizes (Responsive Design)', async ({ page }) => {
        const viewports = [
            { width: 1280, height: 720 }, // Desktop
            { width: 768, height: 1024 }, // Tablet
            // { width: 375, height: 667 }  // Mobile
        ];
    
        for (const viewport of viewports) {
            await page.setViewportSize(viewport);
            await page.goto('https://www.youtube.com');
            await page.waitForTimeout(1000);
            await page.locator('input#search').fill('');
            await page.type('input#search', 'Playwright', { delay: 100 });
            await page.press('input#search', 'Enter');
            try {
            await page.waitForSelector('ytd-video-renderer', { timeout: 10000 }); // Increase timeout if needed
            await page.waitForTimeout(1000);
            const resultCount = await page.locator('ytd-video-renderer').count();
            expect(resultCount).toBeGreaterThan(0);
            await page.waitForTimeout(1000);
            } catch (error) {
            console.error(`Error for viewport ${viewport.width}x${viewport.height}:`, error);
            throw error;
            }
            await page.goto('https://www.youtube.com');
        }
        });

    test('handling a  case-insensitive searches', async ({ page }) => {
        await page.type('input#search', 'PLAYWRIGHT', { delay: 100 });
        await page.waitForTimeout(1000);
        await page.press('input#search', 'Enter');
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/results\?search_query=PLAYWRIGHT/);
        await page.waitForTimeout(1000);
        const firstVideoTitle = await page.locator('h3.title-and-badge').first().textContent();
        expect(firstVideoTitle.toLowerCase()).toContain('playwright');
    });

});
