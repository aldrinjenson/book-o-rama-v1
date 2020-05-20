import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

const saveToAsyncStorage = async (wishList) => {
  try {
    let stringedWishList = JSON.stringify(wishList);
    await AsyncStorage.setItem("savedWishList", stringedWishList);
    // console.log("Successfully saved wishList to local storage");
  } catch (error) {
    console.log("Error in storing to local storage" + error);
    return;
  }
  return;
};

export const WishListContext = createContext();

const WishListContextProvider = (props) => {
  const [wishList, setWishList] = useState([]);

  const getFromAsyncStorage = async () => {
    try {
      const stringedWishListFromStorage = await AsyncStorage.getItem(
        "savedWishList"
      );
      let parsedArray = JSON.parse(stringedWishListFromStorage);
      if (parsedArray) setWishList(parsedArray);
    } catch (error) {
      console.log("Error in retrieving from storage" + error);
      return; 
    }
  };

  const addNewBookToWishList = (book) => {
    const newWishList = [...wishList, book];
    saveToAsyncStorage(newWishList);
    setWishList(newWishList);
  };

  const removeBookFromWishList = (book) => {
    const newWishList = wishList.filter((item) => item.isbn10 !== book.isbn10);
    saveToAsyncStorage(newWishList);
    setWishList(newWishList);
  };

  useEffect(() => {
    getFromAsyncStorage();
  }, []);

  return (
    <WishListContext.Provider
      value={{ wishList, addNewBookToWishList, removeBookFromWishList }}
    >
      {props.children}
    </WishListContext.Provider>
  );
};

export default WishListContextProvider;
