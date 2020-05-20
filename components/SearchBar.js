import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({setValue, placeholder}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query) {
      setValue(query);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder={placeholder}
        value={query}
        onChangeText={(value) => setQuery(value)}
      />
      <Icon
        name="search"
        size={25}
        onPress={handleSubmit}
        style={styles.icon}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 28,
    width: '95%',
    justifyContent: 'space-around',
    // paddingVertical: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
  icon: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    paddingRight: 8,
    // borderWidth: 1,
    alignSelf: 'center',
  },
});
