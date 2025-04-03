import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Signup Failed", "All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Signup Failed", "Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("https://backend-y4fw.onrender.com/api/auth/signup", {
        Email: email,
        Password: password,
      });
      if (response.status === 200) {
        Alert.alert("Signup Successful", "Please log in.");
        navigation.navigate('Login');
      } else {
        Alert.alert("Signup Failed", "An unexpected error occurred");
      }
    } catch (error) {
      Alert.alert("Signup Failed", error.response?.data?.error || "Email is already in use");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/splash.png')}
          style={styles.imageBackground}
        >
          <View style={styles.overlay} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>SIGN-UP</Text>
            
            <Text style={styles.label}>Email:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#B3B3B3"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <Text style={styles.label1}>Password:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#B3B3B3"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#B3B3B3" 
                />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.label1}>Re-enter Password:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor="#B3B3B3"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#B3B3B3" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
               style={styles.button}
               onPress={handleSignup}
              >
              <Text style={styles.buttonText}>SIGN-UP</Text>
            </TouchableOpacity>
            
            <View style={styles.loginLink}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginTextBold}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)', 
  },
  formContainer: {
    padding: 30,
    borderRadius: 10,
    width: 310,
    height: 560,
    backgroundColor: 'rgba(0, 3, 0, 0.34)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: 60,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 5,
    fontSize: 15,
    marginTop: '-11',
  },
  label1: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 5,
    fontSize: 15,
    marginTop: '11',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 43,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#202020',
    fontSize: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 7,
  },
  button: {
    backgroundColor: '#1A5651', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    position: 'absolute',
    bottom: 70,
    width: 150,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    position: 'absolute',
    bottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  loginTextBold: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;