import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack/HomeStack";
import SettingsStack from "./SettingsStack";
import FeedbackStack from "./FeedbackStack";

const Drawer = createDrawerNavigator();

export const RootDrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="Settings " component={SettingsStack} />
    <Drawer.Screen name="Feedback" component={FeedbackStack} />
  </Drawer.Navigator>
);
