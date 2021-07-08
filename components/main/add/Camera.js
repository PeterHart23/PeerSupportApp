import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';

import { utils } from '../../styles'


export default function VideoScreen(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFlash, setIsFlash] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [type, setType] = useState(0);
    const cameraRef = useRef();
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestPermissionsAsync();

            const audioPermissions = await Audio.requestPermissionsAsync();

            if (cameraPermissions.status === 'granted' && audioPermissions.status === 'granted') {
                setHasPermission(true)
            }
        })();
    }, [props]);
    const onCameraReady = () => {
        setIsCameraReady(true);
    };
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                props.navigation.navigate('Save', { source, imageSource: null, type })
            }
        }
    };
    const recordVideo = async () => {
        if (cameraRef.current) {
            try {

                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480p'] }


                const videoRecordPromise = cameraRef.current.recordAsync(options);
                if (videoRecordPromise) {
                    setIsVideoRecording(true);
                    const data = await videoRecordPromise;
                    const source = data.uri;
                    let imageSource = await generateThumbnail(source)
                    props.navigation.navigate('Save', { source, imageSource, type })

                }
            } catch (error) {
                console.warn(error);
            }
        }
    };
    const generateThumbnail = async (source) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {
                    time: 0,
                }
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };


    const stopVideoRecording = async () => {

        if (cameraRef.current) {
            setIsVideoRecording(false);
            cameraRef.current.stopRecording();
        }
    };
    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            props.navigation.navigate('Save', { source: result.uri, type: result.type == 'video' ? 0 : 1 })
        }
    };

    console.log("asdnansd")

    const renderCaptureControl = () => (
        <View>
            <View style={{ justifyContent: 'space-evenly', width: '100%', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                <TouchableOpacity disabled={!isCameraReady} onPress={() => setIsFlash(!isFlash)} >
                    <Feather style={utils.margin15} name={"zap"} size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                    <Feather style={utils.margin15} name="rotate-cw" size={25} color="black" />
                </TouchableOpacity>
                {type == 0 ?

                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onLongPress={recordVideo}
                        onPressOut={stopVideoRecording}
                        style={styles.capture}
                    />
                    :
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onPress={takePicture}
                        style={styles.capturePicture}
                    />}

                <TouchableOpacity disabled={!isCameraReady} onPress={() => type == 1 ? setType(0) : setType(1)} >
                    <Feather style={utils.margin15} name={type == 0 ? "camera" : "video"} size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isCameraReady} onPress={() => pickImage()} >
                    <Feather style={utils.margin15} name={"image"} size={25} color="black" />
                </TouchableOpacity>
            </View>

        </View>

    );
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    console.log({ isFocused: props.isFocused });

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>

            <View

                style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
                {isFocused ?
                    <Camera
                        ref={cameraRef}

                        style={{ flex: 1 }}
                        type={cameraType}
                        flashMode={isFlash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                        style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
                        ratio={'1:1'}
                        onCameraReady={onCameraReady}
                        onMountError={(error) => {
                            console.log("cammera error", error);
                        }}
                    />
                    : null}

            </View>

            <View style={[{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
            }]}>
                <View>
                    {renderCaptureControl()}
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        top: 35,
        left: 15,
        height: closeButtonSize,
        width: closeButtonSize,
        borderRadius: Math.floor(closeButtonSize / 2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4c5c4",
        opacity: 0.7,
        zIndex: 2,
    },
    media: {
        ...StyleSheet.absoluteFillObject,
    },
    closeCross: {
        width: "68%",
        height: 1,
        backgroundColor: "black",
    },
    control: {
        position: "absolute",
        flexDirection: "row",
        bottom: 38,
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
    },
    recordIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        top: 0,
        opacity: 0.7,
    },
    recordTitle: {
        fontSize: 14,
        color: "black",
        textAlign: "center",
    },
    recordDot: {
        borderRadius: 3,
        height: 6,
        width: 6,
        backgroundColor: "#ff0000",
        marginHorizontal: 5,
    },
    text: {
        color: "#000000",
    },

    capture: {
        backgroundColor: "red",
        borderRadius: 5,
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31,
    },
    capturePicture: {
        borderWidth: 6,
        borderColor: 'gray',
        backgroundColor: "white",
        borderRadius: 5,
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31,
    },
});
