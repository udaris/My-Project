import React from 'react';
import {
    View, Image, Text, StyleSheet, KeyboardAvoidingView,
    Platform, ScrollView, TouchableOpacity, TextInput
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { PhotoGallary, submitPost, oldGallary, submitOldPost } from '../Firebase/usersGallary';
import ImgToBase64 from 'react-native-image-base64';
import Firebase from '../Firebase/firebaseConfig';

export default class AddTourlementsPictures extends React.Component {
    state = {
        userEmail: '',
        addTodoVisible: false,
        Id: '',
        title: '',
        details: '',
        userRole: 'userrole',
        imageUrl: '',
        imageUrl2: '',
        loader: false,
    };


    async componentDidMount() {
        try {
            Firebase.database().ref('users')
                .on("value", async (datasnapshot) => {

                    new Promise((resolve, reject) => {

                        const uuid = Firebase.auth().currentUser.uid;

                        datasnapshot.forEach((child) => {

                            if (child.val().uuid === uuid) {
                                this.setState({
                                    userRole: child.val().userRole
                                    
                                })
                            }

                        });
                    });

                })

        } catch (error) {
            alert(error);
        }

        try {
            await Firebase.database().ref('usersGallery/ newest /')

                .on("value", async (datasnapshot) => {

                    new Promise((resolve, reject) => {

                        const uuid = Firebase.auth().currentUser.uid;

                        datasnapshot.forEach((child) => {

                            if (child.val().uid === uuid) {
                                this.setState({

                                    imageUrl: child.val().image,
                                    title:child.val().title,
                                    details:child.val().details

                                })

                            }
                        });
                    });

                })

        } catch (error) {
            alert(error);
        }

        try {
            await Firebase.database().ref('usersGallery/ closed /')

                .on("value", async (datasnapshot) => {

                    new Promise((resolve, reject) => {

                        const uuid = Firebase.auth().currentUser.uid;

                        datasnapshot.forEach((child) => {

                            if (child.val().uid === uuid) {
                                this.setState({

                                    imageUrl2: child.val().image,
                                    title:child.val().title,
                                    details:child.val().details

                                })

                            }
                        });
                    });

                })

        } catch (error) {
            alert(error);
        }
    }

    openGallery() {
        launchImageLibrary('photo', (response) => {

            this.setState({ loader: true });
            ImgToBase64.getBase64String(response.uri)

                .then(async (base64String) => {
                    const uid = Firebase.auth().currentUser.uid;
                    let source = "data:image/jpeg;base64," + base64String;
                    PhotoGallary(source, uid)

                        .then(() => {
                            this.setState({ imageUrl: response.uri, loader: false });
                        })
                })
                .catch(err => this.setState({ loader: false }));
        })
    }

    saveDetails = () => {
        if (this.state.title.length > 3 && this.state.details.length > 10) {

            submitPost(this.state.Id, '', this.state.title, this.state.details, '')
                .then(result => {
                    this.setState({ Id: null });
                    alert("Post shared success")
                }).catch(err => {
                    console.log(err);
                });

        } else {
            alert("not well inserted !")
        }

    }


    openGallery2() {
        launchImageLibrary('photo2', (response) => {

            this.setState({ loader: true });
            ImgToBase64.getBase64String(response.uri)

                .then(async (base64String) => {
                    const uid = Firebase.auth().currentUser.uid;
                    let source = "data:image/jpeg;base64," + base64String;
                    oldGallary(source, uid)

                        .then(() => {
                            this.setState({ imageUrl2: response.uri, loader: false });
                        })
                })
                .catch(err => this.setState({ loader: false }));
        })
    }

    saveDetailsclosed = () => {
        if (this.state.title.length > 3 && this.state.details.length > 10) {

            submitOldPost(this.state.Id, '', this.state.title, this.state.details, '')
                .then(result => {
                    this.setState({ Id: null });
                    alert("Post shared success")
                }).catch(err => {
                    console.log(err);
                });

        } else {
            alert("not well inserted !")
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} >
                <View style={{
                    flexDirection: 'row',
                    height: 70, width: '100%', top: 0, position: 'absolute',
                    backgroundColor: 'aquamarine'  }}>
                    <View style={{ flexDirection: 'row', top: 15, width: '100%' }}>
                        <View style={{ width: 30 }}>
                            <TouchableOpacity
                                onPress={this.props.closeModal}
                                style={{ left: 10 }} >
                                <Icons name='arrow-back' size={30} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', left: 50, alignContent: 'center' }}>
                            <Text style={{ alignContent: 'center',marginTop:5, fontFamily:'Lemon-Regular', fontSize: 17, alignItems: 'center' }}>
                                Add Details and Pictures
                            </Text>
                        </View>
                    </View>
                    <View style={{ right: 10, height: 70, width: '100%', backgroundColor: 'aquamarine' }}></View>
                </View>


                <View style={{ width: '100%', top: 52, backgroundColor: 'gainsboro', left: 1 }} >
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop: 10 }} >
                            <Text style={{ color: 'black', fontSize: 14,fontFamily:'Lemon-Regular', marginBottom: 15 }}> Add necessary and true details and pictures to share others. </Text>
                        </View>

                        {this.state.userRole === 'Admin'? null :
                            <Text style={{ fontFamily:'Lemon-Regular'}}>  Closed  Tourlements</Text>
                        }

                        {this.state.userRole === 'Admin' ? null :
                            <View style={styles.infoBoxWrapper}>
                                <View style={styles.infoBox1}>
                                    <Text style={styles.textinput}>Tourlement Title : </Text>
                                </View>
                                <View style={styles.infoBox2}>
                                    <TextInput placeholder="2021 cricket tourlement by" style={styles.input}
                                        value={this.state.title}
                                        onChangeText={(text) => this.setState({ title: text })}
                                    />
                                </View>
                            </View>
                        }

                        {this.state.userRole === 'Admin' ? null :
                            <View style={styles.infoBoxWrapper}>
                                <View style={styles.infoBox1}>
                                    <Text style={styles.textinput}>Details : </Text>
                                </View>
                                <View style={styles.infoBox2}>
                                    <TextInput placeholder=" organized by  sport club" style={[styles.input, { height: 70 }]}
                                        multiline={true}
                                        value={this.state.details}
                                        onChangeText={(text) => this.setState({ details: text })}
                                    />
                                </View>
                            </View>
                        }

                        {this.state.userRole === 'Admin' ? null :
                            <View style={{ marginTop: 50, marginLeft: 50, width: '70%' }}>
                                <TouchableOpacity style={[styles.signIn, { marginTop: 10 }]}
                                    onPress={() => this.saveDetailsclosed()} >
                                    <LinearGradient colors={['grey', 'blue']} style={styles.signIn}  >
                                        <Text style={styles.textSign}> Save </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        }

                        {this.state.userRole ==='Admin'? null :
                            <View style={{left:10, marginTop: 30, bottom:10 ,flexDirection:'row',  }}>
                                <TouchableOpacity style={{ borderWidth: 2, width: '41%',backgroundColor:'white' }} onPress={() => { this.openGallery2() }} >
                                    <Image
                                        source={{
                                            uri: this.state.imageUrl2 === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png'
                                                : this.state.imageUrl2
                                        }}
                                        style={{ height: 132, width: 135 }}
                                    />

                                </TouchableOpacity>
                                <View><Text style={{fontSize:14,fontFamily:'Lemon-Regular'}} > Add a photo by touching</Text>
                                <Text style={{fontSize:14,fontFamily:'Lemon-Regular'}} > this image box.</Text></View>
                            </View>
                        }

                        {this.state.userRole === 'Admin' ?
                            <Text style={{ fontSize:14,fontFamily:'Lemon-Regular', marginTop: 25 }}>Newest Tourlements </Text>
                            : null}
                        {this.state.userRole === 'Admin' ?
                            <View style={styles.infoBoxWrapper}>
                                <View style={styles.infoBox1}>
                                    <Text style={styles.textinput}>Tourlement Title : </Text>
                                </View>
                                <View style={styles.infoBox2}>
                                    <TextInput placeholder="2021 cricket tourlement by" style={styles.input}
                                        value={this.state.title}
                                        onChangeText={(text) => this.setState({ title: text })}
                                    />
                                </View>
                            </View> : null}

                        {this.state.userRole === 'Admin' ?
                            <View style={styles.infoBoxWrapper}>
                                <View style={styles.infoBox1}>
                                    <Text style={styles.textinput}>Details : </Text>
                                </View>
                                <View style={styles.infoBox2}>
                                    <TextInput placeholder=" organized by  sport club" style={[styles.input, { margin:5,height: 110 }]}
                                        multiline={true}
                                        value={this.state.details}
                                        onChangeText={(text) => this.setState({ details: text })}
                                    />
                                </View>
                            </View> : null}

                        {this.state.userRole ==='Admin'?
                            <View style={{ marginTop: 50, marginLeft: 50, width: '70%' }}>
                                <TouchableOpacity style={[styles.signIn, { marginTop: 10 }]}
                                    onPress={() => this.saveDetails()} >
                                    <LinearGradient colors={['grey', 'pink']} style={[styles.signIn,{marginTop:15}]}  >
                                        <Text style={[styles.textSign,{fontFamily:'Lemon-Regular'}]}> Save </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> : null}
                        {this.state.userRole === 'Admin' ?
                            <View style={{left:10, marginTop: 30, bottom:10 ,flexDirection:'row'}}>
                                <TouchableOpacity style={{ borderWidth: 2, width: '41%', backgroundColor:'white' }} onPress={() => { this.openGallery() }} >
                                    <Image
                                        source={{ uri: this.state.imageUrl === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png' : this.state.imageUrl }}
                                        style={{ height: 132, width: 135 }}
                                    />

                                </TouchableOpacity>
                                <View><Text style={{fontSize:14,fontFamily:'Lemon-Regular'}} > Add a photo by touching</Text>
                                <Text style={{fontSize:14,fontFamily:'Lemon-Regular'}} > this image box.</Text></View>
                            </View> : null}


                    </ScrollView>
                </View>

            </KeyboardAvoidingView>

        )
    }
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        margin: 10,
        width: '100%',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
       
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    teambutton: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        flexDirection: 'row',
        margin: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        left: 5,
        position: 'absolute'
    },
    textSign: {
        fontSize: 18,
        
    },
    textin: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderRightColor: 'green',
        borderRightWidth: 1
    },

    infoBoxWrapper: {
        flexDirection: 'row',
        height: 60,
    },

    infoBox1: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoBox2: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },

});