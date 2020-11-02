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
  Alert,
  Linking
} from "react-native";
// import { Button } from "native-base";
import firebase from "../../config/fire";
import { firestore } from "firebase";
import { UrlIsValid } from "../../service/validations";
import { connect } from "react-redux";
import // { Avatar, Button, Card, Title, Paragraph }
* as RNP from "react-native-paper";

class OnlineClass extends React.Component {
  state = {
    className: "",
    course: "",
    timing: "",
    zoomLink: "",
    disabled: true,
    loading: false,
    errors: {}
  };

  clearInputs = () => {
    this.setState({
      // course: "",
      timing: "",
      zoomLink: "",
      error: {}
    });
  };

  isValid = () => {
    const { course, timing, zoomLink } = this.state;
    let noError = true;
    if (!timing || !zoomLink) {
      this.setState(({ errors }) => ({
        errors: { ...errors, emptyError: "All Fields are required." }
      }));
      noError = false;
    }
    if (!UrlIsValid(zoomLink)) {
      this.setState(({ errors }) => ({
        errors: { ...errors, zoomLink: "Invalid Link." }
      }));
      noError = false;
    }
    return noError;
  };

  uploadNewClass = () => {
    console.log("clicked", this.state);
    this.setState({ errors: {} });
    const { course, timing, zoomLink } = this.state;
    // this.clearInputs();
    console.log({ isValid: this.isValid(), url: UrlIsValid(zoomLink) });
    if (this.isValid()) {
      this.setState({ loading: true });
      const db = firebase.firestore();
      let that = this;
      db.collection("tutors")
        .doc(this.props.user.id)
        .set({
          ...that.props.user,
          class: {
            timing,
            zoomLink,
            uploadTime: firestore.Timestamp.now()
          }
        })
        .then(res => {
          this.setState({ loading: false });
          // console.log("res---", res);
          this.clearInputs();
          this.props.navigation.goBack();
        })
        .catch(error => {
          console.error(error.message);
          this.setState({ loading: false });
          Alert.alert(error.message);
        });
    }
  };

  render() {
    const { course, timing, zoomLink, loading, errors } = this.state;
    // console.log({ props: this.props });
    let { user } = this.props;
    let btnDisabled = timing && zoomLink && !loading ? false : true;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.htext}>Online Class</Text>
        {/* <View>
          <Text style={styles.label}>Class</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Enter Class"
            name="className"
            keyboardType="default"
            value={this.state.className}
            required
            onChangeText={text => {
              this.setState({ className: text });
            }}
          />
        </View> */}
        <View>
          {errors.emptyError && (
            <Text style={styles.emptyError}>{errors.emptyError}</Text>
          )}
        </View>
        {/* <View>
          <Text style={styles.label}>Course</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Enter Course"
            name="course"
            keyboardType="default"
            value={this.state.course}
            onChangeText={text => {
              this.setState({ course: text });
            }}
          />
        </View> */}
        <View>
          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Class Timing"
            name="timing"
            keyboardType="default"
            value={this.state.timing}
            onChangeText={text => {
              this.setState({ timing: text });
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Zoom Link</Text>
          {errors.zoomLink && (
            <Text style={styles.error}>{errors.zoomLink}</Text>
          )}
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Paste Zoom Link Here"
            name="zoomLink"
            keyboardType="default"
            value={this.state.zoomLink}
            onChangeText={text => {
              this.setState({ zoomLink: text });
            }}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            onPress={this.uploadNewClass}
            // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
            title={!this.state.loading ? "Submit" : "Loading..."}
            color="#2196F3"
            disabled={btnDisabled}
          />
        </View>

        <View>
          {user?.class && 
          <RNP.Card>
            <RNP.Card.Content>
              <RNP.Title>Online Class</RNP.Title>
              <RNP.Paragraph>Uploaded: {new Date(user.class.uploadTime.seconds * 1000).toDateString()}, {new Date(user.class.uploadTime.seconds * 1000).toLocaleTimeString()}</RNP.Paragraph>
              <RNP.Paragraph>Timing: {user.class.timing}</RNP.Paragraph>
              {/* <Paragraph>Time & Date</Paragraph> */}
            </RNP.Card.Content>
            <RNP.Card.Actions>
              <Button title="Join" onPress={() =>Linking.openURL(user.class.zoomLink)}>JOIN</Button>
            </RNP.Card.Actions>
          </RNP.Card>
          }
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
export default connect(mapStatetoProps)(OnlineClass);

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
