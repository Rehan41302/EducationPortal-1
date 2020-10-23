import * as React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground } from 'react-native';
export default class StudentLogin extends React.Component {
  render() {
    return (
      <ScrollView>
      <ImageBackground   style={styles.container} source={require('../assets/image/tutorbackpic.jpg')}>
      
     
        <Image
          style={styles.logo}
          source={require('../assets/image/logo.jpeg')}
        />
    <Text style={styles.logotext}>The Best Place to Learn</Text>

      <Text style={styles.logintext}>Student Login</Text>
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

                 <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}>Login</Text>
           </TouchableOpacity> 
       
       <Text style={{textAlign:'center'}}>Don't have any account? </Text>
      
       <TouchableOpacity  onPress={() => this.props.navigation.navigate('studentsignup')}>
       <Text style={styles.touchtext}>SignUp</Text>
      
     </TouchableOpacity>
    
      
       </ImageBackground>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
   alignItems: 'center',
  
   justifyContent:'center'
    
  },
  
  logo: {
    marginTop:16,
    height:150,
    width: 150,
    marginHorizontal:66,
    borderRadius:16,
    alignItems: 'center',
    textAlign:'center'
  },
  logotext: {
    marginTop:8,
    fontSize:18,
    color:'red',
     alignItems: 'center',
     textAlign:'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'grey',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 3,
  
  },
   button: {
    width:300,
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
  
    logintext:{
      
      color:'black',
      fontWeight: 'bold',
      fontSize: 26, 
       marginTop:18,
       paddingBottom:13,
       textAlign:'center'
    },
    
    touchtext:{
      paddingTop:13,
      color:'blue',
      textAlign:'center'
    }

});
