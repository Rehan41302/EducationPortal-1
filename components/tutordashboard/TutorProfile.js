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
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import firebase from "../../config/fire";
import // { Avatar, Button, Card, Title, Paragraph }
* as RNP from "react-native-paper";

class TutorProfile extends React.Component {
  state = {
    students: undefined,
    loadingStd: true
  };
  componentDidMount() {
    let { user } = { ...this.props };
    let that = this;
    async function filterStudents() {
      if (user?.students && user.students.length > 0) {
        const db = firebase.firestore();
        let newStd = [];
        for (let i = 0; i < user.students.length; i++) {
          let doc = await db
            .collection("students")
            .doc(user.students[i])
            .get();
          if (doc.exists) newStd.push(doc.data());
        }
        console.log({ newStd });
        that.setState({ students: newStd, loadingStd: false });
      } else that.setState({ loadingStd: false });
    }
    filterStudents();
  }

  renderItem = ({ item, index }) => {
    return (
      <RNP.Card style={styles.card}>
        <RNP.Card.Content>
          <RNP.Title>{item.name}</RNP.Title>
          <RNP.Paragraph>Class Level: {item.level}</RNP.Paragraph>
          {/* <Paragraph>Time & Date</Paragraph> */}
        </RNP.Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        {/* <RNP.Card.Actions>
          <RNP.Button onPress={this.downloadPDF}>DOWNLOAD</RNP.Button>
        </RNP.Card.Actions> */}
      </RNP.Card>
    );
  };

  render() {
    const { user } = this.props;
    console.log({ object: this.props });
    if (!this.props.user?.name) {
      this.props.navigation.replace("Tutor Details");
    }
    console.log({ studen: this.state.students });
    return (
      <ScrollView>
        {user.name && (
          <>
            <View style={styles.container}>
              <Text style={styles.htext}>Tutor Profile Details</Text>

              <View style={styles.fieldSet}>
                <Text style={styles.info}>Your name:</Text>
                <Text style={styles.value}> {user.name}</Text>
              </View>
              <View style={styles.fieldSet}>
                <Text style={styles.info}>Interested for the subject:</Text>
                <Text style={styles.value}> {user.subject}</Text>
              </View>
              <View style={styles.fieldSet}>
                <Text style={styles.info}>Your teaching experience:</Text>
                <Text style={styles.value}> {user.experience}</Text>
              </View>
              <View style={styles.fieldSet}>
                <Text style={styles.info}>Your  contact number:</Text>
                <Text style={styles.value}> {user.contactNumber}</Text>
              </View>

              <Text style={styles.student}>Your Enrolled Students</Text>
              {this.state.students && this.state.students.length > 0 ? (
                <FlatList
                  data={this.state.students}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.contactNumber + item.level}
                />
              ) : this.state.loadingStd ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator
                    size="large"
                    height="100%"
                    animating={true}
                    color="green"
                  />
                </View>
              ) : (
                // <Text style={{ flex: 1, textAlign: "center" }}>Loading...</Text>
                <Text style={styles.noStdYet}>No Student Enrolled yet.</Text>
              )}
            </View>
            {/* <View>
              <Button
                onPress={() => this.props.navigation.push("onlineclass")}
                // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
                title="Schedule Online Class"
                color="#2196F3"
              />
            </View> */}
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
  fieldSet: {
    flex: 1,
    flexDirection: "row"
  },
  loaderView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // flexDirection: "row"
  },
  htext: {
    marginTop: 9,
    marginBottom: 52,
    color: "green",
    fontWeight: "bold",
    fontSize: 26,
    marginHorizontal: 32
  },
  container: {
    backgroundColor: "#F4F6F6",
    marginHorizontal: 10
  },
  info: {
    fontSize: 16,
    flex: 2,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#cacaca"
  },
  value: {
    fontSize: 16,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#cacaca",
    flex: 1,
    paddingHorizontal: 3
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
  },
  card: {
    marginVertical: 10
  }
});
