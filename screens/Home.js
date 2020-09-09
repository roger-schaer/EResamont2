import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  ToastAndroid,
  Platform,
} from "react-native";
import { globalStyles, themeColorPrimary } from "../styles/global";
import requestPage from "../utils/requestPage";
import { LanguageContext } from "../shared/LanguageContext";
import { DataContext } from "../shared/DataContext";
import utilities from "../utils/utilities";
import storage from "../utils/storage";
import ButtonView from "../components/ButtonView";
import NetInfo from "@react-native-community/netinfo";
import { FontAwesome5 } from "@expo/vector-icons";
import { HIDDEN_PAGE_IDS } from "../utils/requestPage";

import _ from "lodash";
import { ASGMContext } from "../shared/ASGMContext";

export default function Home({ navigation }) {
  const { language } = useContext(LanguageContext);
  const { data, setData } = useContext(DataContext);
  const { asgmStatus } = useContext(ASGMContext);
  const [internetState, setInternetState] = useState(null);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("NetInfo", state);
      if (internetState === null) {
        if (state.isConnected === true && state.isInternetReachable !== null) {
          setInternetState(state.isInternetReachable);
        } else if (!state.isConnected) {
          setInternetState(false);
        }
      }
    });

    // Unsubscribe
    return () => {
      console.log("Unsubscribing from NetInfo updates");
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function loadPagesOnInternetChange() {
      setData(null);
      await getAllPages();
    }

    loadPagesOnInternetChange();
  }, [internetState]);

  let getAllPages = async () => {
    // check local storage, if empty then fetch all online and save, if exists then fetch updates,
    // if updates exists then save updates to storage, if not just load local storage
    let data = [];
    let connectionInfo = await requestPage.checkConnection();
    let dataExists = await storage.checkStoragePages();
    let connectionOK = connectionInfo && connectionInfo.isInternetReachable;
    console.log("Connection is ok", connectionOK);
    //No local data, no connection
    // TODO - Either remove or localize this (and check what happens on iOS with ToastAndroid)
    if (dataExists === false && connectionOK === false) {
      if (Platform.OS === "android")
        ToastAndroid.show("No local data, no connection", ToastAndroid.SHORT);
    } //No local data, connection ok => fetch online and save
    else if (dataExists === false && connectionOK === true) {
      if (Platform.OS === "android")
        ToastAndroid.show("Downloading..", ToastAndroid.SHORT);
      await fetchPageTree();
      data = await fetchAndSaveData();
    } //Local data exists, connection ok => check online and update local data if possible, then load updated data
    else if (dataExists === true && connectionOK === true) {
      if (Platform.OS === "android")
        ToastAndroid.show("Checking for update..", ToastAndroid.SHORT);
      await fetchPageTree();
      data = await fetchLocalStorageWithUpdateCheck();
    } //Local data exists, no connection => just load the local data
    else if (dataExists === true && connectionOK === false) {
      if (Platform.OS === "android")
        ToastAndroid.show(
          "Local data exists, no connection",
          ToastAndroid.SHORT
        );
      data = await storage.getAllStoragePages();
    }
    setData(data);
  };

  let fetchLocalStorageWithUpdateCheck = async () => {
    let data = [];
    let dataNew = await requestPage.fetchUpdatedContent(null);
    if (dataNew.length === 0) {
      console.log("No new data");
      data = await storage.getAllStoragePages();
      if (Platform.OS === "android")
        ToastAndroid.show("Local data up to date", ToastAndroid.SHORT);
    } else {
      let res = await storage.updateStoragePages(dataNew);
      if (res === true) {
        data = await storage.getAllStoragePages();
        console.log("New data saved");
        if (Platform.OS === "android")
          ToastAndroid.show(
            "New data fetched since last time",
            ToastAndroid.SHORT
          );
      }
    }
    return data;
  };

  let fetchPageTree = async () => {
    const response = await requestPage.fetchPageTree();
    return response;
  };

  let fetchAndSaveData = async () => {
    console.log("Going to fetch and save all pages");
    const response = await requestPage.fetchAllPages();
    let dataToSave = formatFetchedData(response);
    await storage.saveAllStoragePages(dataToSave);
    return dataToSave;
  };

  let formatFetchedData = (data) => {
    let dataArray = [];
    dataArray = data.filter((item) => item.deleted === false);
    dataArray = _.sortBy(dataArray, "position");
    return dataArray;
  };

  // TODO - Make internationalization more elegant
  const translate = function (text) {
    switch (text) {
      case "no-connection":
        switch (language) {
          case 1:
            return "Pas de connexion Internet! Veuillez vous connecter à Internet une première fois afin de télécharger tous les contenus.";
            break;
          case 2:
            return "Nessuna connessione! Si prega di attivare Internet la prima volta per scaricare tutti i contenuti.";
            break;
          case 3:
            return "No connection! Please enable Internet the first time to download all the content.";
            break;
          case 4:
            return "Keine Verbinding! Bitte verbinden Sie sich einmal mit dem Internet, um alle Inhalte herunterzuladen.";
            break;
          default:
            return "No connection! Please enable Internet the first time to download all the content.";
        }
        break;
      default:
        return "";
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={{ flex: 1 }}>
        <View style={localStyles.logo}>
          <Image
            source={require("../assets/images/logo_eresamont.png")}
            style={localStyles.logoImage}
          />
        </View>
        <View style={localStyles.buttonContainerMain}>
          <ScrollView contentContainerStyle={localStyles.scrollViewMain}>
            {data !== null ? (
              data.length > 0 ? (
                data.map((item) => {
                  if (!HIDDEN_PAGE_IDS.includes(item.id) || asgmStatus) {
                    return (
                      <ButtonView
                        key={item.id}
                        value={
                          item.pages_lang[
                            utilities.findLanguageIndex(
                              item.pages_lang,
                              language
                            )
                          ].title
                        }
                        onPress={() => navigation.push("SubScreen", item)}
                        style={{
                          ...globalStyles.button,
                          backgroundColor: HIDDEN_PAGE_IDS.includes(item.id)
                            ? "#3c86a8"
                            : themeColorPrimary,
                        }}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <View
                  style={{
                    ...localStyles.loaderViewMain,
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.9)",
                  }}
                >
                  <FontAwesome5 name={"exclamation-triangle"} size={48} />
                  <Text style={localStyles.error}>
                    {translate("no-connection")}
                  </Text>
                </View>
              )
            ) : (
              <View style={localStyles.loaderViewMain}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  logo: {
    flex: 1,
    marginBottom: 25,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainerMain: {
    flex: 3,
  },
  scrollViewMain: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loaderViewMain: { flex: 1, alignItems: "center", justifyContent: "center" },
  containerTopButtons: {
    flexDirection: "row",
    borderColor: "red",
    borderStyle: "solid",
  },
  topButton: {
    borderRadius: 10,
    backgroundColor: "grey",
    width: "50%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 28,
    textAlign: "center",
    width: "100%",
    padding: 10,
  },
});
