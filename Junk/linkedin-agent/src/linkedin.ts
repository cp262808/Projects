import { chromium, Browser, BrowserContext, Page } from "playwright";
import path from "path";
import fs from "fs";

const STORAGE_STATE_PATH = path.join(__dirname, "../storageState.json");

export async function loginToLinkedIn() {
    console.log("Opening LinkedIn for manual login...");
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.linkedin.com/login");

    console.log("Please log in manually. The script will save your session once you are logged in.");
    
    // Wait for the user to log in - detect by looking for the global navigation bar
    await page.waitForSelector(".global-nav", { timeout: 300000 }); // 5 minutes timeout

    console.log("Login detected! Saving session state...");
    await context.storageState({ path: STORAGE_STATE_PATH });
    console.log(`Session saved to ${STORAGE_STATE_PATH}`);

    await browser.close();
}

export async function postToLinkedIn(content: string) {
    if (!fs.existsSync(STORAGE_STATE_PATH)) {
        throw new Error("No session state found. Please run the login command first.");
    }

    console.log("Starting LinkedIn auto-poster...");
    const browser = await chromium.launch({ headless: true }); // Can be true once session is saved
    const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
    const page = await context.newPage();

    try {
        await page.goto("https://www.linkedin.com/feed/");
        
        // Wait for the "Start a post" button
        console.log("Waiting for post button...");
        await page.waitForSelector(".share-box-feed-entry__trigger, button.artdeco-button--muted.display-flex.align-items-center");
        await page.click(".share-box-feed-entry__trigger, button.artdeco-button--muted.display-flex.align-items-center");

        // Wait for the editor
        console.log("Typing post content...");
        await page.waitForSelector(".ql-editor");
        await page.fill(".ql-editor", content);

        // Slow down slightly to appear more human
        await page.waitForTimeout(2000);

        // Click "Post"
        console.log("Clicking Post button...");
        // The post button usually has the text "Post" or is a primary button
        const postButton = page.locator("button.share-actions__post-button, .share-box_actions button.artdeco-button--primary");
        await postButton.click();

        console.log("Post submitted successfully!");
        await page.waitForTimeout(5000); // Wait for post to settle
    } catch (error) {
        console.error("Error during posting:", error);
        // Take a screenshot for debugging
        await page.screenshot({ path: "error-screenshot.png" });
        throw error;
    } finally {
        await browser.close();
    }
}
