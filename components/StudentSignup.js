import * as React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground,Button } from 'react-native';
export default class  StudentSignup extends React.Component{
render(){
     return(
        <ImageBackground style={styles.container} source={require('../assets/image/signup.jpg')}>
      <View style={styles.container}>
           <Text style={styles.htext}>
               Student Signup    
           </Text>
           
           <TextInput style={styles.inputBox}  underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"/>
       
       <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              
              /> 

<TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              
              /> 
                
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('studentlogin')} >
             <Text style={styles.buttonText} >submit</Text>
           </TouchableOpacity>

</View>

      
     </ImageBackground>

     )



}


}

const styles = StyleSheet.create({
    container: {
      flex:1,
     alignItems: 'center',
      flexDirection:'column',
      
     
      
    },
    htext:{
        marginTop:76,
        fontSize:28,
        fontWeight:'bold',
        marginBottom:30
    },
    inputBox: {
        width:240,
        backgroundColor:'grey',
        borderRadius: 25,
        marginLeft:6,
        marginBottom:10,
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
      }

})
  