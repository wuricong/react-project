import puppeteer from "puppeteer";

const browserLaunch = async (url) => {
  const browser = await puppeteer.launch({
    headless: false, //是否隐藏浏览器窗口
    defaultViewport: {
      width: 0,
      height: 0,
    },
  });
  const page = await browser.newPage();
  await page.goto(url);
  return { page, browser };
};

browserLaunch("https://www.douyin.com/search/%E7%83%AD%E6%90%9C%E6%A6%9C");
