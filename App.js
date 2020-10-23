import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import fire from './config/fire';

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
import { Card } from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TutorSignUp from './components/TutorSignup';
import StudentSignUp from './components/StudentSignup';


export default class App extends React.Component {
  render() {
    return (
      
      <QuizUpload />

      
      
      
      
          );
  }
}

const navigator = createStackNavigator({
  tutorlogin: {
    screen:TutorLogin ,
    
  },
  tutorregister: {
    screen:TutorRegister ,
    
  },
  studentlogin:{
    screen:StudentLogin,
  },
  studentregister:{
    screen:StudentRegister,
  },
  tutorsignup:{
    screen:TutorSignUp,
  },
  studentsignup:{
    screen:StudentSignUp,
  }
});

const AppContainer = createAppContainer(navigator);



