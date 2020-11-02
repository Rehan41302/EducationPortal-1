import React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground } from 'react-native';
import {connect} from 'react-redux'
import { Avatar, Button, Card, Title, Paragraph,} from "react-native-paper";

 class StudentProfile extends React.Component{
  render(){
    console.log(this.props.user)
    const {contactNumber,name,level,subject}= this.props.user
   return(
     <ScrollView>
     <Text style={styles.htext}>Student Profile Details</Text>

         <Card style={styles.card}>
        <Card.Content>
          <Title>student name: {name}</Title>
          <Title>Intrested Subject : {subject} </Title>
          <Title>Student Level : {level} </Title>
          <Title>Contact number : {contactNumber} </Title>          
          {/* <Paragraph>Time & Date</Paragraph> */}
        </Card.Content>
        {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
        {/* <Card.Actions>
          {item?.quiz&&
          <Button onPress={
             ()=>this.enroll(item)}>Upload </Button>
          }
        </Card.Actions> */}
      </Card>
   
    
     </ScrollView>
   )

  }
}


const mapStatetoProps = state => {
  console.log({ state });
  return {
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
export default connect(mapStatetoProps)(StudentProfile);

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