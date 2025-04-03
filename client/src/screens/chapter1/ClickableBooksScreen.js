import React from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ClickableBooksScreen = ({ navigation }) => {
  const handleBookPress = (bookNumber) => {
    console.log(`Book ${bookNumber} selected`);
    
    if (bookNumber === 6) {
      navigation.navigate('Skip'); // Navigate to SkipScreen
    } else {
      navigation.navigate('ClickableBooks');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/clickablebooks.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.libraryContainer}>
          {/* You can add static library shelves here if needed */}
        </View>
        
        <TouchableOpacity 
          style={[styles.book, styles.book1]} 
          onPress={() => handleBookPress(1)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book2]} 
          onPress={() => handleBookPress(2)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book3]} 
          onPress={() => handleBookPress(3)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book4]} 
          onPress={() => handleBookPress(4)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book5]} 
          onPress={() => handleBookPress(5)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
      </View>

      <View style={styles.book6Container}>
          <TouchableOpacity 
            style={[styles.book, styles.book6]} 
            onPress={() => handleBookPress(6)}
          >
            <View style={styles.book6Glow} />
          </TouchableOpacity>
        </View>
      
    </ImageBackground>
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
  libraryContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  book: {
    position: 'absolute',
    width: 60,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowingBook: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bookGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1,
    backgroundColor: 'rgba(242, 222, 111, 0.84)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 7,
  },
  book1: {
    top: '57.5%',
    left: '14.2%',
    width: '1.2%',
    height: '1.6%',
  },
  book2: {
    top: '64.9%',
    left: '69%',
    width: '1.3%',
    height: '1.8%',
  },
  book3: {
    top: '61.7%',
    left: '39.1%',
    width: '1.2%',
    height: '1.6%',
  },
  book4: {
    top: '70%',
    left: '80.2%',
    width: '1.3%',
    height: '1.9%',
  },
  book5: {
    top: '75.1%',
    left: '47.4%',
    width: '1.2%',
    height: '1.5%',
  },
  book6Container: {
    position: 'absolute',
    top: '80%',
    left: '46.2%', 
  },
  book6: {
    width: 11.3,
    height: 9.2,
  },
  book6Glow: { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1,
    backgroundColor: 'rgba(185, 208, 228, 0.2)',
    shadowColor: '#00FFFF', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 0,
  },
  instructionText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
});

export default ClickableBooksScreen;

