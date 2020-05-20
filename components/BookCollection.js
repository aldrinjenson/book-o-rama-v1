import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Book from "./Book";
import { globalStyles } from "../global/globalStyles";

const BookCollection = ({ collection, navigation }) => {
  const handleClick = (item) => {
    const book = {
      name: item.title,
      imageUrl: { uri: item.book_image },
      publisher: item.publisher,
      isFromNY: true,
      isbn13: item.primary_isbn13,
      buyLink: item.buy_links[0].url
    };
    navigation.navigate("BookDetails", book);
  };

  return (
    <View style={styles.collection}>
      <Text style={styles.collectionTitle}>{collection.display_name}</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
        {collection.books.map((item) => (
          <TouchableOpacity
            key={item.primary_isbn13}
            onPress={() => handleClick(item)}
          >
            <Book
              name={item.title}
              author={item.author}
              imageUrl={item.book_image}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default BookCollection;

const styles = StyleSheet.create({
  collection: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  collectionTitle: {
    ...globalStyles.title,
    marginVertical: 4,
    paddingVertical: 1,
  },
  horizontalScroll: {
    paddingVertical: 6,
    marginVertical: 6,
  },
});
