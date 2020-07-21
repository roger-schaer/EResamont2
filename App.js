import React, { useState, useEffect } from "react";
import { LanguageContext } from "./shared/LanguageContext";
import { LoadingContext } from "./shared/LoadingContext";
import storage from "./utils/storage";
import RootDrawer from "./routes/Drawer";
import { NavigationContainer } from "@react-navigation/native";
//import { Auth2Provider } from "./shared/LoginMidataContext";

export default function App() {
  const [language, setLanguage] = useState(1); //French default
  const [loading, setLoading] = useState(true);
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
