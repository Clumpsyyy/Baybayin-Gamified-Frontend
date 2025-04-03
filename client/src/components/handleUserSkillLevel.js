import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HandleUserSkillLevel = ({ onNext }) => {
  const [skillLevel, setSkillLevel] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { token, User_ID } = JSON.parse(userData);
          setToken(token);
          setUserId(User_ID);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleNext = async (level) => {
    setSkillLevel(level);
    try {
      const response = await axios.patch(`https://backend-y4fw.onrender.com/api/users/skill_level/${userId}`, {
        skill_level: level,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        onNext(level);
        // Alert.alert('Success', response.data.message);
      }
    } catch (error) {
      console.error('Error saving skill level:', error);
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.questionText}>"What's your current skill level in Baybayin?"</Text>
      <TouchableOpacity style={styles.skillButton} onPress={() => handleNext('Beginner')}>
        <Text style={styles.skillButtonText}>Beginner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skillButton} onPress={() => handleNext('Intermediate')}>
        <Text style={styles.skillButtonText}>Intermediate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skillButton} onPress={() => handleNext('Advanced')}>
        <Text style={styles.skillButtonText}>Advanced</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    width: 310,
    height: 400,
    backgroundColor: 'rgba(41, 41, 41, 0.2)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  skillButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HandleUserSkillLevel;