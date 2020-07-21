import React from "react";
import Header from "../components/Header";
import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";
import Home from "../screens/Home";
import SubScreen from "../screens/SubScreen";
import { globalStyles } from "../styles/global";
import EmergencyCalls from "../screens/EmergencyCalls";
import Geolocation from "../screens/Geolocation";
import { createStackNavigator } from "@react-navigation/stack";

// home stack navigator screens
const HomeStackNavigator = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{
        headerStyle: globalStyles.headerStyle,
        headerTintColor: "black",
      }}
    >
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header
                title="Home"
                navigation={navigation}
                style={{ alignContent: "right" }}
              />
            ),
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
      <HomeStackNavigator.Screen
        name="SubScreen"
        component={SubScreen}
        options={({ route }) => {
          let navParams = route.params;
          return {
            headerTitle: () => <Header title={navParams.pages_lang} />,
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
          };
        }}
      />
      <HomeStackNavigator.Screen
        name="EmergencyCalls"
        component={EmergencyCalls}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header title="Emergency calls" navigation={navigation} />
            ),
          };
        }}
      />
      <HomeStackNavigator.Screen
        name="Geolocation"
        component={Geolocation}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title="GPS" navigation={navigation} />,
          };
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

export default HomeStack;
