import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.container}> Settings Screen</Text><Text></Text>
      <Button title="Go to Home  "
        onPress={() => navigation.navigate("Home")} />


    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    fontSize: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 8,
    margin: 10,
    width: 100,
  },
})