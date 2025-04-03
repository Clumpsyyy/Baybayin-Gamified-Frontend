import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import SplashScreenComponent from './src/screens/LoginSignup/SplashScreen';
import OnboardingScreen from './src/screens/LoginSignup/OnboardingScreen';
import LoginScreen from './src/screens/LoginSignup/LoginScreen';
import SignupScreen from './src/screens/LoginSignup/SignupScreen';
import VerificationScreen from './src/screens/LoginSignup/VerificationScreen';
import MenuScreen from './src/screens/Dashboard/MenuScreen';
import ChapterScreen from './src/screens/chapter1/ChapterScreen';
import ChapterDetailsScreen from './src/screens/chapter1/ChapterDetailsScreen';
import Chapter1DetailsScreen from './src/screens/chapter1/Chapter1DetailsScreen';
import ProfileScreen from './src/screens/Dashboard/ProfileScreen';
import ShopScreen from './src/screens/Dashboard/ShopScreen';
import PracticeScreen from './src/screens/Dashboard/PracticeScreen';
import Practices from './src/screens/Dashboard/Practices';
import ClickableBooksScreen from './src/screens/chapter1/ClickableBooksScreen';
import SkipScreen from './src/screens/chapter1/SkipScreen';
import SetupScreen from './src/screens/chapter1/SetupScreen';
import AfterSetupScreen from './src/screens/chapter1/AfterSetupScreen';
import IntroScreen from './src/screens/LoginSignup/IntroScreen';
import TestScreen from './src/screens/chapter2/TestScreen';

const Stack = createNativeStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    'DoctrinaChristianaBold': require('./src/assets/fonts/DoctrinaChristianaBold.otf'),
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Test"
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="ChapterDetails" component={ChapterDetailsScreen} />
        <Stack.Screen name="Chapter1Details" component={Chapter1DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="Practices" component={Practices} /> 
        <Stack.Screen name="ClickableBooks" component={ClickableBooksScreen} />
        <Stack.Screen name="Skip" component={SkipScreen} />
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="AfterSetupScreen" component={AfterSetupScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;