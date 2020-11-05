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
  Alert
} from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";

class TutorLogin extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false
  };
  static navigationOptions = {
    title: "Login"
  };
  userSignin(email, pass) {
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("THEN");
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log("Catch", error);
        this.setState({ loading: false });
        Alert.alert(error.message);
      });
  }

  render() {
    console.log(this.props.navigation);
    if (this.props.isAuthenticated)
      this.props.navigation.replace("Tutor Profile");
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/image/tutorpic.jpg")}
      >
        <ScrollView>
          <Image
            style={styles.logo}
            source={require("../assets/image/logo.jpeg")}
          />
          <Text style={styles.logotext}>The Best Place to Learn</Text>

          <Text style={styles.logintext}>Tutor Login</Text>
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
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userSignin(this.state.email, this.state.password);
            }}
            disabled={this.state.loading}
          >
            <Text style={styles.buttonText}>
              {this.state.loading ? "Loading..." : "Login"}
            </Text>
          </TouchableOpacity>

          <Text style={{ textAlign: "center" }}>Don't have any account? </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Tutor Signup", {
                screen: "Tutor Signup",
                params: { title: "Search History" }
              })
            }
            disabled={this.state.loading}
          >
            <Text style={styles.touchtext}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Student Login")}
            disabled={this.state.loading}
          >
            <Text style={styles.touchtext}>Are You Student?</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  console.log({ state });
  return {
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
export default connect(mapStateToProps)(TutorLogin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    justifyContent: "center"
  },

  logo: {
    marginTop: 16,
    height: 150,
    width: 150,
    marginHorizontal: 66,
    borderRadius: 16,
    alignItems: "center",
    textAlign: "center"
  },
  logotext: {
    marginTop: 18,
    fontSize: 18,
    color: "red",
    alignItems: "center",
    textAlign: "center"
  },

  inputBox: {
    width: 300,
    backgroundColor: "grey",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 3
  },
  button: {
    width: 300,
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
  },

  logintext: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 18,
    paddingBottom: 13,
    textAlign: "center"
  },

  touchtext: {
    paddingTop: 13,
    color: "blue",
    textAlign: "center"
  }
});
