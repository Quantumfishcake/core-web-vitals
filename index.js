import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";
import testUrls from "./urls.js";
import firebasePush from "./firebasePush.js";

import getClientList from "./getClientList.js";

import randomArrayValue from "./helpers.js";


const getLighthouseScore = async (url, client, pageType) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(url, options);
  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  let score = (
    runnerResult.lhr.categories.performance.score * 100
  ).toFixed(2);
  await chrome.kill();
  if (pageType === "smartPage") {
    return {score, reportHtml};
  }else {
    return {score};
  }
};

async function getLighthouseScores() {
  const clientList = await getClientList();
  console.log(clientList);
  for (const client of clientList) {
    const smartPageUrl = randomArrayValue(client.smartpages);
    const categoryPageUrl = client.categorypage;
    const clientName = client.name;
    const client_id = client.client_id;
    let smartPageScore = await getLighthouseScore(
      smartPageUrl,
      clientName,
      "smartPage"
    );
    let categoryPageScore = await getLighthouseScore(
      categoryPageUrl,
      clientName,
      "categoryPage"
    );
    console.log(smartPageScore.score)
    firebasePush({ clientName, client_id, smartPageScore, categoryPageScore });
  }
}

getLighthouseScores();
