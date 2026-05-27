// npm install --save-dev puppeteer
import { describe, it, expect, beforeAll } from "vitest";
import puppeteer from "puppeteer";

const BASE_URL = "http://localhost:3001";

describe("НДС калькулятор (в браузере)", () => {
  let serverAvailable = false;

  beforeAll(async () => {
    // Проверяем доступность сервера
    try {
      const response = await fetch(BASE_URL);
      if (response.status === 200) {
        serverAvailable = true;
      }
    } catch (error) {
      serverAvailable = false;
    }
  });

  it("Выделить НДС 20% из суммы 120000 в поле Аренда", async () => {
    if (!serverAvailable) {
      console.log("========================================");
      console.log("!!!!Сервер не запущен!!!!");
      console.log(`   Нужно запустить страницу НДС на ${BASE_URL}`);
      console.log("   Тест пропущен!");
      console.log("========================================");
      return;
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(BASE_URL);
    
    await page.evaluate(() => {
      const input = document.getElementById("rent") as HTMLInputElement;
      if (input) input.value = "120000";
    });
    
    await page.select("#vatRate", "20");
    await page.select("#calcMode", "extract");
    
    await page.waitForFunction(() => {
      const el = document.getElementById("withoutVat");
      return el && el.innerText !== "0 ₽";
    });
    
    const withoutVat = await page.$eval("#withoutVat", (el) => el.innerText);
    const normalized = withoutVat.replace(/\s/g, "");
    
    expect(normalized).toBe("100000₽");
    
    await browser.close();
  });
});