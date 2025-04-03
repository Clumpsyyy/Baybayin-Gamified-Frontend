import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const imageUri = Image.resolveAssetSource(require('../../assets/loginback.png')).uri;
        Image.prefetch(imageUri)
            .then(() => setIsImageLoaded(true))
            .catch(() => setIsImageLoaded(false));
    }, []);

    const handleNext = () => {
        if (currentScreen < 3) {
            setCurrentScreen(currentScreen + 1);
        } else {
            navigation.replace('Signup');
        }
    };

    const screens = [
        {
            title: 'WELCOME',
            description: 'Welcome to Baybayin! Dive into the rich history and beautiful script of Baybayin. Let\'s embark on this learning adventure together!',
            buttonText: 'NEXT',
        },
        {
            title: 'DISCOVER',
            description: 'Discover the exciting features of Baybayin Learn! From interactive quizzes to fun challenges, you\'ll master Baybayin while earning rewards and badges along the way.',
            buttonText: 'NEXT',
        },
        {
            title: 'GET STARTED',
            description: 'Ready to start learning? Set up your profile and customize your learning experience. Let\'s get you started on the path to mastering Baybayin!',
            buttonText: 'SIGN-UP',
        },
    ];

    const currentData = screens[currentScreen - 1];

    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {screens.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: currentScreen === index + 1 ? '#1A5651' : '#fff' },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        isImageLoaded ? (
            <ImageBackground source={require('../../assets/loginback.png')} style={styles.background}>
                <View style={styles.overlay} />
                <View style={styles.screen}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{currentData.title}</Text>
                        <Text style={styles.description}>{currentData.description}</Text>
                        {renderDots()}
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>{currentData.buttonText}</Text>
                        </TouchableOpacity>
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.25)', 
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        padding: 30,
        borderRadius: 10,
        width: 310,
        height: 570,
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
        color: '#fff',
        textAlign: 'center',
        position: 'absolute', 
        top: 60,
    },
    description: {
        fontSize: 16,
        color: '#ddd',
        textAlign: 'center',
        marginTop: 100,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute', 
        bottom: 150, 
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        borderWidth: 0.7,
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
        bottom: 80,
        width: 200,
        height: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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

export default OnboardingScreen;