import React from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback } from "react-native";

const CustomButton = ({ text, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableNativeFeedback> // Note: this works for android only, make sure to change it to touchableopacity if making for ios
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    margin: 6,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    width: "65%",
    padding: 8,
    alignSelf: "center",
    elevation: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 16,
    textAlign: "center",
  },
});
