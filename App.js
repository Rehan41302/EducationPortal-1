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
// import Quiz from "./components/quiz";
// import TutorRegister from "./components/TutorRegister";
import TutorLogin from "./components/TutorLogin";
import AvailableTutors from "./components/availableTutors";
import StudentLogin from "./components/StudentLogin";
import StudentRegister from "./components/StudentRegister";
import StudentQuiz from "./components/studentQuiz";
import StudentOnlineClass from "./components/studentClass";
import TutorProfile from "./components/tutordashboard/TutorProfile";
import TutorDetails from "./components/tutordashboard/TutorDetails";
import StudentProfile from "./components/studentdashboard/StudentProfile";
import QuizUpload from "./components/tutordashboard/QuizUpload";
import OnlineClass from "./components/tutordashboard/OnlineClass";
import SignOut from "./components/Signout";
import StudentClass from "./components/studentdashboard/StudentClass";
import QuizAttempt from "./components/studentdashboard/QuizAttempt";

// or any pure javascript modules available in npm
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TutorSignUp from "./components/TutorSignup";
import StudentSignUp from "./components/StudentSignup";
import { signInAction } from "./store/actions/userActions";

const TutorTabs = createBottomTabNavigator();
const Tabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();
const StudentTabs = createBottomTabNavigator();
const RootStack = createStackNavigator();
const TutorAuthStackScreen = createStackNavigator();
const StudentAuthStackScreen = createStackNavigator();

const TopTabsStack = () => {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name='Tutors' component={AvailableTutors}  />
      <TopTabs.Screen name='Quiz' component={StudentQuiz}  />
      <TopTabs.Screen name='Online Class' component={StudentOnlineClass}  />
    </TopTabs.Navigator>
  )
}

const TutorAuthStack = () => {
  return (
    <TutorAuthStackScreen.Navigator>
      <TutorAuthStackScreen.Screen
        name="Tutor login"
        options={{
          headerShown: false
        }}
        component={TutorLogin}
      />
      <TutorAuthStackScreen.Screen
        name="Tutor Signup"
        options={{
          headerShown: false
        }}
        component={TutorSignUp}
      />
      {/* <TutorAuthStackScreen.Screen name='Detail' component={Detail} 
      options={({route}) => ({title:route.params.title})} /> */}
    </TutorAuthStackScreen.Navigator>
  );
};

const StudentAuthStack = () => {
  return (
    <StudentAuthStackScreen.Navigator>
      <StudentAuthStackScreen.Screen
        name="Student login"
        options={{
          headerShown: false
        }}
        component={StudentLogin}
      />
      <StudentAuthStackScreen.Screen
        name="Student Signup"
        options={{
          headerShown: false
        }}
        component={StudentSignUp}
      />
      {/* <StudentAuthStackScreen.Screen name='Detail' component={Detail} 
      options={({route}) => ({title:route.params.title})} /> */}
    </StudentAuthStackScreen.Navigator>
  );
};

const TutorAccountStack = () => {
  return (
    <TutorTabs.Navigator>
      <TutorTabs.Screen name="Tutor Profile" component={TutorProfile} />
      <TutorTabs.Screen name="Online Class" component={OnlineClass} />
      <TutorTabs.Screen name="Quiz Upload" component={QuizUpload} />
      <TutorTabs.Screen name="Sign Out" component={SignOut} />
      {/* <TutorTabs.Screen name="Tutor Details" component={TutorDetails} /> */}
      {/* <TutorTabs.Screen name='Sell' options={{
              // tabBarButton: () => SellBtn
          }}  component={StudentLogin} /> */}
    </TutorTabs.Navigator>
  );
};

const StudentAccountStack = (user) => {
  return (
      <StudentTabs.Navigator>
          <StudentTabs.Screen name='Student Details' user={user}  component={StudentRegister} />
          {/* <StudentTabs.Screen name='Sell' options={{
              // tabBarButton: () => SellBtn
          }}  component={StudentLogin} /> */}
          {/* <StudentTabs.Screen name='Student Profile'  component={StudentProfile} /> */}
      </StudentTabs.Navigator>
  )
}

