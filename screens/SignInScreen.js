import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, OAuthProvider, updateProfile } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';

// Google Sign-In configure pannunga
GoogleSignin.configure({
  webClientId: '991364178247-o23ucbhmcijvuee3a2q29itmr7bcv49i.apps.googleusercontent.com', // Android
  iosClientId: '991364178247-i1qi1bed27nnjva2bj0f8sqekldnknm0.apps.googleusercontent.com', // iOS
});

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email/Password Login Function
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password must be filled');
      return;
    }
    console.log('Firebase Email sign-in successful');
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('Home'))
      .catch(() => {
        Alert.alert('Login Failed', 'Incorrect email or password. Try sign up.');
      });
  };

  // Google Sign-In Function
  const handleGoogleSignIn = async () => {
    try {
      // Google Play Services available aa check pannunga (Android ku mattum)
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      }
      
      // User sign in pannunga and ID token get pannunga
      const signInResult = await GoogleSignin.signIn();
      
      // ID token extract pannunga
      const idToken = signInResult.data?.idToken || signInResult.idToken;
      
      if (!idToken) {
        throw new Error('No ID token found');
      }
      
      console.log('Google Sign-In successful, ID token received');
      
      // Firebase credential create pannunga
      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      // Firebase ku sign in pannunga
      await signInWithCredential(auth, googleCredential);
      
      console.log('Firebase Google sign-in successful');
      
      // Success! Navigate to home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      
      // User cancelled pannanga
      if (error.code === 'ERR_CANCELED' || error.code === '-5' || error.code === '12501' || error.code === 'SIGN_IN_CANCELLED') {
        return;
      }
      
      Alert.alert('Google Sign-In Failed', error.message || 'Something went wrong. Please try again.');
    }
  };

  // Apple Sign-In Function (iOS only)
  const handleAppleSignIn = async () => {
    try {
      // Apple authentication request
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('Apple Sign-In successful');

      // Identity token check pannunga
      if (!credential.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      // Firebase credential create pannunga
      const provider = new OAuthProvider('apple.com');
      const appleCredential = provider.credential({
        idToken: credential.identityToken,
        rawNonce: credential.authorizationCode,
      });

      // Firebase ku sign in pannunga
      const userCredential = await signInWithCredential(auth, appleCredential);
      
      // Optional: User details update pannunga if first time
      if (credential.fullName?.givenName) {
        await updateProfile(userCredential.user, {
          displayName: `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`.trim()
        });
      }

      console.log('Firebase sign-in successful with Apple');

      // Success! Navigate to home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      
      // User cancelled pannanga
      if (error.code === 'ERR_REQUEST_CANCELED' || error.code === 'ERR_CANCELED' || error.code === 'ERR_REQUEST_UNKNOWN') {
        // User cancelled or something went wrong - just return
        return;
      }
      
      Alert.alert('Apple Sign-In Failed', error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.gradientBackground}>
        {/* Top Image */}
        <Image 
          source={require('../assets/loginImage.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
        
        {/* Header Text */}
        <Text style={styles.headerText}>Login to Continue</Text>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="email-outline" size={24} color="#b9aafaff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#b9aafaff"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#b9aafaff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#b9aafaff"
          />
        </View>

        {/* Email/Password Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <MaterialCommunityIcons name="google" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Apple Sign-In Button - iOS la mattum kaattunga */}
        {Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
            <MaterialCommunityIcons name="apple" size={24} color="#fff" style={styles.socialIcon} />
            <Text style={styles.appleButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
        )}

        {/* Sign Up Link */}
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
  scrollViewContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    backgroundColor: '#f1eafeff' 
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fbf9feff',
    borderRadius: 30,
  },
  topImage: { 
    width: 250, 
    height: 200, 
    alignSelf: 'center', 
    marginBottom: 32 
  },
  headerText: { 
    fontSize: 17, 
    textAlign: 'center', 
    marginBottom: 38, 
    color: '#a360f5ff', 
    fontWeight: '500' 
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#ede4fc', 
    borderRadius: 18, 
    marginBottom: 16, 
    shadowOpacity: 0.15, 
    shadowColor: '#c19ceeff', 
    shadowRadius: 5,
    maxWidth: 400, 
    height: 50
  },
  icon: { 
    marginLeft: 12, 
    marginRight: 6 
  },
  input: { 
    flex: 1, 
    backgroundColor: 'transparent', 
    padding: 5, 
    fontSize: 14, 
    borderRadius: 18 
  },
  loginButton: { 
    backgroundColor: '#b580f6ff', 
    borderRadius: 30, 
    alignItems: 'center', 
    padding: 15, 
    marginTop: 10, 
    marginBottom: 20, 
    shadowColor: '#7e31f6', 
    shadowOpacity: 0.2, 
    shadowRadius: 10,
  },
  loginButtonText: { 
    fontSize: 18, 
    color: '#fff', 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d0d0d0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },

  googleButton: { 
    backgroundColor: '#4285F4', 
    borderRadius: 25, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 13, 
    marginBottom: 12,
    shadowColor: '#4285F4',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  googleButtonText: { 
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  
  appleButton: { 
    backgroundColor: '#000', 
    borderRadius: 25, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 13, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  appleButtonText: { 
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  
  socialIcon: { 
    marginRight: 8 
  },

  signupContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 100 
  },
  signupQuestion: { 
    color: '#777', 
    fontSize: 15 
  },
  signupText: { 
    color: '#9447f2', 
    fontWeight: 'bold', 
    fontSize: 14 
  }
});
