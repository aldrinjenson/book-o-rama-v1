import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card } from "react-native-paper";

const Book = ({ name, author, imageUrl }) => {
  return (
    <Card style={styles.bookCard}>
      <Card.Cover source={{ uri: imageUrl }} />
      <Card.Content>
        <Card.Title title={name} subtitle={author} />
      </Card.Content>
    </Card>
  );
};

export default Book;

const styles = StyleSheet.create({
  bookCard: {
    paddingHorizontal: 6,
    marginHorizontal: 4,
  },
});
