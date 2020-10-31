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
  Alert
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default class QuizUpload extends React.Component {
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
        // .then(async snapshot => {
        //   let downLink = await ref.getDownloadURL();
        //   console.log("Uploaded a data_url string!", downLink);
        //   that.setState({
        //     // downloadURL: ref.getDownloadURL(),
        //     fullPath
        //   });
        // })
        // .catch(err => {
        //   console.error(err.message);
        //   Alert.alert(err.message);
        // });

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
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
                that.setState({
                  downloadURL,
                  fullPath
                });
              });
          }
        );
      }
      // console.log("File Name : " + res.name);
      // console.log("File Size : " + res.size);
      //Setting the state to show single file attributes
      // setSingleFile(res);
    } catch (err) {
      alert("Unknown Error: " + JSON.stringify(err));
      throw err;
    }
  };

  render() {
    return (
      <View>
        <Card>
          <Card.Title />
          <Card.Content>
            <Title>Qiuz Uploads </Title>
            <Paragraph>Time & Date</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/educationporal.appspot.com/o/quiz%2F1604068768037-Lecture%203.pptx.pdf?alt=media&token=40d52f07-59b2-46ee-a45f-9428d412ed18"
            }}
          />
          <Card.Actions>
            <Button onPress={this.pickDocumentPDF}>
              {this.state.uploading
                ? `Uploading ${this.state.progress}%`
                : "Upload"}
            </Button>
          </Card.Actions>
        </Card>
        <Text>{this.state.fullPath}</Text>
        <Text>{this.state.downloadURL}</Text>
      </View>
    );
  }
}
