import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import {globalStyles} from '../global/globalStyles';

const DisplayBooks = ({books, navigation}) => {
  if (!books)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 200,
        }}>
        <Text>Sorry, No such book exists in our database!!</Text>
        <Text>Please check your search query</Text>
      </View>
    );

  const handleClick = (item) => {
    let {
      industryIdentifiers,
      title,
      previewLink,
      pageCount,
      categories,
      publisher,
      description,
      publishedDate,
      authors,
    } = item.volumeInfo;

    let isbn10 = industryIdentifiers
      ? industryIdentifiers.find((identifier) => {
          if (identifier.type === 'ISBN_10') return identifier;
        }).identifier
      : title.split(' ').join('-').toLowerCase();

    let book = {
      name: title,
      publisher,
      description,
      publishedDate,
      isFromNY: false,
      rating: item.volumeInfo.averageRating,
      imageUrl: item.imageUrl,
      authors,
      categories,
      previewLink,
      pageCount,
      isbn10,
      buyLink: `https://www.amazon.in/dp/${isbn10}`,
      accessViewStatus: item.accessInfo.accessViewStatus,
    };
    navigation.navigate('BookDetails', book);
  };
  return (
    <View style={styles.bookList}>
      <FlatList
        data={books}
        renderItem={({item}) => {
          let imageUrl = item.volumeInfo.imageLinks
            ? {uri: `${item.volumeInfo.imageLinks.thumbnail}`}
            : require('../assets/no_preview_image.png');
          let authors = item.volumeInfo.authors ? item.volumeInfo.authors : [];
          return (
            <TouchableOpacity
              onPress={() => handleClick({...item, imageUrl, authors})}>
              <View style={styles.horizonatalCard}>
                <Image style={styles.bookImage} source={imageUrl} />
                <View style={styles.textContent}>
                  <Text style={globalStyles.title}>
                    {item.volumeInfo.title}
                  </Text>
                  <Text>{authors[0]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DisplayBooks;

const styles = StyleSheet.create({
  bookList: {
    flex: 1,
    flexDirection: 'row',
  },
  horizonatalCard: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#aaa',
    alignItems: 'center',
    padding: 3,
    margin: 6,
  },
  bookImage: {
    height: 95,
    width: 80,
    margin: 4,
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
});
