import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import MessageScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'

var firebaseConfig = {
  apiKey: "AIzaSyD6h6fKn1ItNujMTKxTdTBLtWGOOcszJCM",
  authDomain: "myapp-70c33.firebaseapp.com",
  databaseURL: "https://myapp-70c33-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myapp-70c33",
  storageBucket: "myapp-70c33.appspot.com",
  messagingSenderId: "912054088613",
  appId: "1:912054088613:web:9692ba1ee8a0981931ae4c",
  measurementId: "G-8H2ELMC64J"
};

firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator({
  Home:{
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor}/>
    }
  },
  Notfication:{
    screen: NotificationScreen,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name="notifications" size={24} color={tintColor}/>
    }
  },
  Post:{
    screen: PostScreen,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name="add-circle" size={36} color={tintColor}/>
    }
  },
  Message:{
    screen: MessageScreen,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name="chatbubbles" size={24} color={tintColor}/>
    }
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon:({ tintColor }) => <Ionicons name="person-circle" size={24} color={tintColor}/>
    }
  }
})

/*const AppStack = createStackNavigator({
  Home: HomeScreen,
  Message: MessageScreen,
  Notification: NotificationScreen,
  Post: PostScreen,
  Profile: ProfileScreen,
});*/

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});


export default createAppContainer(
  createSwitchNavigator(
      {
          Loading: LoadingScreen,
          App: AppTabNavigator,
          Auth: AuthStack
      },
      {
          initialRouteName: "Loading"
      }
  )
);