import {AsyncStorage} from 'react-native';

export const saveToAsyncStorage = async (bestSellerList) => {
  try {
    let stringedBestSellerList = JSON.stringify(bestSellerList);
    await AsyncStorage.setItem('SavedBestSellerList', stringedBestSellerList);
    const dt = new Date();
    let savedDate =
      dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    // stores the date in which the data is saved
    await AsyncStorage.setItem(
      'savedDate',
      savedDate, // saving the string date in Date format
    );
    console.log('Successfully saved data and date to local storage');
  } catch (error) {
    console.log('Error in storing to local storage:::' + error);
  }
  return;
};
