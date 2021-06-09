import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SurportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}> Surport Screen</Text>
      <Text style={{ alignContent: 'center', marginLeft: 5, marginRight: 5, marginBottom: 10, left: 10 }}>
        This is our software group project in L2 . We would be obliged if you could considered
          this software softly and give your maximum encourrangements to develop further, </Text>
      <Text>
        contact us: udari@gmail.com</Text>
      <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 10 }} >   About us : </Text>
      <Text style={{ marginLeft: 5, marginRight: 5 }} >
        Team Code Freaks :
                    Udari,   </Text>
      <Text>  Nishan,</Text>
      <Text>  Sagara,</Text>
      <Text>  Supun,</Text>
      <Text>       Students of the IT faculty of
                    University of Moratuwa.</Text>

      <Button
        title="Click Here"
        onPress={() => alert('Button Clicked!')}
      />
    </View>
  );
};

export default SurportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});