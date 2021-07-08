import React, { useState } from 'react'
import { View, Button, TextInput, Text,StyleSheet } from 'react-native'
import { form, container } from '../styles'


import firebase from 'firebase'
import { Snackbar } from 'react-native-paper';
require('firebase/firestore');

export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [academicLevel, setLevel] = useState('');
    const [interests, setInterests] = useState('');

    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onRegister = () => {
        if (name.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
    
        firebase.firestore()
            .collection('users')
            .where('username', '==', username)
            .get()
            .then((snapshot) => {

                if (!snapshot.exist) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            if (snapshot.exist) {
                                return
                            }
                            firebase.firestore().collection("users")
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    name,
                                    email,
                                    username,
                                    major,
                                    academicLevel,
                                    interests,
                                    image: 'default',
                                    followingCount: 0,
                                    followersCount: 0,

                                })
                        })
                        .catch(() => {
                            setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
                        })
                }
            }).catch(() => {
                setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
            })

    }

    return (
        <View style={container.center}>
            <View style={container.formCenter}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    value={username}
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="name"
                    onChangeText={(name) => setName(name)}
                />
                 <TextInput
                    style={styles.TextInput}
                    placeholder = "Major"
                    onChangeText = {(major) => setMajor(major)}
                />
                 <TextInput
                    style={styles.TextInput}
                    placeholder = "Academic Level"
                    onChangeText = {(academicLevel) => setLevel(academicLevel)}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder = "Interests"
                    onChangeText = {(interests) => setInterests(interests)}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="email"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <View style = {styles.loginScreenButton}>
                      <Button
                        color="#fff"
                        style={form.button}
                        onPress={() => onRegister()}
                        title="Register">
                    <Text style={{color:"#ffffff"}}>Register</Text>
                </Button>
                </View>

            </View>

            <View style={form.bottomButton} >
                <Text
                    onPress={() => props.navigation.navigate("Login")} >
                    Already have an account? SignIn.
                </Text>
            </View>
            <Snackbar
                visible={isValid.boolSnack}
                duration={2000}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                {isValid.message}
            </Snackbar>
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
        textDecorationColor:'#ffffff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#1E6738',
        shadowColor:'#858585',
        shadowOffset:{width:0,height:9},
        shadowOpacity:1,
        },
    TextInput:{
        marginTop:10, 
        marginLeft:20,
        marginRight:20,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderBottomColor:"#ababab",
        borderBottomWidth:1,
    },
    });