const RegisteredStudentStack = (user) => {
  return (
      <StudentTabs.Navigator>
          {/* <StudentTabs.Screen name='Student Details' user={user}  component={StudentRegister} /> */}
          {/* <StudentTabs.Screen name='Sell' options={{
              // tabBarButton: () => SellBtn
          }}  component={StudentLogin} /> */}
          <StudentTabs.Screen name='Student Profile'  component={StudentProfile} />
          <StudentTabs.Screen name='Study Materials'  component={TopTabsStack} />
          {/* <StudentTabs.Screen name='Student Class'  component={StudentProfile} /> */}
          <TutorTabs.Screen name="Sign Out" component={SignOut} />

      </StudentTabs.Navigator>
  )
}
const auth = () => {
  return (
    <Tabs.Navigator>
      {/* <Tabs.Screen name='Explore'  component={StudentRegister} /> */}
      <Tabs.Screen name="Tutor Login" component={TutorAuthStack} />
      {/* <Tabs.Screen name='Sell' options={{
              // tabBarButton: () => SellBtn
          }}  component={StudentLogin} /> */}
      <Tabs.Screen name="Student Login" component={StudentAuthStack} />
      {/* <Tabs.Screen name='Account'  component={TutorRegister} /> */}
    </Tabs.Navigator>
  );
};
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
                  .onSnapshot(
                    doc => {
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
                    },
                    error => {
                      Alert.alert(error.message);
                      store.dispatch(
                        signInAction({
                          id: user.uid,
                          role: userDoc.data().role,
                          isRegister: userDoc.data().register
                        })
                      );
                      this.setState({
                        user: { id: user.uid, role: userDoc.data().role,isRegister: userDoc.data().register },
                        isAuthenticated: true,
                        pageLoading: false
                      });
                    }
                  );
              }
            } else {
              Alert.alert("USER DATA NOT EXISTS!");
              store.dispatch(
                signInAction({ id: user.uid, role: userDoc.data().role,isRegister: userDoc.data().register })
              );
              this.setState({
                user: { id: user.uid, role: userDoc.data().role,isRegister: userDoc.data().register },
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
                // this.props.navigation.replace("Tutor Login");
              });
            Alert.alert(error.message);
          });
      } else {
        // this.props.navigation.replace("tutorlogin");
        console.log("SIGNED OUT");
        this.setState({ pageLoading: false, user: false });
      }
    });
  }
  render() {
    console.log(this.state.user,this.props.navigation)
    console.log(this.state.user);
    return (
      // <QuizUpload />
      // <Quiz />
      <Provider store={store}>
        {this.state.pageLoading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size="large" height="100%" />
          </View>
        ) : (
          <NavigationContainer> 
          <RootStack.Navigator>
              {this.state.user == false ? 
              <RootStack.Screen name='Auth' options={{
                headerShown:false
            }} component={auth} />  :
            this.state.user?.role == 'tutor' && this.state.user?.name ?
              <RootStack.Screen name='Tutor Account' options={{
                   headerShown:false
              }} component={TutorAccountStack} /> : this.state.user?.role == "tutor" && !this.state.user?.name ? (
                <RootStack.Screen
                  name="Tutor Details"
                  options={
                    {
                      // headerShown: false
                    }
                  }
                  component={TutorDetails}
                />
              ) : 
              this.state.user?.role == 'student' && this.state.user?.isRegister == false ?
              <RootStack.Screen name='Student Account' options={{
                // headerShown:false
           }} component={StudentRegister} /> : 
           <RootStack.Screen name='Student Registered' options={{
            headerShown:false
       }} component={RegisteredStudentStack} />}  
          </RootStack.Navigator>
        </NavigationContainer>
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

// const navigator = createStackNavigator({
//   tutorlogin: {
//     screen: TutorLogin
//   },
//   tutorregister: {
//     screen: TutorRegister
//   },
//   tutordetails: {
//     screen: TutorDetails
//   },
//   tutorprofile: {
//     screen: TutorProfile
//   },
//   onlineclass: {
//     screen: OnlineClass
//   },
//   studentlogin: {
//     screen: StudentLogin
//   },
//   studentregister: {
//     screen: StudentRegister
//   },
//   tutorsignup: {
//     screen: TutorSignUp
//   },
//   studentsignup: {
//     screen: StudentSignUp
//   }
// });

// const AppContainer = createAppContainer(withNavigation(navigator));
export default App;
