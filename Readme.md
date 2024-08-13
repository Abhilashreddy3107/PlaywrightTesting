# Playwright YouTube Search Test Suite

This repository contains an automated test suite for testing the search feature on [YouTube](https://www.youtube.com) using [Playwright](https://playwright.dev/).

## Prerequisites

Before running the tests, ensure that the following software is installed on your system:

1. Node.js: [Download and install Node.js](https://nodejs.org/)
2. Visual Studio Code (VS Code): [Download and install VS Code](https://code.visualstudio.com/)

## Project Setup

Follow these steps to set up the Playwright project:

1. Create a Project Folder:
   - Open your terminal or command prompt.
   - Create a new project folder and navigate into it.
     ```bash
     		mkdir playwright-youtube-test
     		cd playwright-youtube-test

     ```

2. Initialize the Playwright Project:
   - Run the following command to initialize a new Playwright project:
     ```bash
     npm init playwright@latest
     ```
   - Follow the prompts to set up the project. This will generate the necessary files, including `package.json`, `playwright.config.js`, and a `tests` directory.

3. Install Playwright:
   - Playwright should already be installed during the initialization step. You can verify the installation by checking the Playwright version:
     ```bash
     npx playwright -v
     ```
   - If Playwright is not installed, you can manually install it using:
     ```bash
     npm install @playwright/test
     ```

## Running the Tests

To run the Playwright test suite for the YouTube search feature:

1. Open Terminal:
   - Open the terminal in VS Code or your command prompt.

2. Run the Tests:
   - Use the following command to run the tests in Chromium (or any other browser by replacing `chromium` with `firefox` or `webkit`):
     ```bash
     npx playwright test --project=chromium --headed
     ```
   - This command will execute the tests in a visible browser window (`--headed`).

3. View Test Reports:
   - After the tests complete, you can view the test report by running:
     ```bash
     npx playwright show-report
     ```
   - This will open an HTML report in your default browser, showing the results of the tests.

## Test Structure

The test suite is organized as follows:

- `tests/youtube-search.test.js`: Contains test cases for various aspects of the YouTube search feature, including typing in the search bar, handling search suggestions, navigating through search results, and more.

## Customizing the Configuration

You can customize the Playwright configuration by modifying the `playwright.config.js` file. This file allows you to specify test options, browser settings, and more.

## Troubleshooting

If you encounter any issues, make sure to:

- Verify that Node.js and Playwright are correctly installed.
- Check that your project folder contains the necessary files (`package.json`, `playwright.config.js`, etc.).
- Ensure that you are running the tests from the correct directory.

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Node.js Documentation](https://nodejs.org/en/docs/)

