import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
  StatusBar
} from "react-native";
import firebase from "../config/fire";
import { firestore } from "firebase";
import { UrlIsValid } from "../service/validations";
import { connect } from "react-redux";
import store from "../store/store";
import { addUserDetailsAction } from "../store/actions/userActions";
class StudentRegister extends React.Component {
  state = {
    name: "",
    subject: "",
    level: "",
    contactNumber: Number,
    error: {},
    disabled: true,
    loading: false
  };

  clearInputs = () => {
    this.setState({
      name: "",
      contactNumber: "",
      level: "",
      subject: "",
      error: {}
    });
  };

  isValid = () => {
    const { name, contactNumber, level, subject } = this.state;
    let noError = true;
    if (!name || !contactNumber || !level || !subject) {
      this.setState(({ errors }) => ({
        errors: { ...errors, emptyError: "All Fields are required." }
      }));
      noError = false;
    }
    return noError;
  };

  uploadStudentDetails = () => {
    console.log("clicked", this.state, this.props.user);
    this.setState({ errors: {} });
    const { name, contactNumber, level, subject } = this.state;
    // this.clearInputs();
    console.log({ isValid: this.isValid() });
    if (this.isValid()) {
      this.setState({ loading: true });
      const db = firebase.firestore();
      db.collection("students")
        .doc(this.props.user?.id)
        .set({
          name,
          contactNumber,
          level,
          subject,
          createTime: firestore.Timestamp.now()
        })
        .then(res => {
          store.dispatch(
            addUserDetailsAction({
              ...this.props.user,
              name,
              contactNumber,
              level,
              subject
            })
          );
          firebase
            .firestore()
            .collection("users")
            .doc(this.props.user?.id)
            .set({
              id: this.props.user?.id,
              role: "student",
              register: true
            });

          console.log("res---", res);
          setTimeout(() => {
            this.clearInputs();
            this.setState({ loading: false });
            this.props.navigation.navigate("Student Profile", { data: res });
          }, 100);
        })
        .catch(error => {
          console.error(error.message);
          this.setState({ loading: false });
          Alert.alert(error.message);
        });
    }
  };
  render() {
    if (this.props.user?.name) {
      this.props.navigation.replace("Student Registered", {
        screen: "Student Profile"
      });
    }
    console.log(this.props.user);
    const { name, contactNumber, level, subject, loading } = this.state;
    let btnDisabled = name && contactNumber && level && subject ? false : true;
    return (
      <ImageBackground
        style={styles.image}
        source={require("../assets/image/studentregisterpic.jpg")}
      >
        <ScrollView>
          <Text style={styles.htext}>Student Registration</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Student Name"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            value={name}
            onChangeText={text => {
              this.setState({ name: text });
            }}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Interested for subject"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            value={subject}
            onChangeText={text => {
              this.setState({ subject: text });
            }}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="student class level"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            value={level}
            onChangeText={text => {
              this.setState({ level: text });
            }}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="student contact no"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            value={contactNumber}
            onChangeText={text => {
              this.setState({ contactNumber: text });
            }}
          />
          <View style={styles.btnView}>
            <Button
              style={styles.btn}
              onPress={this.uploadStudentDetails}
              // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
              title={!this.state.loading ? "Register" : "Loading..."}
              color="#2196F3"
              disabled={btnDisabled}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStatetoProps = state => {
  console.log({ state });
  return {
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(mapStatetoProps)(StudentRegister);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  },
  inputBox: {
    width: 200,
    backgroundColor: "grey",
    borderRadius: 25,
    marginLeft: 6,
    marginBottom: 8,
    paddingHorizontal: 19,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 3
  },
  button: {
    width: 160,
    backgroundColor: "#2196F3",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    marginHorizontal: 6
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center"
  },
  htext: {
    marginTop: 9,
    marginBottom: 72,
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 22
  }
});
