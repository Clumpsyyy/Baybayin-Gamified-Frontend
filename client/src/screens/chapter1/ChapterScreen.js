import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, View } from 'react-native';

const ChapterScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/MainBG.png')} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.chapterCard}
            onPress={() => navigation.navigate('Chapter1Details')}>
            <ImageBackground 
              source={require('../../assets/chapter_choices.png')} 
              style={styles.chapterImage}
            >
              <Text style={styles.chapterText}>Chapter 1</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chapterCard}  
            onPress={() => navigation.navigate('Chapter2Details')}>
            <ImageBackground 
              source={require('../../assets/chapter_choices.png')} 
              style={styles.chapterImage}
            >
              <Text style={styles.chapterText}>Chapter 2</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.chapterCard}  
            onPress={() => navigation.navigate('Chapter3Details')}>
            <ImageBackground 
              source={require('../../assets/chapter_choices.png')} 
              style={styles.chapterImage}
            >
              <Text style={styles.chapterText}>Chapter 3</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chapterCard}  
            onPress={() => navigation.navigate('Chapter4Details')}>
            <ImageBackground 
              source={require('../../assets/chapter_choices.png')} 
              style={styles.chapterImage}
            >
              <Text style={styles.chapterText}>Chapter 4</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  chapterCard: {
    width: '48%',
    height: 200, // Adjusted height for portrait mode
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chapterImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  chapterText: {
    color: '#202020',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChapterScreen;
