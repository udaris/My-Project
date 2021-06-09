import React from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.container}>Details Screen</Text><Text></Text>
      <Button title="Go to home " onPress={() => navigation.navigate("Home")} /><Text></Text>
      <Button title="Go to details screen again " onPress={() => navigation.push("Details")} /><Text></Text>
      <Button title="Go Back " onPress={() => navigation.goBack()} />

    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
  }
})


