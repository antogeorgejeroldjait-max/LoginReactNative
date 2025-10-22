import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from './firebaseConfig';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome, {auth.currentUser?.displayName || 'User'}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 24 }
});
