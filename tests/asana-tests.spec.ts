import { test, expect } from '@playwright/test';

//Login Automation
async function login(page) {
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
};

//Navigation helper
async function navigate(page, section: string) {
    await page.click(`text=${section}`)
};
// Task and Tag verification 
async function taskValidator(page, column: string, task: string, tags: string[]) {
    const taskLocator = page.locator('xpath=//*[@id="root"]/div/div[2]/main/div/div/div[1]/h2');
    await expect(taskLocator).toBeVisible();

    for (const tag of tags) {
        const tagLocator = page.locator('xpath=//*[@id="root"]/div/div[2]/main/div/div/div[1]/div/div[1]/div[1]');
        await expect(tagLocator).toBeVisible();
    }
};

test.describe('Asana Demo App', () => {
    test('Test One: Verify "Implemet user authentication" in web application', async ({page}) => {
        await login(page);
        await navigate(page, 'Web Application');
        await taskValidator(page, 'To Do', 'Implement user authentication', ['Feature', 'High Priority']);
    });

    test('Test Two Verify "Fix navigation bug" in Web Application', async ({page}) => {
        await login(page);
        await navigate(page, 'Web Application');
        await taskValidator(page, 'To Do', 'Fix navigation bug', ['Bug']);
    });

    test('Test Case 3: Verify "Design system updates" in Web Application', async ({ page }) => {
        await login(page);
        await navigate(page, 'Web Application');
        await taskValidator(page, 'In Progress', 'Design system updates', ['Design']);
    });

    test('Test Case 4: Verify "Push notification system" in Mobile Application', async ({ page }) => {
        await login(page);
        await navigate(page, 'Mobile Application');
        await taskValidator(page, 'To Do', 'Push notification system', ['Feature']);
    });

    test('Test Case 5: Verify "Offline mode" in Mobile Application', async ({ page }) => {
        await login(page);
        await navigate(page, 'Mobile Application');
        await taskValidator(page, 'In Progress', 'Offline mode', ['Feature', 'High Priority']);
    });

    test('Test Case 6: Verify "App icon design" in Mobile Application', async ({ page }) => {
        await login(page);
        await navigate(page, 'Mobile Application');
        await taskValidator(page, 'Done', 'App icon design', ['Design']);
    });
});