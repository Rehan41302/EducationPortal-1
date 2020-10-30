import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import firebase from "./config/fire";
import { Provider } from "react-redux";
import store from "./store/store";

// You can import from local files
import TutorLogin from "./components/TutorLogin";
import Quiz from "./components/quiz";
import TutorRegister from "./components/TutorRegister";
import StudentLogin from "./components/StudentLogin";
import StudentRegister from "./components/StudentRegister";
import TutorProfile from "./components/tutordashboard/TutorProfile";
import TutorDetails from "./components/tutordashboard/TutorDetails";
import StudentProfile from "./components/studentdashboard/StudentProfile";
import QuizUpload from "./components/tutordashboard/QuizUpload";
import OnlineClass from "./components/tutordashboard/OnlineClass";
import StudentClass from "./components/studentdashboard/StudentClass";
import QuizAttempt from "./components/studentdashboard/QuizAttempt";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createAppContainer, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TutorSignUp from "./components/TutorSignup";
import StudentSignUp from "./components/StudentSignup";
import { signInAction } from "./store/actions/userActions";

class App extends React.Component {
  state = {
    user: undefined,
    isAuthenticated: false,
    pageLoading: true
  };
  componentDidMount() {
    // console.log({ props: this.props.navigation });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log({ user });
        const db = firebase.firestore();
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(userDoc => {
            console.log({ userDoc });
            if (userDoc.exists) {
              if (userDoc.data().role) {
                console.log({ user: userDoc.data().role });
                const collection =
                  userDoc.data().role === "tutor" ? "tutors" : "students";
                db.collection(collection)
                  .doc(user.uid)
                  .get()
                  .then(doc => {
                    if (doc.exists) {
                      store.dispatch(
                        signInAction({
                          ...doc.data(),
                          id: user.uid,
                          role: userDoc.data().role
                        })
                      );
                      this.setState({
                        user: { ...doc.data(), role: userDoc.data().role },
                        isAuthenticated: true,
                        pageLoading: false
                      });
                    } else {
                      store.dispatch(
                        signInAction({
                          id: user.uid,
                          role: userDoc.data().role
                        })
                      );
                      this.setState({
                        user: { id: user.uid, role: userDoc.data().role },
                        isAuthenticated: true,
                        pageLoading: false
                      });
                    }
                  })
                  .catch(error => {
                    Alert.alert(error.message);
                    store.dispatch(
                      signInAction({ id: user.uid, role: userDoc.data().role })
                    );
                    this.setState({
                      user: { id: user.uid, role: userDoc.data().role },
                      isAuthenticated: true,
                      pageLoading: false
                    });
                  });
              }
            } else {
              Alert.alert("USER DATA NOT EXISTS!");
              store.dispatch(
                signInAction({ id: user.uid, role: userDoc.data().role })
              );
              this.setState({
                user: { id: user.uid, role: userDoc.data().role },
                isAuthenticated: true,
                pageLoading: false
              });
            }
          })
          .catch(error => {
            console.error(error.message);
            firebase
              .auth()
              .signOut()
              .then(res => {
                this.setState({ pageLoading: false });
                this.props.navigation.replace("tutorlogin");
              });
            Alert.alert(error.message);
          });
      } else {
        // this.props.navigation.replace("tutorlogin");
        console.log("SIGNED OUT");
        this.setState({ pageLoading: false });
      }
    });
  }
  render() {
    return (
      // <QuizUpload />
      // <Quiz />
      <Provider store={store}>
        {this.state.pageLoading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size="large" height="100%" />
          </View>
        ) : (
          <AppContainer />
        )}
        {/* <TutorDetails /> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: "center"
  }
});

const navigator = createStackNavigator({
  tutorlogin: {
    screen: TutorLogin
  },
  tutorregister: {
    screen: TutorRegister
  },
  tutordetails: {
    screen: TutorDetails
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

const AppContainer = createAppContainer(withNavigation(navigator));
export default App;
