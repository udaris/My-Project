import React from 'react';
import {StatusBar,
    StyleSheet, View
} from 'react-native';
import Firebase from '../Firebase/firebaseConfig';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import Messages from './Messages';
import { useTheme } from '@react-navigation/native';

 
  
const StructureScreen = ({ navigation }) => {

        const { colors } = useTheme();
        const theme = useTheme();

    

        return (
            <ScrollView>
                <SafeAreaView>
                <StatusBar backgroundColor="#009387" barStyle={theme.dark ? "light-content" : "dark-content"} />
                    <View style={styles.container}>
                        <Messages />
                    </View>


                </SafeAreaView>
            </ScrollView>
        );
    }
export default StructureScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        backgroundColor: 'lightblue',
        height: 4,
        flex: 1,
        alignSelf: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: 'black',
        paddingHorizontal: 5
    },
    adddlist: {
        borderWidth: 4,
        borderColor: 'lightblue',
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
