import React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground } from 'react-native';



export default class OnlineClass extends React.Component{
  render(){
   return(
      <View>
      <Text style={styles.htext}>Online Class</Text>
      </View>
   )
  }
}

const styles = StyleSheet.create({
  htext:{
     marginTop:18,
     marginBottom:52,
    fontWeight: 'bold',
    fontSize: 26,
    marginHorizontal:62
  }
})