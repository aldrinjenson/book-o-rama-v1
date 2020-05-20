import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../../tabs/HomeTab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBooks from '../../tabs/SearchBooksTab';
import WishList from '../../tabs/WishList';

const Tab = createBottomTabNavigator();

const HomeTabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Best Sellers"
        component={HomeTab}
        options={{
          tabBarIcon: () => <Icon name="home" size={23} />,
        }}
      />
      <Tab.Screen
        name="Search Books"
        component={SearchBooks}
        options={{
          tabBarIcon: () => <Icon name="search" size={23} />,
        }}
      />
      <Tab.Screen
        name="Wish List"
        component={WishList}
        options={{
          tabBarIcon: () => <Icon name="bookmark" size={23} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabStack;
