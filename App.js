import React, { useState, useEffect } from "react";
import { LanguageContext } from "./shared/LanguageContext";
import { LoadingContext } from "./shared/LoadingContext";
import storage from "./utils/storage";
import RootDrawer from "./routes/Drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
//import { Auth2Provider } from "./shared/LoginMidataContext";

export default function App() {
  const [language, setLanguage] = useState(1); //French default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    prefetchImages();
  }, []);

  useEffect(() => {
    async function fetchLanguage() {
      let languageLocal = await storage.getLanguageSetting();
      if (languageLocal && languageLocal > 0) {
        setLanguage(languageLocal);
      }
    }
    fetchLanguage();
  }, []);

  return (
    //<Auth2Provider>
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <NavigationContainer>
          <RootDrawer />
        </NavigationContainer>
      </LanguageContext.Provider>
    </LoadingContext.Provider>
    //</Auth2Provider>
  );
}

async function prefetchImages() {
  await Asset.loadAsync([
    require("./assets/resources/img/fr/1_fr.jpg"),
    require("./assets/resources/img/fr/2_fr.jpg"),
    require("./assets/resources/img/fr/3_fr.jpg"),
    require("./assets/resources/img/fr/4_fr.jpg"),
    require("./assets/resources/img/fr/5_fr.jpg"),
    require("./assets/resources/img/fr/6_fr.jpg"),
    require("./assets/resources/img/fr/7_fr.jpg"),
    require("./assets/resources/img/fr/8_fr.jpg"),
    require("./assets/resources/img/fr/9_fr.jpg"),
    require("./assets/resources/img/fr/10_fr.jpg"),
    require("./assets/resources/img/fr/11_fr.jpg"),
    require("./assets/resources/img/fr/12_fr.jpg"),
    require("./assets/resources/img/fr/13_fr.jpg"),
    require("./assets/resources/img/fr/14_fr.jpg"),
    require("./assets/resources/img/fr/15_fr.jpg"),
    require("./assets/resources/img/fr/16_fr.jpg"),
    require("./assets/resources/img/fr/17_fr.jpg"),
    require("./assets/resources/img/fr/18_fr.jpg"),
    require("./assets/resources/img/fr/19_fr.jpg"),
    require("./assets/resources/img/fr/20_fr.jpg"),
    require("./assets/resources/img/fr/21_fr.jpg"),
    require("./assets/resources/img/fr/22_fr.jpg"),
    require("./assets/resources/img/fr/23_fr.jpg"),
    require("./assets/resources/img/fr/24_fr.jpg"),
    require("./assets/resources/img/fr/25_fr.jpg"),
    require("./assets/resources/img/fr/26_fr.jpg"),
    require("./assets/resources/img/fr/27_fr.jpg"),
    require("./assets/resources/img/fr/28_fr.jpg"),
    require("./assets/resources/img/fr/29_fr.jpg"),
    require("./assets/resources/img/it/1_it.jpg"),
    require("./assets/resources/img/it/2_it.jpg"),
    require("./assets/resources/img/it/3_it.jpg"),
    require("./assets/resources/img/it/4_it.jpg"),
    require("./assets/resources/img/it/5_it.jpg"),
    require("./assets/resources/img/it/6_it.jpg"),
    require("./assets/resources/img/it/7_it.jpg"),
    require("./assets/resources/img/it/8_it.jpg"),
    require("./assets/resources/img/it/9_it.jpg"),
    require("./assets/resources/img/it/10_it.jpg"),
    require("./assets/resources/img/it/11_it.jpg"),
    require("./assets/resources/img/it/12_it.jpg"),
    require("./assets/resources/img/it/13_it.jpg"),
    require("./assets/resources/img/it/14_it.jpg"),
    require("./assets/resources/img/it/15_it.jpg"),
    require("./assets/resources/img/it/16_it.jpg"),
    require("./assets/resources/img/it/17_it.jpg"),
    require("./assets/resources/img/it/18_it.jpg"),
    require("./assets/resources/img/it/19_it.jpg"),
    require("./assets/resources/img/it/20_it.jpg"),
    require("./assets/resources/img/it/21_it.jpg"),
    require("./assets/resources/img/it/22_it.jpg"),
    require("./assets/resources/img/it/23_it.jpg"),
    require("./assets/resources/img/it/24_it.jpg"),
    require("./assets/resources/img/it/25_it.jpg"),
    require("./assets/resources/img/it/26_it.jpg"),
    require("./assets/resources/img/it/27_it.jpg"),
    require("./assets/resources/img/it/28_it.jpg"),
    require("./assets/resources/img/it/29_it.jpg"),
  ]);
}
