import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Keyboard, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('mahebres@gbox.ncf.edu.ph');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456789');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const imageUri = Image.resolveAssetSource(require('../../assets/splash.png')).uri;
    Image.prefetch(imageUri)
      .then(() => setIsImageLoaded(true))
      .catch(() => setIsImageLoaded(false));
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Failed", "Email and password are required");
      return;
    }
    try {
      const response = await axios.post("https://backend-y4fw.onrender.com/api/auth/login", {
        Email: email,
        Password: password,
      });
      console.log('Login response:', response.data);
      if (response.status === 200) {
        const { token, User_ID, Ingame_name } = response.data;
        await AsyncStorage.setItem('userData', JSON.stringify({ token, User_ID, Ingame_name }));
        console.log('User data stored successfully:', { token, User_ID, Ingame_name });
        if (!Ingame_name) {
          navigation.replace("Intro"); 
        } else {
          navigation.replace("Menu");  
        }
      } else {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.error || "An unexpected error occurred");
    }
  };

  return (
    isImageLoaded ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground source={require('../../assets/splash.png')} style={styles.imageBackground}>
            <View style={styles.overlay} />
            <View style={styles.formContainer}>
              <Text style={styles.title}>LOGIN</Text>
              
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
              
              <View style={styles.forgotContainer}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </View>
              
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Menu')}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity> */}
               <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
              
              <View style={styles.signupLink}>
                <Text style={styles.signupText}>Create account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupTextBold}>Sign-up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
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
    height: 480,
    backgroundColor: 'rgba(0, 3, 0, 0.34)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
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
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -2,
    marginBottom: 18,
  },
  forgotText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
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
  signupLink: {
    position: 'absolute',
    bottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  signupTextBold: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoginScreen;