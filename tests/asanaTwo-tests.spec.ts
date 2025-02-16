//This a condensed verison of the tests from asana-tests.spec.ts

import { test, expect } from '@playwright/test';

// Test data in JSON format
const testCases = [
    {
        name: 'Verify user authentication task',
        section: 'Web Application',
        task: 'Implement user authentication',
        column: 'To Do',
        tags: ['Feature', 'High Priority']
    },
    {
        name: 'Verify navigation bug task',
        section: 'Web Application',
        task: 'Fix navigation bug',
        column: 'To Do',
        tags: ['Bug']
    },
    {
        name: 'Verify design system updates',
        section: 'Web Application',
        task: 'Design system updates',
        column: 'In Progress',
        tags: ['Design']
    },
    {
        name: 'Verify push notification system task',
        section: 'Mobile Application',
        task: 'Push notification system',
        column: 'To Do',
        tags: ['Feature']
    },
    {
        name: 'Verify offline mode task',
        section: 'Mobile Application',
        task: 'Offline mode',
        column: 'In Progress',
        tags: ['Feature', 'High Priority']
    },
    {
        name: 'Verify app icon design task',
        section: 'Mobile Application',
        task: 'App icon design',
        column: 'Done',
        tags: ['Design']
    }
];

// Login function
async function login(page) {
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
}

test.describe('Asana Demo App Tests', () => {
    testCases.forEach(({ name, section, task, column, tags }) => {
        test(name, async ({ page }) => {
            // Perform login
            await login(page);
            
            // Navigate to section
            await page.click(`text=${section}`);
            await page.waitForLoadState('networkidle');
            
            // Verify task is in correct column
            const taskLocator = page.locator('xpath=//*[@id="root"]/div/div[2]/main/div/div/div[1]/h2');
            await expect(taskLocator).toBeVisible();
            
            // Verify tags
            for (const tag of tags) {
                const tagLocator = page.locator('xpath=//*[@id="root"]/div/div[2]/main/div/div/div[1]/div/div[1]/div[1]');
                await expect(tagLocator).toBeVisible();
            }
        });
    });
});