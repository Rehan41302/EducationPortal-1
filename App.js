import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import fire from "./config/fire";
import { Card } from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack'
import TutorSignUp from './components/TutorSignup';
import StudentSignUp from './components/StudentSignup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// You can import from local files
import TutorLogin from './components/TutorLogin';
import TutorRegister from './components/TutorRegister';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import TutorProfile from './components/tutordashboard/TutorProfile';
import StudentProfile from './components/studentdashboard/StudentProfile'
import QuizUpload from './components/tutordashboard/QuizUpload'
import OnlineClass from './components/tutordashboard/OnlineClass'
import StudentClass from './components/studentdashboard/StudentClass'
import QuizAttempt from './components/studentdashboard/QuizAttempt'

// or any pure javascript modules available in npm
import {
  DefaultTheme,
  Provider as PaperProvider,
  Card
} from "react-native-paper";
import TutorSignUp from "./components/TutorSignup";
import StudentSignUp from "./components/StudentSignup";

const Tabs = createBottomTabNavigator();
const RootStack = createStackNavigator()

const initialTabsStack = () => {
  return (
      <Tabs.Navigator>
          <Tabs.Screen name='Explore'  component={StudentRegister} />
          {/* <Tabs.Screen name='Sell' options={{
              // tabBarButton: () => SellBtn
          }}  component={StudentLogin} /> */}
          <Tabs.Screen name='MyAds'  component={TutorLogin} />
          <Tabs.Screen name='Account'  component={TutorRegister} />
      </Tabs.Navigator>
  )
}

export default class App extends React.Component {
  render() {
    const theme = {
      ...DefaultTheme,
      // Specify custom property
      myOwnProperty: true,
      // Specify custom property in nested object
      colors: {
        myOwnColor: "#BADA55"
      }
    };
    return (
      // <QuizUpload />
      <View>
        <Text>adssd</Text>
      </View>
    //   <NavigationContainer>
    //   <RootStack.Navigator>
    //       <RootStack.Screen name='Home' options={{
    //            headerShown:false
    //        }} component={initialTabsStack} />  
    //   </RootStack.Navigator>
    // </NavigationContainer>
      // <TutorLogin />
      // <StudentClass />
    );
  }
}

const navigator = createStackNavigator({
  tutorlogin: {
    screen: TutorLogin
  },
  tutorregister: {
    screen: TutorRegister
  },
  tutorprofile: {
    screen: TutorProfile
  },
  onlineclass: {
    screen: OnlineClass
  },
  studentlogin: {
    screen: StudentLogin
  },
  studentregister: {
    screen: StudentRegister
  },
  tutorsignup: {
    screen: TutorSignUp
  },
  studentsignup: {
    screen: StudentSignUp
  }
});

const AppContainer = createAppContainer(navigator);
