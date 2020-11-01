import React from 'react';
import { Text, View,Linking, StyleSheet, Button,ScrollView,TextInput,TouchableOpacity, } from 'react-native';
import * as FileSystem from 'expo-file-system'
export default class StudentQuiz extends React.Component{
  download= ()=>{
      Linking.openURL('http://google.com')
      console.log('clicked',FileSystem)
    FileSystem.downloadAsync(
        'http://techslides.com/demos/sample-videos/small.mp4',
        FileSystem.documentDirectory + 'small.mp4'
      )
        .then(({ uri }) => {
          console.log('Finished downloading to ', uri);
        })
        .catch(error => {
          console.error(error);
        });
  }
    render(){
   return(
     <ScrollView>
     <View style={styles.container}>
     <Text style={styles.htext}>Quiz Section</Text>

     <Button
            style={styles.btn}
            onPress={this.download}
            // title={!this.state.loading ? "Submit" : <ActivityIndicator />}
            title={"Download quiz"}
            color="#2196F3"
            // disabled={btnDisabled}
          />     
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