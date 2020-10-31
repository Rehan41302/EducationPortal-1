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
  Button
} from "react-native";
import { connect } from "react-redux";

class TutorProfile extends React.Component {
  render() {
    const { user } = this.props;
    console.log({ object: this.props });
    if (!this.props.user?.name) {
      this.props.navigation.replace("Tutor Details");
    }
    return (
      <ScrollView>
        {user.name && (
          <>
            <View style={styles.container}>
              <Text style={styles.htext}>Tutor Profile Details</Text>

              <Text style={styles.info}>
                Your name: <Text style={styles.value}> {user.name}</Text>{" "}
              </Text>
              <Text style={styles.info}>
                Interested for the subject :{" "}
                <Text style={styles.value}> {user.subject}</Text>
              </Text>
              <Text style={styles.info}>
                Your teaching experience :{" "}
                <Text style={styles.value}> {user.experience}</Text>
              </Text>
              <Text style={styles.info}>
                Your contact number :{" "}
                <Text style={styles.value}> {user.contactNumber} </Text>
              </Text>

              <Text style={styles.student}>Student you will be teaching</Text>
              {this.props.user?.students &&
              this.props.user?.students.length > 0 ? (
                <>
                  <Text>Student name:</Text>
                  <Text>Student interested for the subject:</Text>
                  <Text>Student class level:</Text>
                </>
              ) : (
                <Text style={styles.noStdYet}>No Student Enrolled yet.</Text>
              )}
            </View>
            <View>
              <Button
                onPress={() => this.props.navigation.push("onlineclass")}
                // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
                title="Schedule Online Class"
                color="#2196F3"
              />
            </View>
          </>
        )}
      </ScrollView>
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
export default connect(mapStateToProps)(TutorProfile);

const styles = StyleSheet.create({
  htext: {
    marginTop: 9,
    marginBottom: 52,
    color: "green",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 32
  },
  container: {
    backgroundColor: "#F4F6F6"
  },
  info: {
    fontSize: 16
  },
  value: {
    fontSize: 16,
    marginLeft: "3%"
  },

  student: {
    marginTop: 9,
    marginBottom: 42,
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 52
  },
  noStdYet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10
  }
});
