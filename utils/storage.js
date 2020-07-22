import React from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as FileSystem from "expo-file-system";
// const filePath = FileSystem.documentDirectory + "data.txt";
const filePath = FileSystem.documentDirectory;
import jsonFhirConverter from "./jsonFhirConverter";
import { TOP_LEVEL_PAGES_KEY } from "./requestPage";

const FILE_LIST_PATH = filePath + "index.json";

function getFilePathForID(id) {
  return `${filePath}page-${id}.txt`;
}

export default class storage {
  static async checkStoragePages() {
    console.log("=====================================");
    console.log("Checking for local data");
    let result = true;
    let tlp = await AsyncStorage.getItem(TOP_LEVEL_PAGES_KEY);

    // Not stored the top-level pages yet, no local data
    if (tlp === null) {
      console.log("Top-level pages item doesn't exist");
      return false;
    }

    for (let pageID of JSON.parse(tlp)) {
      let info = await FileSystem.getInfoAsync(getFilePathForID(pageID));
      if (info.exists === false && info.isDirectory === false) {
        result = false; // file doesnt exist
        console.log("Item with ID " + pageID + " does not exist");
        break;
      }
    }

    console.log("Local data exists : " + result);
    return result;
  }

  static async saveAllStoragePages(data) {
    console.log("=====================================");
    console.log("Saving data to local storage");
    try {
      for (let item of data) {
        await FileSystem.writeAsStringAsync(
          getFilePathForID(item.id),
          JSON.stringify(item)
        );
        console.log("Local data item with ID " + item.id + " saved");
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async getAllStoragePages() {
    console.log("=====================================");
    console.log("Fetching local data");
    try {
      let localPages = [];
      let tlp = await AsyncStorage.getItem(TOP_LEVEL_PAGES_KEY);
      for (let pageID of JSON.parse(tlp)) {
        let section = await FileSystem.readAsStringAsync(
          getFilePathForID(pageID)
        );
        localPages.push(JSON.parse(section));
      }
      return localPages;
    } catch (e) {
      console.error(e);
    }
  }

  static async updateStoragePages(data) {
    console.log("=====================================");
    console.log("Updating local data");
    if (data.length === 0) {
      console.log("Nothing to update");
      return false;
    } else {
      try {
        for (let item of data) {
          await FileSystem.writeAsStringAsync(
            getFilePathForID(item.id),
            JSON.stringify(item)
          );
          console.log("Local data item with ID " + item.id + " updated");
        }
        console.log("Data updated");
        let timestamp = new Date().getTime();
        console.log("Updated timestamp: " + timestamp);
        await AsyncStorage.setItem("updateTimestamp", timestamp.toString());
        return true;
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async removeAllStoragePages() {
    console.log("=====================================");
    console.log("Clearing local data");
    try {
      let tlp = await AsyncStorage.getItem(TOP_LEVEL_PAGES_KEY);
      for (let pageID of JSON.parse(tlp)) {
        await FileSystem.deleteAsync(getFilePathForID(pageID), {
          idempotent: true,
        });
      }
      await AsyncStorage.removeItem(TOP_LEVEL_PAGES_KEY);
      console.log("Local data cleared");
    } catch (e) {
      console.error(e);
    }
  }

  static async getQuizScore(idQuizz) {
    let fileName = this.getFileName(idQuizz);
    console.log("=====================================");
    console.log("Getting " + fileName);
    let result = 999;
    try {
      result = await FileSystem.readAsStringAsync(filePath + fileName);
      return JSON.parse(result);
    } catch (e) {
      console.log("no existing data");
      return [];
    }
  }

  static async saveQuizScore(idQuizz, score) {
    let fileName = this.getFileName(idQuizz); //get file name to save according to quizz
    console.log("=====================================");
    console.log("Saving " + fileName);
    console.log(score);

    let scoreObject;
    switch (idQuizz) {
      case 95:
        scoreObject = jsonFhirConverter.createLakeLouiseQuestionnaireResponse(
          score
        );
        break;
      case 100:
        scoreObject = jsonFhirConverter.createOxygenQuestionnaireResponse(
          score
        );
        break;
      default:
        scoreObject = [];
        break;
    }

    let currentScores = [];
    let currentScoresObject = [];
    currentScores = await this.getQuizScore(idQuizz);
    if (currentScores === "") {
      currentScores = [];
    }
    if (currentScores) {
      try {
        console.log(JSON.stringify(currentScores));
        for (let i = 0; i < currentScores.length; i++) {
          currentScoresObject.push(currentScores[i]);
        }

        currentScoresObject.push(scoreObject);
        console.log("After addition: \n" + JSON.stringify(currentScoresObject));
        FileSystem.writeAsStringAsync(
          filePath + fileName,
          JSON.stringify(currentScoresObject)
        );
        console.log("Score saved!");
        ToastAndroid.show("Score saved!", ToastAndroid.SHORT);
      } catch (e) {
        console.log("in SaveQuizScore:");
        console.error(e);
      }
    }
  }

  static async modifyQuizSentProperty(idQuizz, datesModified) {
    console.log("entered modifyQuizsentProp() with " + datesModified);
    let fileName = this.getFileName(idQuizz); //get file name to save according to quizz
    let currentScores = await this.getQuizScore(idQuizz);
    currentScores.forEach((item) => {
      datesModified.forEach((date) => {
        console.log(item.authored + " --- " + date);
        console.log("------------------");
        if (item.authored == date) {
          console.log("WE FOUND ONE DATE");
        }
      });
    });
  }

  static async deleteScoreData(idQuizz) {
    let fileName = this.getFileName(idQuizz);
    console.log("=====================================");
    console.log("Clearing local scores for" + fileName);
    try {
      FileSystem.deleteAsync(filePath + fileName, {
        idempotent: true,
      });
      console.log("Local scores cleared");
      ToastAndroid.show("Local scores empty", ToastAndroid.LONG);
    } catch (e) {
      console.error(e);
    }
  }

  static getFileName(idQuizz) {
    let fileName = "default.txt";
    switch (idQuizz) {
      case 95:
        fileName = "lakescore.txt";
        break;
      case 100:
        fileName = "oxygenscore.txt";
    }
    return fileName;
  }

  static async getLanguageSetting() {
    console.log("=====================================");
    console.log("Fetching language setting");
    try {
      let language = await AsyncStorage.getItem("language");
      return await parseInt(language);
    } catch (e) {
      console.error(e);
      return 1; //French by default
    }
  }

  static async setLanguageSetting(language) {
    console.log("=====================================");
    console.log("Saving language setting");
    try {
      await AsyncStorage.setItem("language", language.toString());
      console.log("Language saved!");
    } catch (e) {
      console.error(e);
    }
  }
}
