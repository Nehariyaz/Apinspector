import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function reportPageTest() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    console.log("Navigating to report page...");
    await driver.get('http://localhost:5173/report');

    // Simulate login token if needed
    await driver.executeScript(`localStorage.setItem('token', 'your-valid-jwt-token')`);
    await driver.navigate().refresh();

    // Wait for the page to load
    await driver.wait(until.elementLocated(By.css('h1')), 10000);

    // Set date range
    const fromInput = await driver.findElement(By.xpath("//label[text()='From']/following-sibling::input"));
    const toInput = await driver.findElement(By.xpath("//label[text()='To']/following-sibling::input"));

    await fromInput.clear();
    await fromInput.sendKeys('2025-03-01');

    await toInput.clear();
    await toInput.sendKeys('2025-03-13');

    // Click Apply button
    const applyBtn = await driver.findElement(By.xpath("//button[text()='Apply']"));
    await applyBtn.click();

    // Give time for either alert or results to show
    await driver.sleep(2000);

    // Try to detect alert
    try {
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      console.log("Alert appeared:", alertText);
      await alert.accept();
    } catch (err) {
      console.log("No alert. Verifying results...");

      const successRateEl = await driver.wait(
        until.elementLocated(By.xpath("//h3[text()='Success Rate']/following-sibling::div")),
        5000
      );
      const passedEl = await driver.findElement(By.xpath("//h3[text()='Tests Passed']/following-sibling::div"));
      const failedEl = await driver.findElement(By.xpath("//h3[text()='Tests Failed']/following-sibling::div"));

      const successRate = await successRateEl.getText();
      const passed = await passedEl.getText();
      const failed = await failedEl.getText();

      console.log("Success Rate:", successRate);
      console.log("Tests Passed:", passed);
      console.log("Tests Failed:", failed);
    }

    console.log("✅ Report page test completed");

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await driver.quit();
  }
})();
