import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const avatars = {
  '1': require('../../assets/avatars/1.jpg'),
  '2': require('../../assets/avatars/2.jpg'),
  '3': require('../../assets/avatars/3.jpg'),
  '4': require('../../assets/avatars/4.jpg'),
  '5': require('../../assets/avatars/5.jpg'),
  '6': require('../../assets/avatars/6.png'),
};

const ProfileDetails = ({ userName, userID, skill }) => {
  return (
    <View style={styles.profileDetails}>
      <Text style={styles.profileName}>{userName} #{userID}</Text>
      <Text style={styles.profileLevel}>{skill}</Text>
      <TouchableOpacity style={styles.editButton}>
        <FontAwesome name="edit" size={16} color="black" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProgressBar = ({ currentXP, maxXP, currentLevel }) => {
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <View style={styles.levelBarContainer}>
      <View style={styles.levelBarBackground}>
        <LinearGradient
          colors={['#784C34', '#45251A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.levelBarFill, { width: `${progressPercentage}%` }]}
        />
      </View>
      <Text style={styles.levelText}>Level {currentLevel}: {currentXP}/{maxXP}</Text>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [avatarKey, setAvatarKey] = useState('1'); // Default avatar key
  const [userName, setUserName] = useState('User');
  const [skill, setSkill] = useState('Beginner');
  const [userID, setUserID] = useState('');
  const [currentXP, setCurrentXP] = useState(500);
  const [maxXP] = useState(10000);
  const [currentLevel] = useState(10);
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState(0);
  const [chapter, setChapter] = useState(1);
  const totalChapters = 4;
  const [currency, setCurrency] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [achievements, setAchievements] = useState([]); // Add state for achievements

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { token, User_ID } = JSON.parse(userData);
          const response = await axios.get(`https://backend-y4fw.onrender.com/api/users/${User_ID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setUserID(response.data.User_ID);
            setAvatarKey(response.data.Avatar);
            setUserName(response.data.Ingame_name);
            setSkill(response.data.skill_level);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = async () => {
    setIsModalVisible(false);
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing token:', error);
    }

  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>&lt;&lt; Main Menu</Text>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={avatars[avatarKey]} // Use the avatar key to fetch the correct image
                style={styles.profileImage}
              />
            </View>
            <ProfileDetails userName={userName} userID={userID} skill={skill} />
          </View>
          <ProgressBar currentXP={currentXP} maxXP={maxXP} currentLevel={currentLevel} />
          <View style={styles.divider} />
          <View style={styles.infoBoxesContainer}>
            <View style={styles.infoBox}>
              <View style={[styles.iconCircle, { backgroundColor: '#FF4500' }]}>
                <FontAwesome name="fire" size={24} color="#fff" />
              </View>
              <Text style={styles.infoBoxText}>{streak} Day/s</Text>
              <Text style={styles.infoBoxLabel}>Streak</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFBF00' }]}>
                <FontAwesome name="trophy" size={24} color="#fff" />
              </View>
              <Text style={styles.infoBoxText}>{badge}</Text>
              <Text style={styles.infoBoxLabel}>Badge</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={[styles.iconCircle, { backgroundColor: '#4682B4' }]}>
                <FontAwesome name="bookmark" size={24} color="#fff" />
              </View>
              <Text style={styles.infoBoxText}>{chapter}/{totalChapters}</Text>
              <Text style={styles.infoBoxLabel}>Chapter</Text>
            </View>
          </View>

          <View style={styles.currencyContainer}>
            <Text style={styles.currencyText}>{currency} Orchivium</Text>
            <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Shop')}>
              <Text style={styles.shopButtonText}>Shop</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgesContainer}>
            <View style={styles.badgesTitleContainer}>
              <Text style={styles.badgesTitle}>Badges</Text>
              <FontAwesome name="edit" size={16} color="black" style={styles.badgesEditIcon} />
            </View>
            <View style={styles.badges}>
              {Array.from({ length: 3 }).map((_, index) => (
                <TouchableOpacity key={index} style={styles.badgeBox}>
                  {/* Removed the edit icon from here */}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.achievementsContainer}>
            <View style={styles.achievementsTitleContainer}>
              <Text style={styles.achievementsTitle}>Achievements</Text>
              <FontAwesome name="edit" size={16} color="black" style={styles.achievementsEditIcon} />
            </View>
            {achievements.length === 0 ? (
              <Text style={styles.noAchievementsText}>No Achievements</Text>
            ) : (
              <View style={styles.achievementBox}>
                {/* Render achievements here */}
              </View>
            )}
          </View>

          <View style={styles.divider} />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log-out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <View style={styles.modalInnerBorder} />
                <Text style={styles.modalText}>Are you sure you want to log-out?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={[styles.modalButton, styles.modalButtonYes]} onPress={confirmLogout}>
                    <Text style={{ color: '#fff' }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.modalButtonNo]} onPress={cancelLogout}>
                    <Text style={{ color: '#000' }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 50, // Adjust this value as needed
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 50,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30, 
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 70,
  },
  profileDetails: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  profileLevel: {
    fontSize: 16,
    color: '#3D261C',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#3D261C',
  },
  levelBarContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  levelBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    overflow: 'hidden',
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  levelText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 20,
  },
  infoBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '83%',
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#8D5E40',
    paddingTop: 20,
    marginHorizontal: 5,
    borderRadius: 12,
    height: 130,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 7,
    color: '#fff',
  },
  infoBoxLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 3,
  },
  achievementsContainer: {
    marginTop: 20,
    width: '80%',
  },
  achievementsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  achievementsEditIcon: {
    marginLeft: 5,
  },
  achievementBox: {
    width: '100%',
    height: 80,
    backgroundColor: '#8D5E40',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  noAchievementsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '81%',
    backgroundColor: '#8D5E40',
    padding: 10,
    borderRadius: 16,
    marginTop: 20,
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  currencyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  shopButton: {
    backgroundColor: '#D5B07D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: 90,
    borderColor: '#000',
    borderWidth: 1,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202020',
  },
  badgesContainer: {
    marginTop: 20,
    width: '80%',
  },
  badgesTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
    marginBottom: 10,
    left: '5',
  },
  badgesEditIcon: {
    marginLeft: 10,
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  badgeBox: {
    width: 89,
    height: 80,
    backgroundColor: '#8D5E40',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  noAchievementsText: {
    fontSize: 16,
    color: '#202020',
    alignSelf: 'center',
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 90,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#880808',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    width: 260,
    height: 160, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D261C',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 90,
    borderWidth: 0.5,
    borderColor: '#3D261C',
  },
  modalButtonYes: {
    backgroundColor: '#8D5E40', 
    color: '#fff',
    fontSize: 16,
  },
  modalButtonNo: {
    backgroundColor: 'white', 
    color: '#000',
    fontSize: 16,
  },
  modalInnerBorder: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#3D261C',
    borderRadius: 10,
  },
});

export default ProfileScreen;