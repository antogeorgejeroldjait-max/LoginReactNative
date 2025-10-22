import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => updateProfile(userCredential.user, { displayName: username }))
      .then(() => navigation.navigate('Home'))
      .catch(error => Alert.alert('Registration Failed', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register to Continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F9FAFD' },
  headerText: { fontSize: 18, textAlign: 'center', marginBottom: 25, color: '#333' },
  input: { backgroundColor: 'white', borderRadius: 14, marginBottom: 15, borderWidth: 1, borderColor: '#eee', padding: 15, fontSize: 16, elevation: 2 },
  registerButton: { backgroundColor: '#EAEAF6', borderRadius: 25, alignItems: 'center', padding: 13, marginTop: 5, marginBottom: 15 },
  registerButtonText: { fontSize: 17, color: '#444', fontWeight: 'bold' },
  loginContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  loginText: { color: '#BB86FC', fontWeight: 'bold' }
});
