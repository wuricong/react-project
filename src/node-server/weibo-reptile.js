import puppeteer from "puppeteer";

const browserLaunch = async (url) => {
  const browser = await puppeteer.launch({
    headless: true, //是否隐藏浏览器窗口
    defaultViewport: {
      width: 0,
      height: 0,
    },
  });
  const page = await browser.newPage();
  await page.goto(url);
  return { page, browser };
};

//获取微博热搜榜单
export async function getHostInfo() {
  const { page, browser } = await browserLaunch(
    "https://s.weibo.com/top/summary?cate=realtimehot",
  );

  await page.waitForSelector(".data");
  const res = await page.$eval(".data", (el) => {
    //客户端运行的回调
    const list = el.querySelectorAll(".td-02 a");
    return [...list]?.map((li, index) => ({ index, context: li.innerText }));
  });
  await browser.close();
  return res;
}

//获取福布斯香港富豪榜
export async function getForbesReportList() {
  const { page, browser } = await browserLaunch(
    "https://www.forbeschina.com/lists/1816",
  );

  await page.waitForSelector(".dataTable");
  const res = await page.$eval(".dataTable", (el) => {
    const reportList = [];
    //客户端运行的回调
    const trList = el.querySelectorAll("tr");
    [...trList]?.forEach((li) => {
      const tdList = li.querySelectorAll("td");
      reportList?.push([...tdList].map((td) => td.innerText));
    });
    return reportList;
  });
  await browser.close();
  return res.filter((item) => item.length > 1);
}

export async function getCNForbesReportList() {
  const { page, browser } = await browserLaunch(
    "https://www.forbeschina.com/lists/1839",
  );

  await page.waitForSelector(".dataTable");
  const res = await page.$eval(".dataTable", (el) => {
    const reportList = [];
    //客户端运行的回调
    const trList = el.querySelectorAll("tr");
    [...trList]?.forEach((li) => {
      const tdList = li.querySelectorAll("td");
      reportList?.push([...tdList].map((td) => td.innerText));
    });
    return reportList;
  });
  await browser.close();
  return res.filter((item) => item.length > 1);
}

export async function getExchange() {
  const { page, browser } = await browserLaunch(
    "https://iftp.chinamoney.com.cn/chinese/bkccpr",
  );

  await page.waitForSelector(".san-datasheet");
  const res = await page.$eval(".san-datasheet", (el) => {
    const sheet1 = el.querySelectorAll(".san-sheet-col-2 tbody tr");
    const sheet2 = el.querySelectorAll(".san-sheet-col-1 tbody tr");
    const arr = [];
    sheet1.forEach((item) => {
      const list = item.querySelectorAll("td");
      arr.push([...list].map((i) => i.innerText));
    });
    sheet2.forEach((item) => {
      const list = item.querySelectorAll("td");
      arr.push([...list].map((i) => i.innerText));
    });
    return arr.filter((item) => item.length > 1);
  });
  await browser.close();
  return res;
}
