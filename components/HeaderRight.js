import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";

export default function HeaderRight() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.headerRightStyle}>
      <MaterialIcons
        name="call"
        size={25}
        onPress={() => navigation.push("EmergencyCalls")}
        style={{ marginRight: 18 }}
      />
      <MaterialIcons
        name="my-location"
        size={25}
        onPress={() => navigation.push("Geolocation")}
      />
    </View>
  );
}
