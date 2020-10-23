import * as React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground } from 'react-native';

export default class TutorProfile extends React.Component{
  render(){
   return(
     <ScrollView>
     <View style={styles.container}>
     <Text style={styles.htext}>Tutor Profile Details</Text>

     <Text >your name:</Text>
     <Text >interested for the subject :</Text>
     <Text >your teaching experience :</Text>
     <Text >your contact number :</Text>

     <Text  style={styles.student} >Student you will be teaching</Text>
     <Text >Student name:</Text>
     <Text >Student interested for the subject:</Text>
     <Text >Student class level:</Text>
     
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

}
  


})