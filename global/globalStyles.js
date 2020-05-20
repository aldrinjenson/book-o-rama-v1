import { StyleSheet, Dimensions } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    margin: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 4,
    margin: 4,
    color: "#333",
    flexWrap: "wrap",
  },
  subTitle: {
    fontSize: 15,
    color: "#aaa",
    flexWrap: "wrap",
  },
  footer: {
    alignSelf: "center",
    marginVertical: 50,
    paddingVertical: 50,
  },
});
