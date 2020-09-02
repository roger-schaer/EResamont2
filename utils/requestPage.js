import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";

import ENV from "../env";

const eresamontURL = ENV.ERESAMONT_BACKEND_URL;

export const UPDATE_TIMESTAMP_KEY = "updateTimestamp";
export const TOP_LEVEL_PAGES_KEY = "topLevelPages";
export const HIDDEN_PAGE_IDS = [138];

export default class requestPage {
  static async checkConnection() {
    console.log("Checking online connection");
    let info = await NetInfo.fetch();
    if (info) {
      return info;
    }
  }
  static async fetchPageTree() {
    console.log("=====================================");
    console.log("Fetching page tree");
    await this.checkConnection();
    try {
      let response = await fetch(`${eresamontURL}/pages/tree`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      let timestamp = new Date().getTime();
      console.log("Page tree fetched at UNIX: " + timestamp);
      let responseJson = await response.json();
      let topLevelPageIDs = responseJson.map((page) => page.id);
      // let filteredTopLevelPageIDs = topLevelPageIDs.filter(
      //   (id) => !HIDDEN_PAGE_IDS.includes(id)
      // );
      await AsyncStorage.setItem(
        TOP_LEVEL_PAGES_KEY,
        JSON.stringify(topLevelPageIDs)
      );
    } catch (e) {
      console.log(e);
    }
  }
  static async fetchAllPages() {
    console.log("=====================================");
    console.log("Fetching online data");
    await this.checkConnection();
    try {
      let response = await fetch(`${eresamontURL}/pages`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      let timestamp = new Date().getTime();
      console.log("Online data fetched at UNIX: " + timestamp);
      await AsyncStorage.setItem(UPDATE_TIMESTAMP_KEY, timestamp.toString()); //Store timestamp
      return response.json();
    } catch (e) {
      console.error(e);
    }
  }

  static async fetchUpdatedContent(timestamp) {
    console.log("=====================================");
    console.log("Trying to fetch new online data since last timestamp");
    if (timestamp === null) {
      timestamp = await AsyncStorage.getItem(UPDATE_TIMESTAMP_KEY);
      console.log("Last timestamp: " + timestamp);
      timestamp = parseInt(timestamp);
    }
    try {
      let response = await fetch(`${eresamontURL}/pages?updated=` + timestamp, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
}

// Page id cheatsheet
// 86 In Case of Emergency
// 85 Medical Guide
// 136 SOS MAM
// 88 Mountain Meds Consultation works
// 126 Questionnaires some button in Italian
// 129 News
// 133 About

//const convertUnixTime = unixTimestamp => {
//   var date = new Date(unixTimestamp / 1000);
//   console.log(unixTimestamp / 1000);
//   console.log(date.toLocaleString());
//   var minutes = "0" + date.getMinutes();
//   var seconds = "0" + date.getSeconds();
//   var convertedTime =
//     date.getMonth() +
//     "-" +
//     date.getDate() +
//     "-" +
//     date.getFullYear() +
//     " " +
//     date.getHours() +
//     ":" +
//     minutes +
//     ":" +
//     seconds;
//   return convertedTime;
// };

// static async fetchPage(id) {
//   try {
//     let response = await fetch(`${eresamontURL}/pages/` + id, {
//       method: "GET",
//       headers: {
//         Accept: "application/json"
//       }
//     });
//     return await response.json();
//   } catch (e) {
//     console.error(e);
//   }
// }
