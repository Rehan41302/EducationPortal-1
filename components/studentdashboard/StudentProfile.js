import React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground } from 'react-native';

export default class StudentProfile extends React.Component{
  render(){
   return(
     <ScrollView>
     <View style={styles.container}>
     <Text style={styles.htext}>Student Profile Details</Text>

     <Text >student name:</Text>
     <Text >interested for the subject :</Text>
     <Text >your class level :</Text>
     <Text >your contact number :</Text>

     <Text  style={styles.student} >Tutor will be teaching</Text>
     <Text >Tutor name:</Text>
     <Text >Tutor interested for the subject:</Text>
     <Text >Tutor teaching experience:</Text>
     
     </View>
     </ScrollView>
   )

  }
}


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