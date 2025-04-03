import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const ChapterDetailsScreen = () => {
  return (
    <ImageBackground 
      source={require('../../assets/MainBG.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <ImageBackground 
          source={require('../../assets/chapter_choices.png')} 
          style={styles.chapterCard}
          imageStyle={{ borderRadius: 10 }} // Ensure the image respects the border radius
        >
          <Text style={styles.chapterTitle}>Chapter 2</Text>
          <Text style={styles.chapterSubtitle}>The Laguna Copperplate Inscription</Text>
          <View style={styles.episodeList}>
            <TouchableOpacity style={styles.episodeItem}>
              <Text style={styles.episodeText}>Episode 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.episodeItem}> 
              <Text style={styles.episodeText}>Episode 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.episodeItem}>
              <Text style={styles.episodeText}>Episode 3</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  chapterCard: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chapterTitle: {
    color: '#000000', // Change text color to black
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chapterSubtitle: {
    color: '#000000', // Change text color to black
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  episodeList: {
    gap: 10,
  },
  episodeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)', // Change border color to match text
  },
  episodeText: {
    color: '#000000', // Change text color to black
    fontSize: 16,
  },
});

export default ChapterDetailsScreen;