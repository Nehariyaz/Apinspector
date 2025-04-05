import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function homepageTest() {
  const options = new chrome.Options();
  options.addArguments('--headless'); // run headless
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    console.log("Navigating to login page...");
    await driver.get('http://localhost:5173/login');

    const heading = await driver.wait(until.elementLocated(By.css('h2.login-text')), 10000);
    const text = await heading.getText();

    console.log("Heading Text:", text);

    if (text.includes("Enter Your Credentials")) {
      console.log("Test Passed!");
    } else {
      console.log("Test Failed: Unexpected heading text");
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await driver.quit();
  }
})();
