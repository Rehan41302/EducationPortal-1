import * as React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground,Button } from 'react-native';
export default class TutorRegister extends React.Component{
  render(){
    return(
      <ImageBackground style={styles.image} source={require('../assets/image/tutorregisterpic.jpg')}>
      <ScrollView >
        <Text style={styles.htext}>Tutor Registration</Text>
        <TextInput style={styles.inputBox}  underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Tutor Teacher Name"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              />

              <TextInput style={styles.inputBox}  underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="subject want to teach"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              />

              <TextInput style={styles.inputBox}  underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="your teaching experience"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              />
         
         <TextInput style={styles.inputBox}  underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="your contact cell no"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              />
           
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('tutorlogin')} >
             <Text style={styles.buttonText} >Register</Text>
           </TouchableOpacity> 
    </ScrollView>
    </ImageBackground>
    )


  }
}

const styles = StyleSheet.create({
  
  
  image:{
   
    width:'100%',
    height:'100%'
  },
  inputBox: {
    width:240,
    backgroundColor:'grey',
    borderRadius: 25,
    marginLeft:6,
    marginBottom:8,
    paddingHorizontal:19,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 3,
  
  },
   button: {
    width:160,
    backgroundColor:"#2196F3",
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'white',
    textAlign:'center'
  },
  htext:{
     marginTop:18,
     marginBottom:52,
    fontWeight: 'bold',
    fontSize: 26,
    marginHorizontal:32

  }
  });