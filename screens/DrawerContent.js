import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Avatar, Title, Caption,
    Paragraph,
    Drawer, Text,
    TouchableRipple, useTheme,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../Firebase/firebaseConfig';

import { AuthContext } from '../components/context';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const [usertype, setUserType] = React.useState({
        userName: 'user',
        userEmail: '',
        userimage: ''
    });

    React.useEffect(() => {
        Firebase.database().ref('users')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;
                    console.log('uuid', uuid);

                    datasnapshot.forEach((child) => {
                        if (child.val().uuid === uuid) {
                            setUserType({
                                userName: child.val().name,
                                userEmail: child.val().email,
                                userimage: child.val().image
                            });

                        }
                    });
                });

            });

    }, []);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}  >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            {/*<Avatar.Image source={require('../assets/logo.jpg')}
                        source=  {{url:'../assets/logo.jpg'}}  size={50}/>*/}
                            <Avatar.Image
                                source={{ uri: usertype.userimage === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png' : usertype.userimage }}
                                size={50} />
                            <View style={{ flexDirection: 'column', marginTop: 15 }}>
                                <Title style={styles.title}> {usertype.userName} </Title>
                                <Caption style={styles.caption}> {usertype.userEmail}</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}><Paragraph style={[styles.paragraph, styles.caption]}> My </Paragraph>
                                <Caption style={styles.caption}>Sprts</Caption></View>
                        </View>
                    </View>
                    <Drawer.Section>
                        <DrawerItem icon={({ color, size }) => (<Icon name="home-outline" color={color} size={size} />)}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }} />
                        <DrawerItem icon={({ color, size }) => (<Icon name="account-outline" color={color} size={size} />)}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }} />

                        <DrawerItem icon={({ color, size }) => (<Icon name="bookmark-outline"
                            color={color} size={size} />)}
                            label="Bookmarks" onPress={() => { props.navigation.navigate('BookmarkScreen') }} />

                        <DrawerItem icon={({ color, size }) => (<Icon name="account-check-outline" color={color} size={size} />)}
                            label="Surport"
                            onPress={() => { props.navigation.navigate('SurportScreen') }} />

                        <DrawerItem icon={({ color, size }) => (<Icon name="select" color={color} size={size} />)}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('SettingsScreen') }} />

                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>

                </View>

            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomdrawersection}>
                <DrawerItem icon={({ color, size }) => (<Icon name="exit-to-app" color={color} size={size} />)}
                    label="Sign Out" onPress={() => { signOut() }} />
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 3
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawersecton: {
        marginTop: 15,
    },
    bottomdrawersection: {
        marginBottom: 15,
        borderTopColor: 'green',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },



});



