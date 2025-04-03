import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';

const VerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const imageUri = Image.resolveAssetSource(require('../../assets/splash.png')).uri;
    Image.prefetch(imageUri)
      .then(() => setIsImageLoaded(true))
      .catch(() => setIsImageLoaded(false));
  }, []);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto-focus to next input
    if (text && index < 5) {
      codeRefs[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Add your verification logic here
    // If verification is successful, navigate to MenuScreen
    navigation.navigate('Menu');
  };

  const codeRefs = [];

  return (
    isImageLoaded ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../../assets/splash.png')} style={styles.background}>
          <View style={styles.overlay} />
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Verify account</Text>
              
              <Text style={styles.subtitle}>
                Please enter the verification code we{'\n'} sent to you at example@email.com
              </Text>
              
              <Text style={styles.timerText}>Code expires in 5 minutes</Text>
              
              <Text style={styles.label}>Enter your 6 digit code</Text>
              <View style={styles.codeContainer}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => codeRefs[index] = ref}
                    style={styles.codeInput}
                    value={code[index]}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    maxLength={1}
                    keyboardType="number-pad"
                    textAlign="center"
                    selectionColor="white"
                  />
                ))}
              </View>
              
              <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>VERIFY</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resendLink}>
                <Text style={styles.resendText}>Didn't get your code? Resend Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    ) : (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: 310,
    height: 500,
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 0.3,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 3, 0, 0.34)', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 100,
    fontWeight: 'bold',
    top: 60,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 18,
    fontSize: 14,
    marginTop: '11',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  timerText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 25,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  codeInput: {
    width: 34,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    color: '#202020',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: '55%',
    height: 43,
    backgroundColor: '#382318',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resendLink: {
    bottom: -10,
    paddingVertical: 5,
  },
  resendText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
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

export default VerificationScreen;