import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Firebase from '../Firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsetPost = () => {


    const { colors } = useTheme();
    const theme = useTheme();

    const [users, setUsers] = React.useState({
        userTitle: '',
        userDetails: '',
        imageUrl: '',
        allUsers: [],
        Title: '',
        Details: '',
      
    });

    React.useEffect(() => {
        Firebase.database().ref('usersGallery/ newest /')
            .on("value", async (datasnapshot) => {

                new Promise((resolve, reject) => {

                    const uuid = Firebase.auth().currentUser.uid;

                    let usersall = [];

                    datasnapshot.forEach((child) => {

                        usersall.push({
                            userTitle: child.val().title,
                            userDetails: child.val().details,
                            imageUrl: child.val().image
                        });

                    });
                    setUsers({ allUsers: usersall });
                });

            });

    }, []);

    const deletePost = () => {

        const uuid = Firebase.auth().currentUser.uid;
        Firebase.database()
          .ref('usersGallery/ newest /' + uuid)
          .remove()
          .then(() => {
            alert("Your post was deleted, others post you cant deleted !");
          }).catch(err => {
            console.log(err);
          })
     
      };

    return (

        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#009387" barStyle={theme.dark ? "light-content" : "dark-content"} />

                    <SafeAreaView>

                        <Text style={{
                            marginTop: 10, alignSelf: 'center', fontSize: 16,
                            fontFamily:'Lemon-Regular',
                            color: theme.dark ?'white' :'indigo'  }}>
                            Next Coming up Toorlements Details
                         </Text>

                        <FlatList
                            alwaysBounceVertical={false}
                            data={users.allUsers}
                            style={{ padding: 20 }}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <View style={styles.cardImgWrapper}>
                                        <Image
                                            source={{
                                                uri: item.imageUrl === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png'
                                                    : item.imageUrl
                                            }}
                                            resizeMode="cover" style={styles.cardImg} />

                                    </View>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.cardTitle}>{item.userTitle} </Text>
                                        <Text style={styles.cardDetails}> {item.userDetails}</Text>
                                        <TouchableOpacity onPress={() => deletePost()} >
                      <Icon name="delete" color="#777777" size={15} />
                    </TouchableOpacity>
                                    </View>
                                </View>
                            )} />
                            
                    </SafeAreaView>


                    <View style={{ height: 10 }}></View>
                </View>

            </SafeAreaView>
        </ScrollView>

    );
}

export default NewsetPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },

    wrapper: {},
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
});