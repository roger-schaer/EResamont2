import React from "react";

// stacks
import HomeStack from "./HomeStack";
//import SettingsStack from "./SettingsStack";

//custom button component
import CustomDrawer from "../components/CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator();

function RootDrawer() {
  return (
    <RootDrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <RootDrawerNavigator.Screen name="EResamont" component={HomeStack} />
      {/*<RootDrawerNavigator.Screen name="Settings" component={SettingsStack} />*/}
    </RootDrawerNavigator.Navigator>
  );
}

export default RootDrawer;
