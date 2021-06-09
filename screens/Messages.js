import React from 'react';
import { View, Image, Text, Modal, StyleSheet, KeyboardAvoidingView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Firebase from '../Firebase/firebaseConfig';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateProfileImage } from '../Firebase/Users';
import ChatScrenn from './ChatScrenn';
import moment from "moment";
import MsgScreen from './MsgScreen';



export default class Messages extends React.Component {

    state = {
        allUsers: [],
        imageUrl: '',
        loggedInUserName: '',
        loader: false,
        addTodoVisible: false,
    }

    async componentDidMount() {
        try {
            await Firebase.database().ref('users')
                .on("value", async (datasnapshot) => {
                    const uuid = Firebase.auth().currentUser.uid;

                    new Promise((resolve, reject) => {
                        let users = [];
                        let lastMessage = '';
                        let lastDate = '';
                        let lastTime = '';
                        let properDate = '';
                        datasnapshot.forEach((child) => {
                            if (child.val().uuid === uuid) {
                                this.setState({
                                    loggedInUserName: child.val().name,
                                    imageUrl: child.val().image
                                })
                            }
                            else {
                                let newUser = {
                                    userId: '',
                                    userName: '',
                                    userProPic: '',
                                    lastMessage: '',
                                    lastDate: '',
                                    lastTime: '',
                                    properDate: ''
                                }
                                new Promise((resolve, reject) => {
                                    Firebase.database().ref("messages")
                                        .child(uuid).child(child.val().uuid).orderByKey().limitToLast(1).on("value", (dataSnapshots) => {
                                            if (dataSnapshots.val()) {
                                                dataSnapshots.forEach((child) => {
                                                    lastMessage = child.val().message.image !== '' ? 'Photo' : child.val().message.msg;
                                                    lastDate = child.val().message.date;
                                                    lastTime = child.val().message.time;
                                                    properDate = child.val().message.date + " " + child.val().message.time;
                                                });
                                            }
                                            else {
                                                lastMessage = '';
                                                lastDate = '';
                                                lastTime = '';
                                                properDate = '';
                                            }
                                            newUser.userId = child.val().uuid;
                                            newUser.userName = child.val().name;
                                            newUser.userProPic = child.val().image;
                                            newUser.lastMessage = lastMessage;
                                            newUser.lastTime = lastTime;
                                            newUser.lastDate = lastDate;
                                            newUser.properDate = properDate;
                                            return resolve(newUser);

                                        });
                                }).then((newUser) => {
                                    users.push({
                                        userName: newUser.userName,
                                        uuid: newUser.userId,
                                        imageUrl: newUser.userProPic,
                                        lastMessage: newUser.lastMessage,
                                        lastTime: newUser.lastTime,
                                        lastDate: newUser.lastDate,
                                        properDate: newUser.lastDate ? new Date(newUser.properDate) : null
                                    });
                                    this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                                });
                                return resolve(users);
                            }
                        });
                    }).then((users) => {
                        this.setState({ allUsers: users.sort((a, b) => b.properDate - a.properDate) });
                    })

                });
        } catch (error) {
            alert(error);
        }
    }

    openGallery() {
        launchImageLibrary('photo', (response) => {
            this.setState({ loader: true });
            this.setState({ imageUrl: response.uri });
            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    const uid = Firebase.auth().currentUser.uid;
                    let source = "data:image/jpeg;base64," + base64String;
                    UpdateProfileImage(source, uid).
                        then(() => {
                            this.setState({ imageUrl: response.uri, loader: false });
                        })
                })
                .catch(err => this.setState({ loader: false }));
        })
    }


    toggleChatScreen() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }
    renderList = list => {
        return <MsgScreen list={list} />;
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container1} >
              
                <View >
                    <View style={{ marginHorizontal: 32, marginTop: 20 }}>


                        <Modal animationType='slide'
                            visible={this.state.addTodoVisible}
                            onRequestClose={() => this.toggleChatScreen()} >
                            <ChatScrenn closeModal={() => this.toggleChatScreen()}
                            />
                        </Modal>

                        <FlatList
                            alwaysBounceVertical={false}
                            data={this.state.allUsers}
                            style={{ padding: 5 }}
                            keyExtractor={(_, index) => index.toString()}
                            ListHeaderComponent={
                                <View style={{ height: 160, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: '#F9813A' }} onPress={() => { this.openGallery() }}>

                                        <Image
                                            source={{ uri: this.state.imageUrl === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png' : this.state.imageUrl }}
                                            style={{ height: 120, width: 120, borderRadius: 60 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{this.state.loggedInUserName}</Text>
                                </View>
                            }
                            renderItem={({ item }) => this.renderList(item)}
                        
                 
                        />
                        <View style={{height:60}} ></View>
                    </View>
                </View>

               
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fedac5",

    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    circle: {
        width: 500,
        height: 770,
        borderRadius: 500 / 2,
        backgroundColor: "pink",
        position: "absolute",
        left: -120,
        top: -20
    },

    header: {
        fontWeight: "800",
        fontSize: 30,
        color: "#514e5a",
        marginTop: 200

    },
    input: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#bab7c3",
        borderRadius: 30,
        paddingHorizontal: 16,
        color: "#514e5a",
        fontWeight: "600",
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});