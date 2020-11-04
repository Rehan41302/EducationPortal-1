import React from 'react';
// import { Text, View,Linking, StyleSheet, Button,ScrollView,TextInput,TouchableOpacity, } from 'react-native';
import * as FileSystem from 'expo-file-system'
import { Avatar, Button, Card, Title, Paragraph,} from "react-native-paper";
import {View,Text,FlatList, StyleSheet, Alert,ScrollView, Linking} from 'react-native'
import { connect } from "react-redux";
import firebase from "../config/fire";
import * as DocumentPicker from "expo-document-picker";
import { firestore } from "firebase";

// import {FileSystem} from 'expo-file-system'
class StudentQuiz extends React.Component{
 state={
   uploading:false
 }

 componentDidMount() {
  const doc = firebase.firestore().collection("studentQuiz")
  .doc(this.props.user?.id)
  .get();
if (doc.exists) console.log(doc.data());
 }
  
// upload=(item)=>{
//  try {
//   const res = await DocumentPicker.getDocumentAsync({
//     type: "application/pdf"
//   });
//   console.log('clicked',item)
//   const db = firebase.firestore()
//   db.collection('studentQuiz')
//   .doc(this.props.user?.id)
//   .set({student:this.props.user?.id,tutor:item.id})
// }
// catch(e){
//   console.log(e.message)
// }
// }
upload = async (item,user) => {
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
      let ref = storageRef.child(`/studentQuiz/${getTime}-${res.name}`);
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
          console.log('api func')
          // Handle successful uploads on complete
          // let prevQuiz = that.props?.user?.quiz || [];
          let prevQuiz =  []; 
          uploadTask.snapshot.ref.getDownloadURL()            
            .then(function(downloadURL) {
              console.log(downloadURL)
              prevQuiz.push({
                uploadTime: firestore.Timestamp.now(),
                pdfLink: downloadURL,
                storageAddress: fullPath
              });
              console.log('1st then',prevQuiz,item)
              const db = firebase.firestore();
              db.collection("studentQuiz")
                .doc(user?.id)
                .set({
                  student:user?.name,  
                  tutor:item?.id,
                  quiz: prevQuiz,
                  subject:item?.subject
                })
                .then((res) => {
                  that.setState({
                    uploading: false,
                    downloadURL,
                    fullPath
                  });
                  console.log(res)
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
    // let createDate = new Date(item.uploadTime.seconds * 1000);
console.log(item)
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>Teacher : {item.name} </Title>
          <Title>Subject : {item.subject}  </Title>

            {item?.quiz&& item.quiz.map((quiz,index)=>{
              console.log(quiz.pdfLink)
              let co = 'https://nextjs.org/docs/deployment'
              return (
                  <Text> {index+1} </Text>
                )
            })}
          {/* <Paragraph>Time & Date</Paragraph> */}
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        <Card.Actions>
           
          {item?.quiz&&
          <Button onPress={()=>this.upload(item,this.props.user)}>Upload </Button>
          }
        </Card.Actions>
      </Card>
    );
  };
    render(){
      console.log(this.props.tutors?.data,'tutorsol')
   return(
    <ScrollView>
   
  {this.props.tutors?.data.length>0?
  <FlatList
    data={this.props.tutors?.data}
    renderItem={this.renderItem}
    // keyExtractor={item => item.pdfLink}
  />
:
<Text>Loading...</Text>
}

  </ScrollView> 
  ) 

  }
}

const mapStatetoProps = state => {
  console.log({ state });
  return {
    tutors: state.tutorReducer.tutors,
    isAuthenticated: state.authReducer.isAuthenticated,  
    user: state.authReducer.user,

  };
};

export default connect(mapStatetoProps)(StudentQuiz)
const styles = StyleSheet.create({
htext:{
     marginTop:9,
     marginBottom:52,
     color:'green',
    fontWeight: 'bold',
    fontSize: 26,
    marginHorizontal:32

  },
  container:{
 
    backgroundColor:'#F4F6F6',
    
  },
  
student:{
     marginTop:9,
     marginBottom:42,
     color:'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal:52

}})