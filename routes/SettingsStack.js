import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsPage from "../Pages/SettingsPage";
import Header from "../components/Header";

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Settings" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
