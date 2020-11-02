import React from "react";
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
  ActivityIndicator,
  Alert
} from "react-native";
// import { Button } from "native-base";
import firebase from "../../config/fire";
import { firestore } from "firebase";
import { UrlIsValid } from "../../service/validations";
import { connect } from "react-redux";
import store from "../../store/store";
import { addUserDetailsAction } from "../../store/actions/userActions";

class TutorDetails extends React.Component {
  state = {
    name: "",
    contactNumber: "",
    experience: "",
    subject: "",
    disabled: true,
    loading: false,
    errors: {}
  };

  clearInputs = () => {
    this.setState({
      name: "",
      contactNumber: "",
      experience: "",
      subject: "",
      error: {}
    });
  };

  isValid = () => {
    const { name, contactNumber, experience, subject } = this.state;
    let noError = true;
    if (!name || !contactNumber || !experience || !subject) {
      this.setState(({ errors }) => ({
        errors: { ...errors, emptyError: "All Fields are required." }
      }));
      noError = false;
    }
    return noError;
  };

  uploadTeacherDetails = () => {
    console.log("clicked", this.state);
    this.setState({ errors: {} });
    const { name, contactNumber, experience, subject } = this.state;
    // this.clearInputs();
    console.log({ isValid: this.isValid() });
    if (this.isValid()) {
      this.setState({ loading: true });
      const db = firebase.firestore();
      db.collection("tutors")
        .doc(this.props.user.id)
        .set({
          name,
          contactNumber,
          experience,
          subject,
          createTime: firestore.Timestamp.now()
        })
        .then(res => {
          store.dispatch(
            addUserDetailsAction({
              ...this.props.user,
              name,
              contactNumber,
              experience,
              subject
            })
          );
          console.log("res---", res);
          setTimeout(() => {
            this.clearInputs();
            this.setState({ loading: false });
            this.props.navigation.replace("Tutor Profile");
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
      this.props.navigation.replace("Tutor Account", {
        screen: "Tutor Profile"
      });
    }

    const {
      name,
      contactNumber,
      experience,
      subject,
      loading,
      errors
    } = this.state;
    // console.log({ props: this.props });
    let btnDisabled =
      name && contactNumber && experience && subject && !loading ? false : true;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.htext}>Tutor Details</Text>
        <View>
          {errors.emptyError && (
            <Text style={styles.emptyError}>{errors.emptyError}</Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Enter your Name"
            name="name"
            keyboardType="default"
            value={this.state.name}
            required
            onChangeText={text => {
              this.setState({ name: text });
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Enter your Contact Number"
            name="contactNumber"
            keyboardType="default"
            required
            value={this.state.contactNumber}
            onChangeText={text => {
              this.setState({ contactNumber: text });
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Your Experience"
            name="experience"
            keyboardType="default"
            required
            value={this.state.experience}
            onChangeText={text => {
              this.setState({ experience: text });
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Subject you want to Teach"
            name="subject"
            keyboardType="default"
            required
            value={this.state.subject}
            onChangeText={text => {
              this.setState({ subject: text });
            }}
          />
        </View>

        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            onPress={this.uploadTeacherDetails}
            // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
            title={!this.state.loading ? "Submit" : "Loading..."}
            color="#2196F3"
            disabled={btnDisabled}
          />
        </View>
      </ScrollView>
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

export default connect(mapStatetoProps)(TutorDetails);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15
  },
  btnView: {
    marginVertical: 10
  },
  btnText: {
    color: "white"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold"
  },
  htext: {
    marginTop: 18,
    marginBottom: 52,
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginHorizontal: 62
  },
  inputBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    // color: "#efefef",
    marginVertical: 10
  },
  emptyError: {
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 4,
    color: "red"
  },
  error: {
    color: "red",
    fontSize: 12
  }
});
