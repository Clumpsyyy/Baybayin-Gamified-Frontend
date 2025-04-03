import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-asset';

const SplashScreen = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        await Asset.loadAsync(require('../../assets/splash.png'));
        setIsImageLoaded(true);
      } catch (error) {
        setIsImageLoaded(false);
      }
    };

    loadImage();
  }, []);

  useEffect(() => {
    if (isImageLoaded) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 10000, // Set the duration to 10000 milliseconds (10 seconds)
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate('Onboarding');
      });
    }
  }, [navigation, progress, isImageLoaded]);

  return (
    isImageLoaded ? (
      <ImageBackground source={require('../../assets/splash.png')} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.cosmicOverlay}>
            <View style={styles.starsContainer}>
              {[...Array(20)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.star, 
                    { 
                      top: Math.random() * 200, 
                      left: Math.random() * 400,
                      width: Math.random() * 3 + 1,
                      height: Math.random() * 3 + 1,
                      opacity: Math.random() * 0.8 + 0.2
                    }
                  ]} 
                />
              ))}
            </View>
          </View>
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.gradientOverlay, { width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }) }]}>
                <LinearGradient
                  colors={['#784C34', '#382318']}
                  style={styles.gradientOverlay}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </ImageBackground>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cosmicOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    top: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  progressBarWrapper: {
    position: 'absolute',
    bottom: 45,
    width: '80%',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'white', 
    padding: 2, 
  },
  gradientOverlay: {
    height: 6,
    borderRadius: 5,
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

export default SplashScreen;