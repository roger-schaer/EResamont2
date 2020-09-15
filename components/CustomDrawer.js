import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
} from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import { DataContext } from "../shared/DataContext";
import ButtonView from "./ButtonView";
import storage from "../utils/storage";
import requestPage from "../utils/requestPage";
import { Alert, ToastAndroid } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ASGMContext } from "../shared/ASGMContext";

export default function CustomDrawer({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { setData } = useContext(DataContext);
  const { asgmStatus, setAsgmStatus } = useContext(ASGMContext);

  const navigationClick = (page) => () => {
    navigation.toggleDrawer();
    navigation.navigate(page);
  };

  const languageClick = (languageSelected) => () => {
    storage.setLanguageSetting(languageSelected);
    setLanguage(languageSelected);
    navigation.closeDrawer();
  };
  const checkUpdate = async () => {
    let data = await requestPage.fetchUpdatedContent(null);
    console.log(data.length);
    if (data.length === 0) {
      if (Platform.OS === "android")
        ToastAndroid.show("Data already up to date", ToastAndroid.SHORT);
    } else {
      let res = await storage.updateStoragePages(data);
      if (Platform.OS === "android")
        res === true && ToastAndroid.show("Data updated", ToastAndroid.SHORT);
      setData(data);
    }
  };
  const clearData = async () => {
    await storage.removeASGMStatus();
    setAsgmStatus(false);
    await storage.removeAllStoragePages();
    setData(null);
    let info = await storage.checkStoragePages();
    if (info === false) {
      if (Platform.OS === "android")
        ToastAndroid.show("Local data cleared", ToastAndroid.SHORT);
    }
  };
  const confirmClearDataClick = async () => {
    Alert.alert(
      "Confirm refresh",
      "Delete local data and redownload?",
      [
        { text: "YES", onPress: () => clearData() },
        {
          text: "NO",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // TODO - Make this hard-coded localization more elegant
  let translate = (name, language) => {
    if (name === "Home") {
      switch (language) {
        case 1:
          return "Accueil";
          break;
        case 2:
          return "Home page";
          break;
        case 3:
          return "Home";
          break;
        case 4:
          return "Home";
          break;
        default:
          return "Home";
      }
    } else if (name === "Refresh data") {
      switch (language) {
        case 1:
          return "Rafraîchir les données";
          break;
        case 2:
          return "Aggiornare dati";
          break;
        case 3:
          return "Refresh data";
          break;
        case 4:
          return "Daten aktualisieren";
          break;
        default:
          return "Refresh data";
      }
    } else if (name === "Check for update") {
      switch (language) {
        case 1:
          return "Vérifier les mises à jour";
          break;
        case 2:
          return "Verifica aggiornamenti";
          break;
        case 3:
          return "Check for update";
          break;
        case 4:
          return "Updates suchen";
          break;
        default:
          return "Check for update";
      }
    } else if (name === "ASGM Login") {
      switch (language) {
        case 1:
          return "Login ASGM";
          break;
        case 2:
          return "Accesso ASGM";
          break;
        case 3:
          return "SBV Login";
          break;
        case 4:
          return "Login SBV";
          break;
        default:
          return "Login ASGM";
      }
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={globalStyles.drawerContainer}>
        <View style={globalStyles.drawerTop}>
          <TouchableOpacity
            onPress={navigationClick("Home")}
            testID={"cd-button-home"}
          >
            <Text style={globalStyles.drawerTitle}>E-Res@mont</Text>
          </TouchableOpacity>
          <View style={globalStyles.drawerTopMenu}>
            <TouchableOpacity onPress={navigationClick("Home")}>
              <Text style={globalStyles.drawerTopMenuText}>
                {translate("Home", language)}
              </Text>
              <View style={globalStyles.topMenuDivider} />
            </TouchableOpacity>

            {/*<TouchableOpacity onPress={navigationClick("MidataSettings")}>
              <Text style={globalStyles.drawwerTopMenuText}>Midata</Text>
              <View style={globalStyles.topMenuDivider} />
            </TouchableOpacity>*/}

            <TouchableOpacity onPress={confirmClearDataClick}>
              <Text style={globalStyles.drawerTopMenuText}>
                {translate("Refresh data", language)}
              </Text>
              <View style={globalStyles.topMenuDivider} />
            </TouchableOpacity>

            <TouchableOpacity onPress={checkUpdate} testID={"cd-button-update"}>
              <Text style={globalStyles.drawerTopMenuText}>
                {translate("Check for update", language)}
              </Text>
              <View style={globalStyles.topMenuDivider} />
            </TouchableOpacity>

            {!asgmStatus && (
              <TouchableOpacity
                onPress={() => navigation.navigate("ASGM")}
                testID={"cd-button-asgm"}
              >
                <Text style={globalStyles.drawerTopMenuText}>
                  <FontAwesome5 name="lock" />{" "}
                  {translate("ASGM Login", language)}
                </Text>
                <View style={globalStyles.topMenuDivider} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={globalStyles.drawerButtons}>
          <ButtonView
            value="Français"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(1)}
          />
          <ButtonView
            value="Italiano"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(2)}
          />
          <ButtonView
            value="English"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(3)}
          />
          <ButtonView
            value="Deutsch"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(4)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const localStyles = StyleSheet.create({
  topMenuDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});
