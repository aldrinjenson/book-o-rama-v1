import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PreviewImage = (props) => {
  useEffect(() => {
    console.log('reloading');
  }, [props]);
  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <Image {...props} />
    </View>
  );
};

export default PreviewImage;
