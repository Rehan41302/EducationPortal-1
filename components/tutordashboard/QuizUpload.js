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
  SafeAreaView,
  Button
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import // { Avatar, Button, Card, Title, Paragraph }
* as RNP from "react-native-paper";
import { connect } from "react-redux";
import { firestore } from "firebase";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";

const PDFVIEW = () => {
  let webView = undefined;
  return (
    <WebView
      style={styles.webview}
      source={{
        uri:
          "https://firebasestorage.googleapis.com/v0/b/educationporal.appspot.com/o/quiz%2F1604218587548-intro-lec01-converted.pdf?alt=media&token=5a1058b1-b0b2-42d9-9d05-0ce991053572"
      }}
      ref={ref => {
        webView = ref;
      }}
      // onError={() => {
      //   webView.reload();
      // }}
    />
  );
};

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
          <RNP.Button onPress={this.downloadPDF}>DOWNLOAD</RNP.Button>
        </RNP.Card.Actions>
      </RNP.Card>
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
    // if (user) {
    //   return <PDFVIEW />;
    // }
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
        {/* <TouchableOpacity
          style={styles.uploadBtn}
          onPress={this.pickDocumentPDF}
        >
          <Text style={styles.btnText}>
            {this.state.uploading
              ? `Uploading ${this.state.progress}%`
              : "Upload New"}
          </Text>
        </TouchableOpacity> */}
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
