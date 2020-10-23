import React from 'react';
import { Text, View, StyleSheet, Image,ScrollView,TextInput,TouchableOpacity,ImageBackground } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


export default class QuizUpload extends React.Component{
  render(){
   return(
     <View>
     <Card>
    <Card.Title />
    <Card.Content>
      <Title>Qiuz Upload </Title>
      <Paragraph>Time & Date</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Upload</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
     </View>

   )
  }
}