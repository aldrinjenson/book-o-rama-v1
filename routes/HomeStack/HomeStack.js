import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabStack from "./HomeTabStack";
import Header from "../../components/Header";
import BookDetails from "../../Pages/BookDetails";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="HomeTabStack"
        component={HomeTabStack}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Book-o-Rama" />
            // <Header navigation={navigation} title="Simple Book Search" />
          ),
        })}
      />
      <Stack.Screen name="BookDetails" component={BookDetails} options={{headerTitle:'Book Details'}} />
    </Stack.Navigator>
  );
};

export default HomeStack;