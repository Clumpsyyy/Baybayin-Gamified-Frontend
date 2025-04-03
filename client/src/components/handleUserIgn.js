import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HandleUserIgn = ({ onNext }) => {
  const [name, setName] = useState('');
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

  const handleNext = async () => {
    if (name.trim() !== '') {
      try {
        const response = await axios.patch(`https://backend-y4fw.onrender.com/api/users/ingame_name/${userId}`, {
          Ingame_name: name,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          onNext(name);
          // Alert.alert('Success', response.data.message);
        }
      } catch (error) {
        console.error('Error saving name:', error);
      }
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.questionText}>"What would you like me to call you?"</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
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
        marginBottom: 20,
        textAlign: 'center', 
      },
  input: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(43, 4, 4, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HandleUserIgn;