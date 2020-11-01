import React from "react";
import firebase from "../../config/fire";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  FlatList,
  Web,
  SafeAreaView
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import { firestore } from "firebase";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";


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
      <Card style={styles.card}>
        <Card.Content>
          <Title>Quiz {index + 1} </Title>
          <Paragraph>
            Uploaded: {createDate.toLocaleTimeString()},{" "}
            {createDate.toDateString()}{" "}
          </Paragraph>
          {/* <Paragraph>Time & Date</Paragraph> */}
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        <Card.Actions>
          <Button onPress={this.downloadPDF}>DOWNLOAD</Button>
        </Card.Actions>
      </Card>
    );
  };

  downloadPDF = link => {
    FileSystem.downloadAsync(
      "http://techslides.com/demos/sample-videos/small.mp4",
      FileSystem.documentDirectory + "small.mp4"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error);
      });
  };

  render() {
    let { user } = this.props;
    console.log({ user });
    return (
      <View>
        <Button
          style={{ flex: 1, backgroundColor: "#4fc3f7" }}
          onPress={this.pickDocumentPDF}
          disabled={this.state.uploading}
        >
          {this.state.uploading
            ? `Uploading ${this.state.progress}%`
            : "Upload New"}
        </Button>
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
  }
});
