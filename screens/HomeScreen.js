import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    auth.signOut().then(() => navigation.navigate('SignIn'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome, {auth.currentUser?.displayName || 'User'}!
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 24, marginBottom: 30 }
});
