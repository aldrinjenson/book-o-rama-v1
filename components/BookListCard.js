import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/globalStyles";
import Icon from 'react-native-vector-icons/MaterialIcons'

const BookListCard = ({
  imageUrl,
  name,
  author,
  book,
  navigation,
  deleteBook,
}) => {
  return (
    <View style={styles.horizonatalCard}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookDetails", book)}
          style={styles.TouchableOpacity}
        >
          <Image style={styles.bookImage} source={imageUrl} />
          <View style={styles.textContent}>
            <Text style={globalStyles.title}>{name}</Text>
            <Text>{author}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Icon
        name="delete"
        size={32}
        style={styles.icon}
        onPress={() => deleteBook(book)}
      />
    </View>
  );
};

export default BookListCard;

const styles = StyleSheet.create({
  horizonatalCard: {
    flexDirection: "row",
    padding: 3,
    margin: 6,
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
  },
  bookImage: {
    height: 95,
    width: 80,
    margin: 4,
    marginRight: 16,
  },
  TouchableOpacity: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    flex: 1,
  },
  textContent: {
    flex: 1,
  },
  icon: {
    padding: 16,
  },
});
