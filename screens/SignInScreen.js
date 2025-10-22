import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password must be filled');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('Home'))
      .catch(() => {
        Alert.alert('Login Failed', 'Incorrect email or password. Try sign up.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Unga image mathiri illustration, random image or SVG podunga */}
      <Text style={styles.headerText}>Login to Continue</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F9FAFD' },
  headerText: { fontSize: 18, textAlign: 'center', marginBottom: 25, color: '#333' },
  input: { backgroundColor: 'white', borderRadius: 14, marginBottom: 15, borderWidth: 1, borderColor: '#eee', padding: 15, fontSize: 16, elevation: 2 },
  loginButton: { backgroundColor: '#EAEAF6', borderRadius: 25, alignItems: 'center', padding: 13, marginTop: 5, marginBottom: 15 },
  loginButtonText: { fontSize: 17, color: '#444', fontWeight: 'bold' },
  signupContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  signupText: { color: '#BB86FC', fontWeight: 'bold' }
});
