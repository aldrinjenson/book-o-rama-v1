import React from "react";
import { StyleSheet, Text,View, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/globalStyles";

const SettingsPage = () => {
  return (
    <View style={styles.SettingsContainer}>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingItemKey}>Dark Mode</Text>
        <Text style={styles.settingItemValue}>Coming Soon...</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingItemKey}>
          Book Sources
        </Text>
        <Text style={styles.settingItemValue}>Coming Soon...</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingItemKey}>
          Show Reviews from GoodReads
        </Text>
        <Text style={styles.settingItemValue}>Coming Soon...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  SettingsContainer: {
    flex: 1,
    borderColor: "black",
    margin: 10,
    padding: 5,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#999",
    marginVertical: 10,
    padding: 8,
    paddingTop: 10
  },
  settingItemKey: {
    flex: 1,
    // fontWeight: "bold",
  },
  settingItemValue: {
    color: "red",
  },
});
