import React, { useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, RefreshControl,Button, ScrollView,TextInput,StyleSheet ,TouchableWithoutFeedback} from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reload, sendNotification } from '../../redux/actions/index'
import { utils, container, navbar } from '../styles'

export default function Feed() {
    const [user, setUser] = useState(null);
    const [q1, setq1] = useState('');
    const [q2, setq2] = useState('');
    const [q3, setq3] = useState('');
    const [q4, setq4] = useState('');
    const [q5, setq5] = useState('');
    const [q6, setq6] = useState('');
    const [q7, setq7] = useState('');
    const [q8, setq8] = useState('');
    const [isValid, setIsValid] = useState(true);
    const date = new Date();
    const day = date.getDate();

    const onSubmit = () => {
        if (q1.length == 0 || q2.length == 0 || q3.length == 0 || q4.length == 0|| q4.length == 0|| q5.length == 0|| q6.length == 0|| q7.length == 0|| q8.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        firebase.firestore()
            .collection("ema")
            .doc(firebase.auth().currentUser.uid)
            .set({
                q1,
                q2,
                q3,
                q4,
                q5,
                q6,
                q7,
                q8,
                day,
                    })
    }

    useEffect(() => {
        
        firebase.firestore()
        .collection("ema")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            userday = snapshot.data().day; 
        })
   
    });


    return (
        <View style={container.center}>
            <View style={{marginTop:0,alignItems:"center",justifyContent:"center"}}>
                <Text style={{marginTop:10,fontSize:18,fontWeight:"500"}}>EMA</Text>
            </View>
        <View style={container.formCenter}>

            <ScrollView>

            <Text>1. How many hours did you sleep last night?</Text>
            <TextInput
                style={styles.TextInput}
                value={q1}
                keyboardType="numbers-and-punctuation"
                onChangeText={(q1) => setq1(q1)}
            />
            <Text>2. How many hours has it been since you last ate?</Text>
            <TextInput
                style={styles.TextInput}
                onChangeText={(q2) => setq2(q2)}
                keyboardType="numbers-and-punctuation"
            />
            <Text>3. How many hours has it been since you last showered?</Text>
             <TextInput
                style={styles.TextInput}
                onChangeText = {(q3) => setq3(q3)}
                keyboardType="numbers-and-punctuation"
            />
            <Text>4. How many hours have you studied today?</Text>

             <TextInput
                style={styles.TextInput}
                onChangeText = {(q4) => setq4(q4)}
                keyboardType="numbers-and-punctuation"
            />
            <Text>5. How many assignments do you still need to submit this week?</Text>
            <TextInput
                style={styles.TextInput}
                onChangeText = {(q5) => setq5(q5)}
                keyboardType="numbers-and-punctuation"
            />
            <Text>6. How many hours have you prepared for your next exam?</Text>
            <TextInput
                style={styles.TextInput}
                onChangeText = {(q6) => setq6(q6)}
                keyboardType="numbers-and-punctuation"
            />
            <Text>7. How long have you read a book today?  </Text>

            <TextInput
                style={styles.TextInput}
                onChangeText={(q7) => setq7(q7)}
                keyboardType="numbers-and-punctuation"
            />
            <Text>8. How many days has it been since you hung out with a friend?</Text>
            <TextInput
                style={styles.TextInput}
                onChangeText={(q8) => setq8(q8)}
                keyboardType="numbers-and-punctuation"
            />
            <View style = {styles.loginScreenButton}>

                <Button
                    style={{shadowColor:"#000"}}
                    color="#fff"
                    onPress={() => onSubmit()}
                    title="Submit"
                />
            </View>
            </ScrollView>
        </View>

    </View>
    )
}

const styles = StyleSheet.create({
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:60,
        marginBottom:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#1E6738',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#1E6738',
        shadowColor:'#858585',
        shadowOffset:{width:0,height:9},
        shadowOpacity:1,
        },
    TextInput:{
        marginTop:0, 
        marginBottom:10,
        marginLeft:20,
        marginRight:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderBottomColor:"#ababab",
        borderBottomWidth:1,
    },
    });

