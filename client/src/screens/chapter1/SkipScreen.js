import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Platform, Image } from 'react-native';

const SkipScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    setDialogueStep(dialogueStep + 1); // Move to next step
  };

  const handleNextDialogue = () => {
    // Navigate to SetupScreen for specific conditions
    if ((dialogueStep === 5 && selectedChoice === 'never') || 
        (dialogueStep === 5 && selectedChoice === 'know') || 
        (dialogueStep === 4 && selectedChoice === 'seen')) {
      navigation.navigate('Setup'); // Correct screen name
      return;
    }
    
    setDialogueStep(dialogueStep + 1);
  };

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC']
  });

  const getCharacterImageBrightness = () => {
    if (dialogueStep === 2) {
      return 1; // User choice appears
    }
    return 2; // Scribeon text appears
  };

  const renderDialogue = () => {
    const dialogues = [
      { step: 0, text: 'Ah... this one. It seems you have stumbled upon something rare.' },
      { step: 1, text: 'This is Baybayin - the ancient writing system of the Philippines. Have you heard it before?' },
      { step: 3, choice: 'never', text: 'No? That\'s not surprising. It has been forgotten by many.' },
      { step: 4, choice: 'never', text: 'But perhaps, with your help, it can shine and be known again...' },
      { step: 5, choice: 'never', text: 'Before we proceed, I need you to answer these questions first...' },
      { step: 3, choice: 'know', text: 'Ah, you\'re familiar with Baybayin! That\'s wonderful. Then you may know just how precious and unique it is.' },
      { step: 4, choice: 'know', text: 'With your knowledge, we can help bring it back to the forefront.' },
      { step: 5, choice: 'know', text: 'Before we proceed, I need you to answer these questions first...' },
      { step: 3, choice: 'seen', text: 'Then you\'re in the perfect place. Let us uncover its forgotten stories, and perhaps, you\'ll find a piece of yourself in its symbols.' },
      { step: 4, choice: 'seen', text: 'Before we proceed, I need you to answer these questions first...' },
    ];

    const currentDialogue = dialogues.find(d => d.step === dialogueStep && (!d.choice || d.choice === selectedChoice));
    if (currentDialogue) {
      return (
        <TouchableOpacity onPress={handleNextDialogue}>
          <View style={styles.dialogueTextContainer}>
            <View style={styles.characterNameContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
            </View>
            <View style={styles.dialogueTextWrapper}>
              <Text style={styles.dialogueText}>{currentDialogue.text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderChoices = () => {
    if (dialogueStep === 2) {
      return (
        <View style={styles.choicesContainer}>
          <TouchableOpacity onPress={() => handleChoiceSelection('never')}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"No, I've never heard of it."</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChoiceSelection('know')}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"Yes, I know Baybayin."</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChoiceSelection('seen')}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"I've seen it, but I don't know much."</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <ImageBackground source={require('../../assets/back.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>
          <View style={styles.characterImageContainer}>
            <Image
              source={require('../../assets/characters/Scribeon.png')}
              style={[styles.characterImage, { filter: `brightness(${getCharacterImageBrightness()})` }]}
            />
          </View>
          {renderChoices()}
          {renderDialogue()}
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay with 30% opacity
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  dialogueContainer: {
    backgroundColor: 'rgba(252, 250, 250, 0.11)', // More transparent background
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    width: '90%',
    height: 220, // Fixed height
    marginBottom: Platform.OS === 'ios' ? 20 : -25,
    backdropFilter: 'blur(10px)', // Add blur effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Optional: Add a border for better visibility
    alignItems: 'flex-start', // Ensure container aligns items to the left
  },
  dialogueTextContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'flex-start', // Ensure text container aligns items to the left
    paddingTop: 40,
  },
  dialogueTextWrapper: {
    width: '100%',
    alignItems: 'flex-start', // Ensure text wrapper aligns items to the left
  },
  dialogueText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap', // Ensure text wraps properly
    marginTop: 10, // Adjust as needed
    alignSelf: 'flex-start', // Ensure text stays aligned to the left
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'left', // Align text to the left
    alignSelf: 'flex-start', // Ensure text stays aligned to the left
  },
  characterNameContainer: {
    width: '100%', // Ensure it takes full width
    alignItems: 'flex-start', // Ensure character name aligns to the left
  },
  choicesContainer: {
    marginTop: 70, 
    alignItems: 'center', 
    width: '100%',
  },
  choiceButton: {
    padding: 8,
    marginVertical: 5,
    borderRadius: 20,
    width: 270, 
    alignItems: 'center', 
  },
  choiceText: {
    color: '#d9d9d9',
    fontSize: 14,
    textAlign: 'center', 
  },
  characterImage: {
    width: 300, // Ensure the image takes full width of the container
    height: 300, // Ensure the image takes full height of the container
    resizeMode: 'contain',
    filter: 'brightness(1.5)', // Adjusted brightness
  },
  characterImageContainer: {
    position: 'absolute', // Position the image absolutely
    left: -70, // Align to the left
    bottom: 200, // Align to the top
    width: 100, // Adjust width as needed
    height: '100%', // Take full height of the container
    justifyContent: 'center', // Center the image vertically
    zIndex: 0, // Ensure character image is below the dialogue box but above the background
  },
});

export default SkipScreen;