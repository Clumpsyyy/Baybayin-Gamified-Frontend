import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Platform, Image } from 'react-native';

const Chapter1DetailsScreen = ({ navigation }) => {
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
    setDialogueStep(4); // Move to next step
  };

  const handleNextDialogue = () => {
    if (dialogueStep === 9 && ['archives', 'why', 'who'].includes(selectedChoice)) {
      navigation.navigate('ClickableBooks');
      return;
    }
    setDialogueStep(dialogueStep + 1);
  };

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC']
  });

  const getCharacterImageBrightness = () => {
    if (dialogueStep === 0 || dialogueStep === 3) {
      return 1; // User choice appears
    }
    return 2; // Scribeon text appears
  };

  const renderDialogue = () => {
    const dialogues = [
      { step: 1, text: 'Welcome, Traveler, to the Archives of the Written World. I am Scribeon, or you may call me Scrib.' },
      { step: 2, text: 'These halls contain the voices of countless generations, whispering their stories across time.' },
      { step: 4, choice: 'archives', text: 'This archive is the heart of all written knowledge, a living repository of words, stories, and wisdom from countless civilizations.' },
      { step: 4, choice: 'why', text: 'You were chosen by the words themselves. Few are called, and even fewer arrive.' },
      { step: 4, choice: 'who', text: 'You were chosen by the words themselves. Few are called, and even fewer arrive.' },
      { step: 5, choice: 'archives', text: 'Every language, every inscription, every thought ever recorded finds refuge here.' },
      { step: 5, choice: 'why', text: 'Perhaps there is a tale within you that must be written, or a secret within these walls meant only for you to uncover.' },
      { step: 5, choice: 'who', text: 'Perhaps there is a tale within you that must be written, or a secret within these walls meant only for you to uncover.' },
      { step: 6, choice: 'archives', text: 'Can I read these writings? Who created this place?' },
      { step: 6, choice: 'why', text: 'The Archives do not bring visitors without reason.' },
      { step: 6, choice: 'who', text: 'What really is this place? Can I read these writings?' },
      { step: 7, choice: 'why', text: 'A tale within me? What do you mean? How do I leave?' },
      { step: 7, choice: 'archives', text: 'Enough talk, Traveler. The words call to you. Look around, let the whispers of history guide your steps.' },
      { step: 8, choice: 'why', text: 'Enough talk, Traveler. The words call to you. Look around, let the whispers of history guide your steps.' },
      { step: 7, choice: 'who', text: 'Enough talk, Traveler. The words call to you. Look around, let the whispers of history guide your steps.' },
      { step: 8, choice: 'archives', text: 'There is much to uncover, and only you can decide where your journey begins.' },
      { step: 9, choice: 'why', text: 'There is much to uncover, and only you can decide where your journey begins.' },
      { step: 8, choice: 'who', text: 'There is much to uncover, and only you can decide where your journey begins.' },
      { step: 9, choice: 'archives', text: 'Feel free to look around...' },
      { step: 10, choice: 'why', text: 'Feel free to look around...' },
      { step: 9, choice: 'who', text: 'Feel free to look around...' },
    ];

    const currentDialogue = dialogues.find(d => d.step === dialogueStep && (!d.choice || d.choice === selectedChoice));
    if (currentDialogue) {
      return (
        <TouchableOpacity onPress={handleNextDialogue}>
          <View style={styles.dialogueTextContainer}>
            <View style={styles.dialogueBox}>
              <View style={styles.characterNameContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <View style={styles.dialogueTextWrapper}>
                <Text style={styles.dialogueText}>{currentDialogue.text}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderChoices = () => {
    if (dialogueStep === 0) {
      return (
        <View style={styles.choicesContainer}>
          <TouchableOpacity onPress={handleNextDialogue}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"Hello? Where am I?"</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextDialogue}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>(Remain silent and observe.)</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      );
    }
    if (dialogueStep === 3) {
      return (
        <View style={styles.choicesContainer}>
          <TouchableOpacity onPress={() => handleChoiceSelection('archives')}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"The Archives of the Written World?"</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChoiceSelection('why')}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"Why am I here?"</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleChoiceSelection('who')}>
            <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
              <Text style={styles.choiceText}>"Who are you?"</Text>
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
    position: 'relative', // Add relative positioning
    zIndex: 2, // Ensure dialogue box is above the character image
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
  characterContainer: {
    marginBottom: 10,
    width: '100%', // Ensure it takes full width
    alignItems: 'flex-start', // Ensure character container aligns items to the left
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
  dialogueBox: {
    width: '100%',
    alignItems: 'flex-start',
  },
});

export default Chapter1DetailsScreen;
