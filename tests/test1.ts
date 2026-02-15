import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

(async () => {
  console.log("Starting Selenium...");

  const options = new chrome.Options();
  options.addArguments("--start-maximized");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    console.log("Opening browser...");

    await driver.get("http://localhost:3001");

    console.log("Page opened");

    await driver.sleep(5000);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("Closing browser");
    await driver.quit();
  }
})();
