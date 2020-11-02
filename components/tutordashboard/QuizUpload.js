import React from "react";
import firebase from "../../config/fire";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Button,
  Linking
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as RNP from "react-native-paper";
import { connect } from "react-redux";
import { firestore } from "firebase";

class QuizUpload extends React.Component {
  state = {
    fullPath: "",
    downloadURL: "",
    progress: 0,
    uploading: false
  };

  pickDocumentPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf"
      });
      //Printing the log realted to the file
      console.log("res : " + JSON.stringify(res));
      console.log("Type : " + res.type);
      if (res.type === "success") {
        this.setState({ uploading: true });
        let that = this;
        let getTime = new Date().getTime();
        let storageRef = firebase.storage().ref();
        let ref = storageRef.child(`/quiz/${getTime}-${res.name}`);
        let fullPath = ref.fullPath;
        let uploadTask = ref.putString(res.uri, "data_url");
        // New Addintion
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            that.setState({
              progress: Math.round(progress)
            });
          },
          function(error) {
            // Handle unsuccessful uploads
            console.error(error.message);
            Alert.alert(error.message);
          },
          function() {
            // Handle successful uploads on complete
            let prevQuiz = that.props?.user?.quiz || [];
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                prevQuiz.push({
                  uploadTime: firestore.Timestamp.now(),
                  pdfLink: downloadURL,
                  storageAddress: fullPath
                });
                const db = firebase.firestore();
                db.collection("tutors")
                  .doc(that.props.user?.id)
                  .set({
                    ...that.props.user,
                    quiz: prevQuiz
                  })
                  .then(() => {
                    that.setState({
                      uploading: false,
                      downloadURL,
                      fullPath
                    });
                  })
                  .catch(error => {
                    console.error(error);
                    Alert.alert(error.message);
                  });
              })
              .catch(error => {
                console.error(error);
                Alert.alert(error.message);
              });
          }
        );
      }
    } catch (err) {
      alert("Unknown Error: " + JSON.stringify(err));
      throw err;
    }
  };

  renderItem = ({ item, index }) => {
    let createDate = new Date(item.uploadTime.seconds * 1000);

    return (
      <RNP.Card style={styles.card}>
        <RNP.Card.Content>
          <RNP.Title>Quiz {index + 1} </RNP.Title>
          <RNP.Paragraph>
            Uploaded: {createDate.toLocaleTimeString()},{" "}
            {createDate.toDateString()}{" "}
          </RNP.Paragraph>
          {/* <Paragraph>Time & Date</Paragraph> */}
        </RNP.Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        <RNP.Card.Actions>
          <RNP.Button onPress={() => Linking.openURL(link)}>
            DOWNLOAD
          </RNP.Button>
        </RNP.Card.Actions>
      </RNP.Card>
    );
  };

  render() {
    let { user } = this.props;
    // console.log({ user });
    return (
      <View>
        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
          <Button
            title={
              this.state.uploading
                ? `Uploading ${this.state.progress}%`
                : "Upload New"
            }
            onPress={this.pickDocumentPDF}
            style={styles.uploadBtn}
          />
        </View>
        {user?.quiz && (
          // <SafeAreaView>
          <FlatList
            data={user.quiz}
            renderItem={this.renderItem}
            keyExtractor={item => item.pdfLink}
          />
          // {/* </SafeAreaView> */}
        )}
      </View>
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
export default connect(mapStatetoProps)(QuizUpload);

const styles = StyleSheet.create({
  card: {
    marginVertical: 10
  },
  webview: {
    backgroundColor: "yellow",
    height: 320,
    width: 200
  },
  uploadBtn: {
    marginTop: 10,
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#4fc3f7",
    alignContent: "center"
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center"
    // fontWeight: 500
  }
});
