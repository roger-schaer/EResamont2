import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Linking } from "expo";
import { LanguageContext } from "../shared/LanguageContext";
import ENV from "../env";
import { ASGMContext } from "../shared/ASGMContext";
import storage from "../utils/storage";

export default function ASGMLogin({ navigation }) {
  const { language } = useContext(LanguageContext);
  const { setAsgmStatus } = useContext(ASGMContext);

  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  // TODO - Make this hard-coded translation more elegant
  const translate = (text) => {
    switch (text) {
      case "login":
        switch (language) {
          case 1:
            return "Connexion ASGM";
          case 2:
            return "Accesso ASGM";
          case 3:
            return "Login SBV";
          case 4:
            return "Login SBV";
          default:
            return "Login SBV";
        }
      case "password":
        switch (language) {
          case 1:
            return "Mot de passe";
          case 2:
            return "Password";
          case 3:
            return "Password";
          case 4:
            return "Passwort";
          default:
            return "Password";
        }
      case "wrong":
        switch (language) {
          case 1:
            return "Mot de passe incorrect";
          case 2:
            return "Password errata";
          case 3:
            return "Wrong password";
          case 4:
            return "Passwort falsch";
          default:
            return "Wrong password";
        }
    }
  };

  const handleOKPress = async () => {
    if (password === ENV.ASGM_PASSWORD) {
      setWrongPassword(false);
      await storage.setASGMStatus(true);
      setAsgmStatus(true);
      navigation.navigate("Home");
    } else {
      setWrongPassword(true);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={localStyles.container}>
        <Text style={localStyles.headerText}>{translate("login")}</Text>
        <Text style={localStyles.subheaderText}>{translate("password")}</Text>
        <View style={{ marginVertical: 50 }}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={localStyles.textInput}
            autoCompleteType="off"
            autoCorrect={false}
            autoFocus={true}
            secureTextEntry={true}
          />
          {wrongPassword && (
            <Text
              style={{
                ...localStyles.subheaderText,
                marginTop: 0,
                color: "red",
              }}
            >
              {translate("wrong")}
            </Text>
          )}
        </View>
        <Button title="OK" onPress={handleOKPress}></Button>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    backgroundColor: "rgba(255,255,255, 0.75)",
  },
  headerText: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subheaderText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  textInput: {
    fontSize: 24,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    textAlign: "center",
  },
});
