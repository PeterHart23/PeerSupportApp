import React, { useState } from 'react'
import { View, Button, TextInput, Text,Image,StyleSheet } from 'react-native'
import { form, container } from '../styles'

import firebase from 'firebase'



export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={container.center}>
                <View style={{marginTop:60,alignItems:"center",justifyContent:"center"}}>
                    <Image source = {require("../../assets/csulogo.png")}
                            style = {{height:100,width:100}}></Image>
                     <Text style={{marginTop:10,fontSize:22,fontWeight:"500"}}>Peer Support App</Text>
                </View>
            <View style={container.formCenter}>
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
                
            <View style={[styles.loginScreenButton, {justifyContent: 'center'} ]}>
                <Button
                    color="#fff"
                    style={form.button}
                    onPress={() => onSignIn()}
                    title="Sign In"
                >
                    <Text style={{color:"#ffffff"}}>Login</Text>
                </Button>
            </View>
            </View>


            <View style={form.bottomButton} >
                <Text
                    title="Register"
                    onPress={() => props.navigation.navigate("Register")} >
                    Don't have an account? SignUp.
                    </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:30,
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