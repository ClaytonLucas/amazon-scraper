// backend/scraper.js
import puppeteer from "puppeteer";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

export default async function scrapeAmazon(keyword) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0 Safari/537.36");

    await page.goto(url, { waitUntil: "networkidle2" });

    const html = await page.content();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');

    const products = [];

    productElements.forEach((product) => {
      const title = product.querySelector("h2 span")?.textContent?.trim();
      const rating = product.querySelector(".a-icon-alt")?.textContent?.trim();
      const reviews = product.querySelector(".a-size-base.s-underline-text")?.textContent?.trim();
      const image = product.querySelector("img")?.src;

      if (title && image) {
        products.push({ title, rating, reviews, image });
      }
    });

    return products;
  } catch (error) {
    console.error("Erro no scraping:", error.message);
    throw new Error("Erro ao coletar dados da Amazon");
  } finally {
    if (browser) await browser.close();
  }
}
