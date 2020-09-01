import React, { useState, useContext, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import { globalStyles } from "../styles/global";
import { WebView } from "react-native-webview";
import { LanguageContext } from "../shared/LanguageContext";
import utilities from "../utils/utilities";
import storage from "../utils/storage";
import ButtonView from "../components/ButtonView";
import { Asset } from "expo-asset";

function getAssetsMap(assets) {
  return assets.reduce((acc, asset) => {
    acc[`${asset.name}.${asset.type}`] = asset.localUri;
    return acc;
  }, {});
}

function getComicsAssets() {
  let imageAssets = [];
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/1_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/2_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/3_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/4_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/5_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/6_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/7_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/8_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/9_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/10_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/11_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/12_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/13_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/14_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/15_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/16_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/17_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/18_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/19_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/20_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/21_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/22_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/23_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/24_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/25_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/26_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/27_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/28_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/fr/29_fr.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/1_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/2_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/3_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/4_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/5_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/6_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/7_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/8_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/9_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/10_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/11_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/12_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/13_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/14_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/15_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/16_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/17_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/18_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/19_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/20_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/21_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/22_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/23_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/24_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/25_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/26_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/27_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/28_it.jpg"))
  );
  imageAssets.push(
    Asset.fromModule(require("../assets/resources/img/it/29_it.jpg"))
  );
  return imageAssets;
}

