import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, TextInput, Text, Image, Button, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { updateUserFeedPosts } from '../../../redux/actions/index'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { container, form, utils, navbar, text } from '../../styles'

function Edit(props) {
    const [name, setName] = useState(props.currentUser.name);
    const [major, setMajor] = useState('');
    const [academicLevel, setLevel] = useState('');
    const [interests, setInterests] = useState('');

    const [image, setImage] = useState(props.currentUser.image);
    const [imageChanged, setImageChanged] = useState(false);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    const onLogout = async () => {
        firebase.auth().signOut();
        Updates.reloadAsync()    
    }


    useEffect(() => {
        (async () => {
            if (props.currentUser.major !== undefined) {
                setMajor(props.currentUser.major)
            }
            if (props.currentUser.academicLevel !== undefined) {
                setLevel(props.currentUser.academicLevel)
            }
            if (props.currentUser.interests !== undefined) {
                setInterests(props.currentUser.interests)
            }

        })();
    }, []);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (

                <Feather style={navbar.image} name="check" size={24} color="green" onPress={() => { console.log({ name, major,academicLevel,interests }); Save() }} />
            ),
        });
    }, [props.navigation, name, major, academicLevel,interests,image, imageChanged]);


    const pickImage = async () => {
        if (true) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
                setImageChanged(true);
            }
        }
    };


    const Save = async () => {
        if (imageChanged) {
            const uri = image;
            const childPath = `profile/${firebase.auth().currentUser.uid}`;

            const response = await fetch(uri);
            const blob = await response.blob();

            const task = firebase
                .storage()
                .ref()
                .child(childPath)
                .put(blob);

            const taskProgress = snapshot => {
                console.log(`transferred: ${snapshot.bytesTransferred}`)
            }

            const taskCompleted = () => {
                task.snapshot.ref.getDownloadURL().then((snapshot) => {

                    firebase.firestore().collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .update({
                            name,
                            major,
                            academicLevel,
                            interests,
                            image: snapshot,
                        }).then(() => {
                            props.navigation.goBack()

                        })
                })
            }

            const taskError = snapshot => {
                console.log(snapshot)
            }

            task.on("state_changed", taskProgress, taskError, taskCompleted);
        } else {
            saveData({
                name,
                major,
                academicLevel,
                interests
            })
        }
    }

    const saveData = (data) => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update(data).then(() => {
                props.navigation.goBack()
            })
    }

    return (
        <View style={container.form}>

            <TouchableOpacity style={[utils.centerHorizontal, utils.marginBottom]} onPress={() => pickImage()} >
                {image == 'default' ?
                    (
                        <FontAwesome5
                            style={[utils.profileImageBig, utils.marginBottomSmall]}
                            name="user-circle" size={80} color="black" />
                    )
                    :
                    (
                        <Image
                            style={[utils.profileImageBig, utils.marginBottomSmall]}
                            source={{
                                uri: image
                            }}
                        />
                    )
                }
                <Text style={text.changePhoto}>Change Profile Photo</Text>
            </TouchableOpacity>

            <TextInput
                value={name}
                style={form.textInput}
                placeholder="Name"
                onChangeText={(name) => setName(name)}
            />
            <TextInput
                value={major}
                style={form.textInput}
                placeholder="Major"
                onChangeText={(major) => setMajor(major)}
            />
               <TextInput
                value={academicLevel}
                style={form.textInput}
                placeholder="Academic Level"
                onChangeText={(academicLevel) => setLevel(academicLevel)}
            />
                <TextInput
                value={interests}
                style={form.textInput}
                placeholder="Interests"
                onChangeText={(interests) => setInterests(interests)}
            />
            
            <Button
                title="Logout"
                onPress={() => onLogout()} />
        </View>

    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

const mapDispatchProps = (dispatch) => bindActionCreators({ updateUserFeedPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Edit);
