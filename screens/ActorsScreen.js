import React from 'react';
import {
    StyleSheet, Text, TextInput, View,
    StatusBar, Button, TouchableOpacity, Dimensions, Platform, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ActorsScreen = ({ navigation }) => {
    return (

        <View style={styles.container}>





            <View style={styles.header}>

                <Text style={[styles.text_header]}>Who are you ?</Text>
            </View>

            <View style={styles.footer}>

                <View style={styles.actor}>

                </View>



                <View style={[styles.button, { marginTop: 20, marginBottom: 20, borderColor: '#009387', borderWidth: 2 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign UP1')}>
                        <Text style={[styles.textSign, { color: '#009387' }]} >Player</Text>


                    </TouchableOpacity>
                </View>


                <View style={[styles.button, { marginTop: 20, marginBottom: 20, borderColor: '#009387', borderWidth: 2 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign UP2')}>
                        <Text style={[styles.textSign, { color: '#009387' }]} >Coach</Text>


                    </TouchableOpacity>
                </View>


                <View style={[styles.button, { marginTop: 20, borderColor: '#009387', borderWidth: 2 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign UP3')}>
                        <Text style={[styles.textSign, { color: '#009387' }]} >Parent</Text>


                    </TouchableOpacity>
                </View>

            </View>
        </View>

        /* <View style={styles.container}>
         <TouchableOpacity onPress={()=>navigation.navigate("Sign UP")}
                 style={[styles.signIn,{borderColor:"black", borderWidth:1, marginTop:15}]}> 
                 <Text style={styles.textSign}> Sign Up </Text></TouchableOpacity>
                 </View>*/

    );
}

export default ActorsScreen;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',

    },

    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },

    footer: {
        flex: 12,
        backgroundColor: '#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingVertical: 40,
        paddingHorizontal: 35,
        //borderColor:'#08d4c4',
        //borderWidth:3
    },


    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,

    },
    action: {
        flexDirection: 'row',
        marginTop: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },

    button: {
        alignItems: 'center',
        borderRadius: 30,
        margin: 10,
        padding: 12

    },
    singIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontWeight: 'bold',
        fontSize: 18
    },
    actor: {
        width: 10,
        height: 10,
        marginLeft: 70,
        //alignItems:'center'
    }
});


/*import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


function Actor({ navigation }) {
    return (
        <View style={styles.container}>





            <View style={styles.header}>

                <Text style={[styles.text_header]}>Who are you ?</Text>
            </View>

            <View style={styles.footer}>

                <View style={styles.actor}>

                </View>



                <View style={[styles.button, { marginTop: 20, marginBottom: 20, borderColor: '#009387', borderWidth: 2 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('PlayerForm')}>
                        <Text style={[styles.textSign, { color: '#009387' }]} >Player</Text>


                    </TouchableOpacity>
                </View>


                <View style={[styles.button, { marginTop: 20, marginBottom: 20, borderColor: '#009387', borderWidth: 2 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('CoachForm')}>
                        <Text style={[styles.textSign, { color: '#009387' }]} >Coach</Text>


                    </TouchableOpacity>
                </View>


                <View style={[styles.button, { marginTop: 20, borderColor: '#009387', borderWidth: 2 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('ParentForm')}>
                        <Text style={[styles.textSign, { color: '#009387' }]} >Parent</Text>


                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',

    },

    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },

    footer: {
        flex: 12,
        backgroundColor: '#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingVertical: 40,
        paddingHorizontal: 35,
        //borderColor:'#08d4c4',
        //borderWidth:3
    },


    text_header: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,

    },
    action: {
        flexDirection: 'row',
        marginTop: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },

    button: {
        alignItems: 'center',
        borderRadius: 30,
        margin: 10,
        padding: 12

    },
    singIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontWeight: 'bold',
        fontSize: 18
    },
    actor: {
        width: 10,
        height: 10,
        marginLeft: 70,
        //alignItems:'center'
    }
});

export default Actor;*/

/* <View style={styles.container}>
    <Image
    source={require('./Shutterstock_Lisa_Kolbasa.png')}
    />
    </View> */