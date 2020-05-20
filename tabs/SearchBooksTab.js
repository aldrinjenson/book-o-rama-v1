import React, {useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {globalStyles} from '../global/globalStyles';
import SearchBar from '../components/SearchBar';
import DisplayBooks from '../components/DisplayBooks';
import axios from 'axios';

const SearchBooks = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const bookQuery = (query) => {
    setisLoading(true);
    const fetchData = async () => {
      const API_URL = 'https://www.googleapis.com/books/v1/volumes';
      try {
        const result = await axios.get(`${API_URL}?q=${query}`);
        result.data && setBooks(result.data.items);
        setisLoading(false);
      } catch (error) {
        console.log('Error: ' + error);
      }
    };
    fetchData();
  };


  return (
    <View style={globalStyles.container}>
      <Text>Search by Book name, Author or by ISBN</Text>
      <SearchBar
        setValue={bookQuery}
        placeholder="Try 'Harry Potter' or 'J.K.
      Rowling' "
      />
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="0000ff" />
          <Text style={{alignSelf: 'center'}}>Loading...</Text>
        </View>
      ) : (
        <DisplayBooks books={books} navigation={navigation} />
      )}
    </View>
  );
};

export default SearchBooks;