import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import HandleUserIgn from '../../components/handleUserIgn';
// Fix the incorrect path
import HandleUserAvatar from '../../components/handleUserAvatar';
import HandleUserSkillLevel from '../../components/handleUserSkillLevel';

const SetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [selectedAvatarKey, setSelectedAvatarKey] = useState('1'); // Set the first avatar as the default selection
  const [, setSkillLevel] = useState('');

  // Avatar images dictionary
  const avatars = {
    '1': require('../../assets/avatars/1.jpg'),
    '2': require('../../assets/avatars/2.jpg'),
    '3': require('../../assets/avatars/3.jpg'),
    '4': require('../../assets/avatars/4.jpg'),
    '5': require('../../assets/avatars/5.jpg'),
    '6': require('../../assets/avatars/6.png'),
  };

  const handleNext = (userName) => {
    if (step === 1) {
      if (userName.trim() !== '') {
        setName(userName);
        setStep(2); // Move to avatar selection step
      } else {
        alert('Please enter your name');
      }
    } else if (step === 2 && selectedAvatarKey !== null) {
      setStep(3); // Move to skill level selection step
    }
  };

  const handleAvatarSelection = (avatarKey) => {
    setSelectedAvatarKey(avatarKey);
    setStep(3); // Move to skill level selection step
  };

  const handleSkillSelection = (level) => {
    setSkillLevel(level);
    navigation.navigate('AfterSetupScreen', { userName: name, avatarKey: selectedAvatarKey, skillLevel: level });
  };

  return (
    <ImageBackground source={require('../../assets/back.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {step === 1 ? (
          <HandleUserIgn onNext={handleNext} />
        ) : step === 2 ? (
          <HandleUserAvatar avatars={avatars} selectedAvatarKey={selectedAvatarKey} onNext={handleAvatarSelection} />
        ) : (
          <HandleUserSkillLevel onNext={handleSkillSelection} />
        )}
      </SafeAreaView>
    </ImageBackground>
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
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    width: 310,
    height: 400,
    backgroundColor: 'rgba(41, 41, 41, 0.2)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 150,
    marginBottom: 20,
  },
  questionText1: {
    color: '#fff',
    fontSize: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  questionText2: {
    color: '#fff',
    fontSize: 15,
    marginTop: 85,
    marginBottom: 20,
  },
  input: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(43, 4, 4, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  avatarContainer: {
    backgroundColor: 'rgba(79, 79, 79, 0.34)',
    padding: 20,
    borderRadius: 15,
    width: '78%',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 0.3,
  },
  avatarGrid: {
    alignItems: 'center',
    marginBottom: 20,
  },
  smallAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  skillButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SetupScreen;