import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRoute } from '@react-navigation/native';
import Sketch from '../../components/Sketch';

const loadFonts = () => {
  return Font.loadAsync({
    'DoctrinaChristianaBold': require('../../assets/fonts/DoctrinaChristianaBold.otf'),
  });
};

const practicesData = [
  { smallText: 'A', largeText: 'A' },
  { smallText: 'E/I', largeText: 'E' },
  { smallText: 'O/U', largeText: 'O' },
  { smallText: 'Ba', largeText: 'B' },
  { smallText: 'Ka', largeText: 'K' },
  { smallText: 'Ra/Da', largeText: 'R' },
  { smallText: 'Ga', largeText: 'G' },
  { smallText: 'Ha', largeText: 'H' },
  { smallText: 'La', largeText: 'L' },
  { smallText: 'Ma', largeText: 'M' },
  { smallText: 'Na', largeText: 'n' },
  { smallText: 'Nga', largeText: 'N' },
  { smallText: 'Pa', largeText: 'P' },
  { smallText: 'Sa', largeText: 'S' },
  { smallText: 'Ta', largeText: 'T' },
  { smallText: 'Wa', largeText: 'W' },
  { smallText: 'Ya', largeText: 'Y' },
];

const PracticeComponent = ({ smallText, largeText, handleClear, handlePlay, handleNext, handlePrevious, handleExit, currentIndex, sketchRef }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <ImageBackground 
      source={require('../../assets/MainBG.png')} 
      style={styles.background}
      resizeMode="cover"
      onError={() => setImageError(true)}
    >
      {imageError ? (
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load background image</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.subHeaderText}>{['A', 'E/I', 'O/U'].includes(smallText) ? 'Vowel' : 'Consonant'}</Text>
          <Text style={styles.pageText}>{`${currentIndex + 1}/17`}</Text>
          <View style={styles.line} />
          <View style={styles.overlayBox}>
            <Sketch ref={sketchRef} />
          </View>
          <View style={styles.box}>
            <Text style={styles.smallText}>{smallText}</Text>
            <Text style={styles.largeText}>{largeText}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handlePlay}>
                <FontAwesome name="play" size={35} color="#2E7D32" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Preview</Text>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handleClear}>
                <FontAwesome name="repeat" size={35} color="#C62828" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Redo</Text>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handlePrevious}>
                <FontAwesome name="chevron-left" size={35} color="#0D47A1" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Previous</Text>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handleNext}>
                <FontAwesome name="chevron-right" size={35} color="#0D47A1" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Next</Text>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handleExit}>
                <FontAwesome name="times" size={35} color="#E65100" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Exit</Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const Practices = ({ navigation }) => {
  const route = useRoute();
  const { smallText, largeText } = route.params;
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(practicesData.findIndex(item => item.smallText === smallText));
  const sketchRef = useRef(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadFonts().then(() => {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  const handleClear = () => {
    if (sketchRef.current) {
      sketchRef.current.clear();
    }
  };

  const handlePlay = () => {
    // Implement play functionality
  };

  const handleNext = () => {
    handleClear(); // Clear the sketch when moving to the next item
    setCurrentIndex((prevIndex) => (prevIndex + 1) % practicesData.length);
  };

  const handlePrevious = () => {
    handleClear(); // Clear the sketch when moving to the previous item
    setCurrentIndex((prevIndex) => (prevIndex - 1 + practicesData.length) % practicesData.length);
  };

  const handleExit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <PracticeComponent
        smallText={practicesData[currentIndex].smallText}
        largeText={practicesData[currentIndex].largeText}
        handleClear={handleClear}
        handlePlay={handlePlay}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleExit={handleExit}
        currentIndex={currentIndex}
        sketchRef={sketchRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D261C',
    marginBottom: 5,
    marginTop: 10,
  },
  pageText: {
    fontSize: 18,
    color: '#3D261C',
    marginBottom: 10,
  },
  smallText: {
    fontSize: 35,
    color: '#d9d9d9',
    textAlign: 'center',
    marginBottom: 10,
    top: 35,
  },
  largeText: {
    fontSize: 300,
    color: '#d9d9d9',
    textAlign: 'center',
    top: 0,
    fontFamily: 'DoctrinaChristianaBold',
  },
  box: {
    width: 320,
    borderRadius: 16,
    backgroundColor: '#3D261C',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55%',
    position: 'relative',
    opacity: 0.7,
  },
  overlayBox: {
    position: 'absolute',
    width: 320,
    height: '54.8%',
    borderRadius: 16,
    top: '22.5%',
    transform: [{ translateY: -'50%' }],
    zIndex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 40,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#3D261C',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Practices;