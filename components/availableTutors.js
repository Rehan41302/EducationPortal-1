import React from 'react';
import { Avatar, Button, Card, Title, Paragraph,} from "react-native-paper";
import {View,Text,FlatList, StyleSheet, Alert,ScrollView} from 'react-native'
import { connect } from "react-redux";
import firebase from "../config/fire";
import store from '../store/store';
import {availableTuTors} from '../store/actions/tutors'
 class AvailableTutors extends React.Component{
    state={
        data:[]
    }
    componentDidMount() {
        let arr =[]
        let filteredArr = []
         firebase.firestore().collection("tutors")
        .get().then(res=>{
            res.docs.forEach(doc => {
                let items = doc.data();
                items.id=doc.id
                /* Make data suitable for rendering */
                // items = JSON.stringify(items);
                arr.push(items)
                if(items.students)
                    filteredArr.push(items)

                /* Update the components state with query result */
                console.log(items,'av',)
                setTimeout(() => {
                    this.setState({data:arr})     
                    store.dispatch(
                        availableTuTors({
                        //   ...doc.data(),
                        //   id: user.uid,
                          data:filteredArr
                        })
                      );           
                }, 100);
                // this.setState({ items : items }) 
            });   
             })
             .catch(err => console.log(err.message))
    }

    renderItem = ({ item, index }) => {
        // let createDate = new Date(item.uploadTime.seconds * 1000);
    console.log(item)
        return (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Teacher : {item.name} </Title>
              <Title>Subject : {item.subject} </Title>
              <Paragraph>
                Uploaded: 
              </Paragraph>
              {/* <Paragraph>Time & Date</Paragraph> */}
            </Card.Content>
            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
            <Card.Actions>
              <Button onPress={
                  item?.students?.includes(this.props.user?.id)?
                  void 0 :()=>this.enroll(item)}> {item?.students?.includes(this.props.user?.id)?
              "Enrolled" : "Enroll"}</Button>
            </Card.Actions>
          </Card>
        );
      };
   
    enroll=(item)=>{
        // console.log(item,this.props.user)
        let data = {...item} 
        if(data?.students) {
            console.log(data)
            let filter = data.students.filter(std => {
                return std == this.props.user?.id
            })
            if(filter.length==0){
                data.students.push(this.props.user?.id)
                console.log(filter)
            }
            else{
                Alert.alert('Already enrolled in this ourse')
                return
            }
        }
        else{
            console.log(data)
            data.students = [this.props.user?.id]
        }
        console.log(this.props.user?.id)
        let currentStudent = undefined;

        let student_data = firebase.firestore().collection('students').doc(this.props.user?.id)
        student_data.get().then(res=>{
            let items = res.data()
            items.tutors ? items.tutors.push(item.id) : items.tutors = [item.id]    ;
            currentStudent = items                   
        })
        .catch(err => console.log(err.message));

        const db = firebase.firestore();
        db.collection("tutors")
        .doc(item.id)
        .set(data).then(res=>{
            db.collection("students")
            .doc(this.props.user?.id)
            .set(currentStudent).then(res=>{
                console.log(res)
              
            })
            .catch(err => err.message)        
        })
        .catch(err => err.message)
        console.log(data)    
        
    }
    render(){
        console.log(this.state.data)
        const {data} = this.state
        return(
            <ScrollView>
            {/* <Text>HElo</Text> */}
          {data.length>0?
          <FlatList
            data={data}
            renderItem={this.renderItem}
            // keyExtractor={item => item.pdfLink}
          />
    :
    <Text>Loading...</Text>
    }
        
          </ScrollView> )
    }
}

const mapStatetoProps = state => {
    console.log({ state });
    return {
      user: state.authReducer.user,
      isAuthenticated: state.authReducer.isAuthenticated
    };
  };
  export default connect(mapStatetoProps)(AvailableTutors);
  
const styles = StyleSheet.create({
    card: {
      marginVertical: 10
    }
  });