import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      // Firebase logout first
      await auth.signOut();
      console.log('Logout successful');
      // Google Sign-In logout - try-catch la wrap pannunga
      // Inga isSignedIn check panna venam, directly signOut call pannalam
      try {
        await GoogleSignin.signOut();
      } catch (googleError) {
        // Google Sign-In la login pannama irundha error varum, ignore pannalam
        console.log('Google sign out skipped (not signed in with Google)');
      }
      
      // Navigate to SignIn screen
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Something went wrong. Please try again.');
    }
  };

  const user = auth.currentUser;
  const userName = user?.displayName || user?.email || 'User';
  const userPhoto = user?.photoURL;

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      {userPhoto && (
        <Image 
          source={{ uri: userPhoto }} 
          style={styles.profileImage} 
        />
      )}
      
      {/* Welcome Text */}
      <Text style={styles.welcome}>Welcome, {userName}!</Text>
      
      {/* Email */}
      <Text style={styles.email}>{user?.email}</Text>
      
      {/* Logout Button - Custom styled */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#b580f6ff',
  },
  welcome: { 
    fontSize: 26, 
    marginBottom: 10, 
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  email: { 
    fontSize: 16, 
    marginBottom: 40, 
    color: '#666',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    shadowColor: '#ff4757',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
