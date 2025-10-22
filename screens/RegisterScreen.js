import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
          <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">

    <View style={styles.container}>

      <Image
      source={require('../assets/loginImage.png')} // asset image use pannalam
      // alternatively online image: source={{ uri: 'https://yoururl.com/image.png' }}
      style={styles.topImage}
      resizeMode="contain"
      />
      <Text style={styles.headerText}>Register to Continue</Text>

        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="account-outline" size={24} color="#9974f2" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={password}
            onChangeText={setUsername}
            secureTextEntry
            placeholderTextColor="#b9aafaff"
          />
        </View>


             <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#9974f2" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={password}
            onChangeText={setEmail}
            secureTextEntry
            placeholderTextColor="#b9aafaff"
          />
        </View>


        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#9974f2" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#b9aafaff"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="lock-check-outline" size={24} color="#9974f2" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={password}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#b9aafaff"
          />
        </View>


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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fbf9feff' },
  topImage: { width: 180, height: 140, alignSelf: 'center', marginBottom: 15 },
  headerText: { fontSize: 18, textAlign: 'center', marginBottom: 25, color: '#9447f2' },
  icon: { marginLeft: 12, marginRight: 6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ede4fc', borderRadius: 15, marginBottom: 16, shadowOpacity: 0.15, shadowColor: '#c19ceeff', shadowRadius: 5,maxWidth: 400, height: 50 },
  input: { flex: 1, backgroundColor: 'transparent', padding: 5, fontSize: 14, borderRadius: 18 },
  registerButton: { backgroundColor: '#b47ff5ff', borderRadius: 25, alignItems: 'center', padding: 13, marginTop: 5, marginBottom: 15 },
  registerButtonText: { fontSize: 17, color: '#f2ececff', fontWeight: 'bold' },
  loginContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom: 150 },
  loginText: { color: '#903bf7ff', fontWeight: 'bold' }
});
