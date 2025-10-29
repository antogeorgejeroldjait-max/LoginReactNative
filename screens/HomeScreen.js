import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      // Google Sign-In logout
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      
      // Firebase logout
      await auth.signOut();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const user = auth.currentUser;
  const userName = user?.displayName || user?.email || 'User';
  const userPhoto = user?.photoURL;

  return (
    <View style={styles.container}>
      {userPhoto && (
        <Image 
          source={{ uri: userPhoto }} 
          style={styles.profileImage} 
        />
      )}
      <Text style={styles.welcome}>Welcome, {userName}!</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
  email: { fontSize: 16, marginBottom: 30, color: '#666' },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 20 
  }
});
