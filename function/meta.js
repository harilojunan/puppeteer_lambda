const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  await page.goto("https://spacejelly.dev/");

  const page = await browser.newPage();

  const title = await page.title();
  const description = await page.$eval(
    'meta[name="description"]',
    (element) => element.content
  );

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "Ok",
      page: {
        title,
        description,
      },
    }),
  };
};
