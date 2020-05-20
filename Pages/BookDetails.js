import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import {ActivityIndicator, FAB, Snackbar, Paragraph} from 'react-native-paper';
import axios from 'axios';
import {WishListContext} from '../contexts/wishListContext';
import {bookSearchByISBNBaseUrl, searchBookUrl} from '../config/apiKey';

const BookDetails = ({route}) => {
  const {isFromNY} = route.params;
  const [isLoaded, setIsLoaded] = useState(false);

  const [book, setBook] = useState({});
  const {wishList, addNewBookToWishList} = useContext(WishListContext);
  const [bookDetailsNotFound, setBookDetailsNotFound] = useState(false);
  const [baseUrl, setBaseUrl] = useState(bookSearchByISBNBaseUrl);

  const fetchData = async () => {
    const {isbn13, imageUrl, buyLink} = route.params;
    let API_URL = baseUrl + isbn13;
    try {
      const result = await axios.get(API_URL);
      setBook({
        name: result.data.items[0].volumeInfo.title,
        publisher: result.data.items[0].volumeInfo.publisher,
        description: result.data.items[0].volumeInfo.description,
        imageUrl,
        buyLink,
        publishedDate: result.data.items[0].volumeInfo.publishedDate,
        rating: result.data.items[0].volumeInfo.averageRating,
        authors: result.data.items[0].volumeInfo.authors,
        categories: result.data.items[0].volumeInfo.categories,
        previewLink: result.data.items[0].volumeInfo.previewLink,
        pageCount: result.data.items[0].volumeInfo.pageCount,
        accessViewStatus: result.data.items[0].accessInfo.accessViewStatus,
      });
      setIsLoaded(true);
    } catch (error) {
      setBaseUrl(searchBookUrl);
      setBookDetailsNotFound(true);
      console.log('Error found: ' + error);
    }
  };

  useEffect(() => {
    if (isFromNY) {
      fetchData();
    } else {
      setBook(route.params);
      setIsLoaded(true);
    }
    // return () => {
    //   cleanup
    // }
  }, [baseUrl]); // so that the whole component will rerender in case the url changes,
  // i.e. when the book is not in the database and then another api call has to be made

  // const { wishList } = useContext(WishListContext);
  const [bookAdded, setBookAdded] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const handleFABClick = () => {
    var contains = wishList.some(
      (elem) => JSON.stringify(book) === JSON.stringify(elem),
    );

    if (contains || bookAdded) {
      setAlreadyAdded(true);
      // return;
    } else {
      addNewBookToWishList(book);
      setBookAdded(true);
      setSnackBarVisible(true);
    }
  };

  return (
    <View style={styles.page}>
      {isLoaded ? (
        <View style={styles.bookDetailsPage}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.BookDetailsCard}>
              <View style={styles.topPart}>
                <Image
                  source={book.imageUrl}
                  resizeMode="contain"
                  style={styles.bookImage}
                />
                <View style={styles.topTexts}>
                  <Text style={styles.title}>{book.name}</Text>
                  <View>
                    {book.authors &&
                      book.authors.map((author) => (
                        <Text key={author} style={styles.author}>
                          {author}
                        </Text>
                      ))}
                    {book.rating ? (
                      <Text style={styles.subKey}>Rating: {book.rating}</Text>
                    ) : (
                      <Text style={styles.subKey}>Not rated</Text>
                    )}
                  </View>
                  {book.publisher ? (
                    <Text style={styles.subKey}>
                      Publisher:{' '}
                      <Text style={styles.subValue}>{book.publisher}</Text>
                    </Text>
                  ) : null}
                  <Button
                    style={styles.button}
                    title={
                      book.accessViewStatus == 'SAMPLE'
                        ? 'Read Preview'
                        : 'More Details'
                    }
                    onPress={() => Linking.openURL(book.previewLink)}
                  />
                </View>
              </View>
              <View style={styles.middle}>
                <Text style={styles.subKey}>
                  Published Date:{' '}
                  <Text style={styles.subValue}>{book.publishedDate}</Text>
                </Text>
                {book.categories && (
                  <Text style={styles.subKey}>
                    Categories:{' '}
                    {book.categories.map((category, index) => (
                      <Text key={index} style={styles.subValue}>
                        {' '}
                        {category}
                      </Text>
                    ))}
                  </Text>
                )}

                {book.pageCount && (
                  <Text style={styles.subKey}>
                    Page Count:{' '}
                    <Text style={styles.subValue}>{book.pageCount}</Text>
                  </Text>
                )}

                <Button
                  title="Buy Now"
                  onPress={() => Linking.openURL(book.buyLink)}
                  style={styles.button}
                />

                <Text style={styles.subKey}>
                  Description:
                  {book.description ? (
                    <Text style={styles.subValue}>
                      {' ' + book.description}
                    </Text>
                  ) : (
                    <Text style={styles.subValue}> Not available</Text>
                  )}
                </Text>
              </View>
            </View>
          </ScrollView>
          <FAB
            style={styles.fab}
            icon="bookmark"
            // color={}
            onPress={handleFABClick}
          />
          <Snackbar
            style={styles.snackBar}
            visible={snackBarVisible}
            duration={2500}
            onDismiss={() => setSnackBarVisible(false)}>
            Book added to Wish List
          </Snackbar>
          <Snackbar
            style={styles.snackBar}
            visible={alreadyAdded}
            duration={2500}
            onDismiss={() => setAlreadyAdded(false)}>
            Book already added to wishList
          </Snackbar>
        </View>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="0000ff" />
          <Text>Loading...</Text>
          {bookDetailsNotFound && (
            <View>
              <Paragraph style={{marginTop: 50}}>
                OOPSIE..This book seems to have been moved off the database for
                some reason.
              </Paragraph>
              <Paragraph>Plase wait while we do a deep scan :)</Paragraph>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default BookDetails;
const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  bookDetailsPage: {
    flex: 1,
  },

  BookDetailsCard: {
    // flex: 1,
    marginHorizontal: 15,
    elevation: 10,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3', // default colour of btn
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#444',
  },
  topPart: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#777',
  },
  topTexts: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 6,
    padding: 4,
  },
  bookImage: {
    height: 250,
    width: 155,
    marginHorizontal: 6,
    paddingHorizontal: 6,
  },
  subKey: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subValue: {
    fontWeight: 'normal',
    letterSpacing: 0.6,
    lineHeight: 22,
    paddingTop: 5,
    color: '#555',
    paddingLeft: 4,
  },
  middle: {
    // flex: 1,
    paddingTop: 6,
    paddingHorizontal: 4,
    marginBottom: 80,
    justifyContent: 'space-between',
  },
  snackBar: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 20,
  },
  loading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 80,
  },
  author: {
    color: '#777',
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
