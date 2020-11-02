import React from 'react';
// import { Text, View,Linking, StyleSheet, Button,ScrollView,TextInput,TouchableOpacity, } from 'react-native';
import * as FileSystem from 'expo-file-system'
import { Avatar, Button, Card, Title, Paragraph,} from "react-native-paper";
import {View,Text,FlatList, StyleSheet, Alert,ScrollView, Linking} from 'react-native'
import { connect } from "react-redux";
import firebase from "../config/fire";
import PDFReader from 'rn-pdf-reader-js'
// import {FileSystem} from 'expo-file-system'
class StudentQuiz extends React.Component{
 
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
                <Button onPress={
                  ()=> {
                 
                      FileSystem.downloadAsync(
                       'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
                       FileSystem.documentDirectory + 'small.pdf'
                     )
                       .then(({ uri }) => {
                         console.log('Finished downloading to ', uri);
                       })
                       .catch(error => {
                         console.error(error);
                       });
                 
                                       
                  } }>Download </Button>              )
            })}
          {/* <Paragraph>Time & Date</Paragraph> */}
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        <Card.Actions>
           
          {item?.quiz&&
          <Button onPress={
             ()=> {
               Linking.openURL('http://gahp.net/wp-content/uploads/2017/09/sample.pdf')
             } }>Upload </Button>
          }
        </Card.Actions>
      </Card>
    );
  };
    render(){
      console.log(this.props.tutors?.data,'tutorsol')
   return(
    <ScrollView>
    <Text>HElo</Text>
    <PDFReader
        source={{
          uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
        }}
      />
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
    isAuthenticated: state.authReducer.isAuthenticated
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