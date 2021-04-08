import React from 'react';
import { StyleSheet, Text, View, Button, Image, StatusBar, ScrollView,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import TourlementForm1 from './TourlementForm1';

  const HomeScreen =({navigation})=>{

  const { colors } = useTheme();
  const theme = useTheme();


  return (
   
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle={theme.dark ? "light-content" : "dark-content"} />

        <View style={{ alignItems: "center", fontSize: 40 }}>
          <Text style={{ color: colors.text }} >Home Screen </Text><Text></Text></View>

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
        <Text style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 1,
        }}  ></Text>

         <TouchableOpacity >
          <Button title="Go to details about toorlement "
          onPress={() => navigation.navigate('Sign IN')} />
          </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/sportsHome/t1.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>2021 Big Match</Text>
            <Text style={styles.cardDetails}>
              Big match toorlement details .
  </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/sportsHome/cricket.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>2021 cricket tourlement organized by  sport club </Text>
            <Text style={styles.cardDetails}>
              Today toorlement winners.
  </Text>
          </View>
        </View>

        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
            }}>
            Recently Closed Toorlements Details
        </Text>

          <View style={styles.card}>

            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../assets/sportsHome/netball.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />

            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>He won his father's dream.</Text>
              <Text style={styles.cardDetails}>
                Pathum won for this amazing place
            </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../assets/sportsHome/Sanga.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Kumara Sangakkara.</Text>
              <Text style={styles.cardDetails}>
                Today toorlement winners.
  </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../assets/sportsHome/champions.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Chamopions in the toorlement.</Text>
              <Text style={styles.cardDetails}>
                Today toorlement winners.
  </Text>
            </View>
          </View>

        </View>
      </View>
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

  wrapper: {},

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