export default function SubScreen({ navigation, route }) {
  const [tab] = useState(route.params);
  const { language } = useContext(LanguageContext);

  //const comicsAssetsMap = useMemo(() => getAssetsMap(getComicsAssets()), []);
  const comicsAssetsMap = getAssetsMap(getComicsAssets());

  let checkScreenType = (tab) => {
    let result = 0;
    if (
      tab.children.length < 2 &&
      (tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
        .plaintext !== "" ||
        tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
          .text !== "")
    ) {
      result = 3; //LEAF
    } else if (
      tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
        .plaintext !== "" ||
      tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
        .text !== ""
    ) {
      result = 2; // SUBSCREEN WITH WEB VIEW
    } else {
      result = 1; // SUBSCREEN WITH NO WEB VIEW
    }
    return result;
  };
  let forIOS =
    Platform.OS === "ios"
      ? '<meta name="viewport" content="width=device-width, initial-scale=1, max-scale=1">'
      : ""; //enlarge web text view for ios

  let generateJavaScript = (id) => {
    //enlarge radio buttons on android, and get input value from the 2 quizzes
    let generatedJS =
      Platform.OS === "ios"
        ? ""
        : 'var allRadioButtons = document.querySelectorAll(".form-check-input"); for (var i = 0; i < allRadioButtons.length; i++) {allRadioButtons[i].style.height = "65px"; allRadioButtons[i].style.width = "65px"};';
    switch (id) {
      case 95: //Lake louise quiz
        generatedJS +=
          'document.getElementById("send_button").addEventListener("click", function() {let resultTab = [];' +
          'resultTab.push(getRadioValue("maux_de_tete"));' +
          'resultTab.push(getRadioValue("troubles_digestifs"));' +
          'resultTab.push(getRadioValue("fatigue"));' +
          'resultTab.push(getRadioValue("vertige"));' +
          'resultTab.push(getRadioValue("trouble"));' +
          'resultTab.push(parseInt(document.getElementById("score_span").innerHTML));' +
          "window.ReactNativeWebView.postMessage(JSON.stringify(resultTab));})";
        break;
      case 100: //Oxygen quiz
        generatedJS +=
          'document.getElementById("send_button").addEventListener("click", function() {let resultTab = [];' +
          'resultTab.push(getRadioValue("altitude"));' +
          'resultTab.push(getRadioValue("saturation"));' +
          'resultTab.push(parseInt(document.getElementById("scoreId").innerHTML));' +
          "window.ReactNativeWebView.postMessage(JSON.stringify(resultTab));})";
        break;
      case 92: // Comics (replace image src tags)
        generatedJS += `
        var imgTags = document.querySelectorAll("img");
        let assetsMap = ${JSON.stringify(comicsAssetsMap)};
        window.ReactNativeWebView.postMessage('image tags' + imgTags);
        for(let imgTag of imgTags){
          imgTag.style.display = 'none';
          imgTag.style.width = '100%';
          window.ReactNativeWebView.postMessage('image tag src ' + imgTag.getAttribute('src'));
          let originalSrc = imgTag.getAttribute('src');
          window.ReactNativeWebView.postMessage('orig src ' + originalSrc);
          let filename = originalSrc.substring(originalSrc.lastIndexOf('/') + 1);
          window.ReactNativeWebView.postMessage('filename ' + filename);
          let newSrc = assetsMap[filename];
          imgTag.setAttribute('src', newSrc);
          imgTag.style.display = 'block';
        }
        `;
        break;
      default:
        //no javascript injection for nonquizz pages
        generatedJS = "";
        break;
    }
    return generatedJS;
  };

  if (checkScreenType(tab) === 3) {
    //LEAF
    return (
      <View style={localStyles.leafView}>
        <WebView
          textZoom={270}
          onError={(event) => {
            const { nativeEvent } = event;
            console.warn("WebView error: ", nativeEvent);
          }}
          renderError={(errorName) => (
            <View>
              <Text>Aye! {errorName}</Text>
            </View>
          )}
          source={{
            html:
              tab.pages_lang[
                utilities.findLanguageIndex(tab.pages_lang, language)
              ].text === ""
                ? forIOS +
                  tab.pages_lang[
                    utilities.findLanguageIndex(tab.pages_lang, language)
                  ].plaintext
                : forIOS +
                  tab.pages_lang[
                    utilities.findLanguageIndex(tab.pages_lang, language)
                  ].text,
          }}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          originWhiteList={["*"]}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
            if (tab.id == 95 || tab.id == 100)
              storage.saveQuizScore(tab.id, event.nativeEvent.data);
          }}
          injectedJavaScript={generateJavaScript(tab.id)}
          javaScriptEnabled={tab.id == 95 || tab.id == 100 || tab.id == 92}
          style={{
            flex: 1,
            height: height,
          }}
          testID={"sub-webview"}
        />
      </View>
    );
  } else if (checkScreenType(tab) === 2) {
    // SUBSCREEN WITH WEB VIEW
    return (
      <ImageBackground
        source={require("../assets/images/mountain.jpg")}
        style={globalStyles.mountainBackgroundImage}
      >
        <View style={localStyles.sectionViewTop}>
          <WebView
            textZoom={270}
            source={{
              html:
                tab.pages_lang[
                  utilities.findLanguageIndex(tab.pages_lang, language)
                ].text === ""
                  ? forIOS +
                    tab.pages_lang[
                      utilities.findLanguageIndex(tab.pages_lang, language)
                    ].plaintext.replace(/(\r\n|\n|\r)/gm, " ")
                  : forIOS +
                    tab.pages_lang[
                      utilities.findLanguageIndex(tab.pages_lang, language)
                    ].text.replace(/(\r\n|\n|\r)/gm, " "),
            }}
            style={localStyles.sectionViewTopWebView}
          />
          <View style={localStyles.sectionViewBottom}>
            <ScrollView
              contentContainerStyle={localStyles.sectionViewBottomScrollView}
              style={{ flex: 1 }}
            >
              {tab.children.map(
                (child) =>
                  child.deleted === false && (
                    <ButtonView
                      style={globalStyles.button}
                      key={child.id}
                      value={
                        child.pages_lang[
                          utilities.findLanguageIndex(
                            child.pages_lang,
                            language
                          )
                        ].title
                      }
                      onPress={() => {
                        navigation.push("SubScreen", child);
                      }}
                    />
                  )
              )}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  } else if (checkScreenType(tab) === 1) {
    // SUBSCREEN WITH NO WEB VIEW
    return (
      <ImageBackground
        source={require("../assets/images/mountain.jpg")}
        style={globalStyles.mountainBackgroundImage}
      >
        <View style={localStyles.sectionViewButtonsOnly}>
          <ScrollView
            contentContainerStyle={localStyles.sectionViewButtonsOnlyScrollView}
          >
            {tab.children.map(
              (child) =>
                child.deleted === false && (
                  <ButtonView
                    style={globalStyles.button}
                    key={child.id}
                    value={
                      child.pages_lang[
                        utilities.findLanguageIndex(child.pages_lang, language)
                      ].title
                    }
                    onPress={() => {
                      navigation.push("SubScreen", child);
                    }}
                  />
                )
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  } else {
    return <View></View>;
  }
}

const height = Math.round(Dimensions.get("window").height);
const localStyles = StyleSheet.create({
  leafView: { flex: 1, padding: 15, backgroundColor: "white" },
  sectionViewTop: { flex: 1, paddingTop: 20 },
  sectionViewTopWebView: { flex: 1, height: height / 4 },
  sectionViewBottom: {
    flex: 1,
    justifyContent: "flex-start",
  },
  sectionViewBottomScrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sectionViewButtonsOnly: { flex: 1, marginTop: 20 },
  sectionViewButtonsOnlyScrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
