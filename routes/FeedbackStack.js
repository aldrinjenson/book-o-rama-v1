import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedbackPage from "../Pages/FeedbackPage";
import Header from "../components/Header";

const Stack = createStackNavigator();

const FeedbackStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feedback"
        component={FeedbackPage}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Feedback" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FeedbackStack;
