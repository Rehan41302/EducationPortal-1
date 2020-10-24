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
  Alert
} from "react-native";
import * as firebase from "firebase";

export default class TutorSignUp extends React.Component {
  state = {
    email: "",
    password: ""
  };
  static navigationOption = {
    title: "Sign up"
  };
  userSignup(email, pass) {
    console.log(this.state);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("THEN");
        this.props.navigation.replace("tutorlogin");
      })
      .catch(error => {
        console.log("CATCH", error);
        Alert.alert(error.message);
      });
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/image/signup.jpg")}
      >
        <View style={styles.container}>
          <Text style={styles.htext}>Tutor Signup</Text>

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userSignup(this.state.email, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column"
  },
  htext: {
    marginTop: 76,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30
  },
  inputBox: {
    width: 240,
    backgroundColor: "grey",
    borderRadius: 25,
    marginLeft: 6,
    marginBottom: 10,
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
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center"
  }
});
