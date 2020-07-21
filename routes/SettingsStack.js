/*import React from "react";
import Header from "../components/Header";
import MidataSettings from "../screens/MidataSettings";
import MyData from "../screens/MyData";
import { globalStyles } from "../styles/global";

import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";
import { createStackNavigator } from "@react-navigation/stack";

const SettingsStackNavigator = createStackNavigator();

function SettingsStack() {
  return (
    <SettingsStackNavigator.Navigator
      screenOptions={{
        headerStyle: globalStyles.headerStyle,
        headerTintColor: "black",
      }}
    >
      <SettingsStackNavigator.Screen
        name="MidataSettings"
        component={MidataSettings}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header title={"Midata"} navigation={navigation} />
            ),
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
      <SettingsStackNavigator.Screen
        name="MyData"
        component={MyData}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header title={"My Data"} navigation={navigation} />
            ),
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </SettingsStackNavigator.Navigator>
  );
}

export default SettingsStack;*/
