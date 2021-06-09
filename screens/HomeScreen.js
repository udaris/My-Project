import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import Firebase from '../Firebase/firebaseConfig';
import AddTourlementsPictures from './AddTourlementsPictures';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewsetPost from './NewsetPost';

const HomeScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    addTodoVisible: false,
    userid: '',

  });

  const { colors } = useTheme();
  const theme = useTheme();

  const toggleAddToTourlementPictures = () => {
    setData({ addTodoVisible: !data.addTodoVisible });
  }

  const [users2, setUsers2] = React.useState({
    userTitle: '',
    userDetails: '',
    Title2: '',
    Details2: '',
    imageUrl2: '',
    allUsers2: [],
  });


  React.useEffect(() => {

    Firebase.database().ref('usersGallery/ closed /')
      .on("value", async (datasnapshot) => {

        new Promise((resolve, reject) => {

          const uuid = Firebase.auth().currentUser.uid;

          let usersall2 = [];

          datasnapshot.forEach((child) => {

            usersall2.push({
              Title2: child.val().title,
              Details2: child.val().details,
              imageUrl2: child.val().image
            });

          });
          setUsers2({ allUsers2: usersall2 });
        });

      });



  }, []);

  const deletePost = () => {

    const uuid = Firebase.auth().currentUser.uid;
    Firebase.database()
      .ref('usersGallery/ closed /' + uuid)
      .remove()
      .then(() => {
        alert("Your post was deleted! others post you cant deleted.");

      }).catch(err => {
        console.log(err);

      })

  };


  return (

    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle={theme.dark ? "light-content" : "dark-content"} />

          <View style={{ alignItems: "center", fontSize: 40 }}>
            <Text style={[{ color: colors.text }, {  fontFamily:'Lemon-Regular', marginTop: 10 }]} >Home  </Text><Text></Text></View>

          <View style={styles.sliderContainer} >
            <Swiper height={200} autoplay >

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/dickwella_niroshan.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/netball2.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/runs.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/netball.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/batminton.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/SchoolSports.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

              <View style={styles.slide} >
                <Image source={require('../assets/sportsHome/vallyball.jpg')}
                  resizeMode="cover" style={styles.sliderImage} />
              </View>

            </Swiper>
          </View>

          <Modal animationType='slide'
            visible={data.addTodoVisible}
            onRequestClose={() => toggleAddToTourlementPictures()} >
            <AddTourlementsPictures closeModal={() => toggleAddToTourlementPictures()} />
          </Modal>

          <View style={{ alignContent: 'center', marginTop: 15, alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity style={{ width: '92%', }} onPress={() => toggleAddToTourlementPictures()}>
              <LinearGradient colors={['darkslategrey', 'darkcyan']} style={styles.signIn}  >
                <Text style={{ fontFamily:'Lemon-Regular', fontSize: 12, color: theme.dark ?'white' :'black' }}> Add details and Pictures in toorlements </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>


          <SafeAreaView>
            <NewsetPost />
          </SafeAreaView>


          <View style={styles.cardsWrapper}>
            <Text
              style={{ alignSelf: 'center',fontSize: 15,
               fontFamily:'Lemon-Regular',
               color: theme.dark ?'white' :'black'}}>
              Recently Ended Toorlements Details
        </Text>

            <FlatList
              alwaysBounceVertical={false}
              data={users2.allUsers2}
              style={{ padding: 20 }}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.cardImgWrapper}>
                    <Image

                      source={{
                        uri: item.imageUrl2 === '' ? 'https://api.adorable.io/avatars/80/abott@adorable.png'
                          : item.imageUrl2
                      }}
                      resizeMode="cover" style={styles.cardImg} />

                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.Title2} </Text>
                    <Text style={styles.cardDetails}>{item.Details2}</Text>
                    <TouchableOpacity onPress={() => deletePost()} >
                      <Icon name="delete" color="#777777" size={15} />
                    </TouchableOpacity>
                  </View>
                </View>
              )} />


          </View>
          <View style={{ height: 200 }}></View>
        </View>

      </SafeAreaView>
    </ScrollView>

  );
}

export default HomeScreen;

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

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
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
    backgroundColor: '#fdeae7',
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