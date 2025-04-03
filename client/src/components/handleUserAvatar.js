import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const HandleUserAvatar = ({ avatars, selectedAvatarKey, onNext }) => {
  const [selectedKey, setSelectedKey] = useState(selectedAvatarKey);

  const handleNext = () => {
    if (selectedKey !== null) {
      onNext(selectedKey);
    } else {
      Alert.alert('Error', 'Please select an avatar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>"Choose your avatar"</Text>
      {selectedKey !== null && (
        <Image source={avatars[selectedKey]} style={styles.bigAvatar} />
      )}
      <View style={styles.avatarGrid}>
        {Object.keys(avatars).map((key) => (
          <TouchableOpacity key={key} onPress={() => setSelectedKey(key)}>
            <Image
              source={avatars[key]}
              style={[
                styles.avatar,
                selectedKey === key && styles.selectedAvatar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.nextButton, selectedKey === null && { backgroundColor: '#555' }]}
        onPress={handleNext}
        disabled={selectedKey === null}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    height: '65%',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 0.3,
    borderColor: 'white',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  avatarGrid: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  nextButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    marginTop: 35,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HandleUserAvatar;