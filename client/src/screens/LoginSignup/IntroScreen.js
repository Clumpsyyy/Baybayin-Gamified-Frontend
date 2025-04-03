import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const IntroScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);

    const dialogueText1 = "Chapter 1\nThe Forgotten Glyph";
    const dialogueText2 = "Kabanata 1\nAng Nakalimutang Sagisag";

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        const loadFonts = async () => {
            await Font.loadAsync({
                'DoctrinaChristianaBold': require('../../assets/fonts/DoctrinaChristianaBold.otf'),
            });
            setFontsLoaded(true);
            SplashScreen.hideAsync();
        };

        loadFonts();

        const timer1 = setTimeout(() => {
            setShowSecondText(true);
        }, 1000); // Delay before showing second text

        const timer2 = setTimeout(() => {
            navigation.navigate('Chapter1Details');
        }, 2000); // Delay before navigating

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [navigation]);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3D261C" />
            </View>
        ); // Render a loading spinner while waiting for fonts to load
    }

    return (
        <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    {!showSecondText && <Text style={styles.dialogueText}>{dialogueText1}</Text>}
                    {showSecondText && <Text style={styles.dialogueTextAlt}>{dialogueText2}</Text>}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    textContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.0)', // No background
        padding: 20,
        borderRadius: 10,
    },
    dialogueText: {
        fontSize: 32,
        color: '#000', // Black text like old paper
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dialogueTextAlt: {
        fontSize: 32,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'DoctrinaChristianaBold', // Ensure the font is set here
    },
});

export default IntroScreen;
