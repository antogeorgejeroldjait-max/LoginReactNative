import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Expo icon
import { MaterialCommunityIcons } from '@expo/vector-icons';



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
    <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.gradientBackground}>
        <Image 
          source={require('../assets/loginImage.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Login to Continue</Text>

        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#9974f2" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#977fff"
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
            placeholderTextColor="#977fff"
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupQuestion}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: { flexGrow: 1, justifyContent: 'center', backgroundColor: '#fff' },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f3fe', // pale gradient effect
    borderRadius: 30,
    shadowColor: '#b684fc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
    margin: 12
  },
  topImage: { width: 200, height: 140, alignSelf: 'center', marginBottom: 32 },
  headerText: { fontSize: 22, textAlign: 'center', marginBottom: 38, color: '#9447f2', fontWeight: '500' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ede4fc', borderRadius: 18, marginBottom: 16, shadowOpacity: 0.15, shadowColor: '#9447f2', shadowRadius: 5 },
  icon: { marginLeft: 12, marginRight: 6 },
  input: { flex: 1, backgroundColor: 'transparent', padding: 16, fontSize: 16, borderRadius: 18 },
  loginButton: { backgroundColor: '#9447f2', borderRadius: 30, alignItems: 'center', padding: 15, marginTop: 10, marginBottom: 22, shadowColor: '#7e31f6', shadowOpacity: 0.2, shadowRadius: 10 },
  loginButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold', letterSpacing: 1 },
  signupContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  signupQuestion: { color: '#777', fontSize: 15 },
  signupText: { color: '#9447f2', fontWeight: 'bold', fontSize: 16 }
});
