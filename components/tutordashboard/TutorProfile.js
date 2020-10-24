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

export default class TutorProfile extends React.Component {
  render() {
    console.log({ object: this.props.navigation });
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.htext}>Tutor Profile Details</Text>

          <Text>your name:</Text>
          <Text>interested for the subject :</Text>
          <Text>your teaching experience :</Text>
          <Text>your contact number :</Text>

          <Text style={styles.student}>Student you will be teaching</Text>
          <Text>Student name:</Text>
          <Text>Student interested for the subject:</Text>
          <Text>Student class level:</Text>
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.push("onlineclass")}
            // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
            title="Schedule Online Class"
            color="#2196F3"
          />
        </View>
      </ScrollView>
    );
  }
}

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

  student: {
    marginTop: 9,
    marginBottom: 42,
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 52
  }
});
