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
  StatusBar,
} from "react-native";

export default class sStudentRegister extends React.Component {
  render() {
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
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Interested for subject"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="student class level"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="student contact no"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("studentlogin")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
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
    marginVertical: 3,
  },
  button: {
    width: 160,
    backgroundColor: "#2196F3",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  htext: {
    marginTop: 9,
    marginBottom: 72,
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 22,
  },
});
