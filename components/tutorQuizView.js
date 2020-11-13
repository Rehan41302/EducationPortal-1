import React from "react";
// import { Text, View,Linking, StyleSheet, Button,ScrollView,TextInput,TouchableOpacity, } from 'react-native';
import * as FileSystem from "expo-file-system";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import firebase from "../config/fire";
import * as DocumentPicker from "expo-document-picker";
import { firestore } from "firebase";
import store from "../store/store";

// import {FileSystem} from 'expo-file-system'
class TutorQuizView extends React.Component {
  state = {
    uploading: false,
    data: undefined,
    loading: true
  };

  //  componentDidMount() {
  //   const doc = firebase.firestore().collection("studentQuiz")
  //   .doc(this.props.user?.id)
  //   .get();
  // if (doc.exists) console.log(doc.data());
  //  }

  componentDidMount() {
    let arr = [];
    let filteredArr = [];
    firebase
      .firestore()
      .collection("studentQuiz")
      .get()
      .then(res => {
        res.docs.forEach(doc => {
          let items = doc.data();
          items.id = doc.id;
          /* Make data suitable for rendering */
          // items = JSON.stringify(items);
          arr.push(items);
          if (items.students) filteredArr.push(items);

          /* Update the components state with query result */
          console.log(items, "av");
          setTimeout(() => {
            this.setState({ data: filteredArr, loading: false });
            //     store.dispatch(
            //         availableTuTors({
            //         //   ...doc.data(),
            //         //   id: user.uid,
            //           data:filteredArr
            //         })
            //       );
          }, 100);
          // this.setState({ items : items })
        });
      })
      .catch(err => console.log(err.message));
  }
  renderItem = ({ item, index }) => {
    // let createDate = new Date(item.uploadTime.seconds * 1000);
    console.log({ item });
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>Student name : {item.student} </Title>
          <Title>Subject : {item.subject} </Title>

          {/* <Paragraph>Time & Date</Paragraph> */}
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        <Card.Actions>
          {item?.quiz && (
            <Button onPress={() => Linking.openURL(item.quiz[0]?.pdfLink)}>
              Download{" "}
            </Button>
          )}
        </Card.Actions>
      </Card>
    );
  };

  render() {
    console.log(this.props.user?.id, "tutorsol");
    // if(this.state.data?.length>0 && this.props.user?.id !== this.state.data?.length>0 && this.state.data[0].tutor){
    //   console.log(this.props.user?.id,this.state.data[0].tutor)
    //   return <Text>No Data Found</Text>
    // }
    return (
      <ScrollView>
        {this.state?.data?.length > 0 ? (
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            // keyExtractor={item => item.pdfLink}
          />
        ) : this.state.loading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator
              size="large"
              height="100%"
              animating={true}
              color="blue"
            />
          </View>
        ) : (
          <Text style={styles.center}> No Data Available.</Text>
        )}
      </ScrollView>
    );
  }
}

const mapStatetoProps = state => {
  console.log({ state });
  return {
    tutors: state.tutorReducer.tutors,
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
  };
};

export default connect(mapStatetoProps)(TutorQuizView);
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

  loaderView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 200
    // flexDirection: "row"
  },

  student: {
    marginTop: 9,
    marginBottom: 42,
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 52
  },
  center: {
    textAlign: "center",
    marginVertical: 200
  }
});
