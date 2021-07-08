import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

import firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux'
import { queryUsersByUsername } from '../../../redux/actions/index'
import { bindActionCreators } from 'redux'
import { navbar, utils, text, container } from '../../styles'

function Search(props) {
    const [users, setUsers] = useState([])
    return (
        <View style={[utils.backgroundWhite, container.container]}>
            <View style={{marginVertical: 30, paddingHorizontal: 20}}>
                <TextInput
                    style={utils.searchBar}
                    placeholder="Type Here..."
                    onChangeText={(search) => props.queryUsersByUsername(search).then(setUsers)} />
            </View>


            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[container.horizontal, utils.padding10Sides, utils.padding10Top]}
                        onPress={() => props.navigation.navigate("Profile", { uid: item.id, username: undefined })}>

                        {item.image == 'default' ?
                            (
                                <FontAwesome5
                                    style={[utils.profileImage, utils.marginBottomSmall]}
                                    name="user-circle" size={50} color="black" />

                            )
                            :
                            (
                                <Image
                                    style={[utils.profileImage, utils.marginBottomSmall]}
                                    source={{
                                        uri: item.image
                                    }}
                                />
                            )
                        }
                        <View style={utils.justifyCenter}>
                            <Text style={text.username}>{item.username}</Text>
                            <Text style={text.name} >{item.name}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({ queryUsersByUsername }, dispatch);

export default connect(null, mapDispatchProps)(Search);