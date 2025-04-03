import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ImageBackground, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Icons for navbar
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const avatars = {
  '1': require('../../assets/avatars/1.jpg'),
  '2': require('../../assets/avatars/2.jpg'),
  '3': require('../../assets/avatars/3.jpg'),
  '4': require('../../assets/avatars/4.jpg'),
  '5': require('../../assets/avatars/5.jpg'),
  '6': require('../../assets/avatars/6.png'),
};

const MenuScreen = ({ navigation }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [avatarKey, setAvatarKey] = useState('1'); // Default avatar key
  const [userName, setUserName] = useState('User');

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
            setAvatarKey(response.data.Avatar);
            setUserName(response.data.Ingame_name);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    const imageUri = Image.resolveAssetSource(require('../../assets/back.png')).uri;
    Image.prefetch(imageUri)
      .then(() => setIsImageLoaded(true))
      .catch(() => setIsImageLoaded(false));
  }, []);

  const maxXP = 10000;
  const currentXP = 500;
  const currentLevel = 10;
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    isImageLoaded ? (
      <ImageBackground source={require("../../assets/back.png")} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>

          {/* Profile Headers */}
          <View style={styles.profileContainer}>
            <Image source={avatars[avatarKey]} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{userName}</Text>

              {/* XP Progress Bar */}
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
            </View>
          </View>

          {/* Chat Box */}
          <View style={styles.chatContainer}>
            <View style={styles.chatBox}>
              <Text style={styles.botName}>Scribeon:</Text>
              <Text style={styles.chatMessage}>Hello {userName}! How are you today?</Text>
            </View>
          </View>

          {/* Bottom Navigation */}
          <View style={styles.navbar}>

            <TouchableOpacity style={[styles.navItem, { marginRight: 15 }]} onPress={() => navigation.navigate('Practice')}>
              <Image source={require('../../assets/practice.png')} style={styles.navIcon} />
              <Text style={styles.navText}>PRACTICE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginRight: 45 }]} onPress={() => navigation.navigate('Chapter')}>
              <FontAwesome5 name="calendar-alt" size={32} color="white" />
              <Text style={styles.navText}>CHALLENGES</Text>
            </TouchableOpacity>

            {/* CHAPTER Button - Centered Inside Navbar */}
            <View style={styles.chapterButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Chapter')} style={styles.chapterButton}>
                <Image source={require('../../assets/chapter.png')} style={styles.chapterIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.navItem, { marginLeft: 45 }]} onPress={() => navigation.navigate('Shop')}>
              <Image source={require('../../assets/shop.png')} style={styles.navIcon} />
              <Text style={styles.navText}>SHOP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginLeft: 20 }]} onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../../assets/profile.png')} style={styles.navIcon} />
              <Text style={styles.navText}>PROFILE</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
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
    backgroundColor: "#000"
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? '0.5%' : '0.5%',
  },
  /* Profile Header*/
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? '10%' : '9%',
    left: Platform.OS === 'ios' ? '8%' : '6%',
    fontFamily: 'Cardo',
  },
  profileImage: {
    width: '20%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: '2%',
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Cardo',
  },
  /* Level Bar */
  levelBarContainer: {
    marginTop: '1%',
  },
  levelBarBackground: {
    width: '70%',
    height: 5,
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
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Cardo',
    marginTop: 5,
  },
  chatContainer: {
    backgroundColor: 'rgba(107, 103, 103, 0.61)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.32)',
    width: Platform.OS === 'ios' ? '86%' : '89%',
    height: Platform.OS === 'ios' ? '22%' : '20%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '25%' : '22%',
  },
  /* CHAPTER Button - Centered */
  chapterButtonContainer: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },
  chapterButton: {
    width: 64,
    height: 64,
    backgroundColor: 'rgb(50, 43, 43)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  chapterIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  chatBox: {
    padding: '4%',
  },
  botName: {
    color: '#FFFFFF',
    marginTop: '1%',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cardo',
  },
  chatMessage: {
    color: '#FFFFFF',
    marginTop: '1%',
    marginLeft: '4%',
    fontSize: 14,
    fontFamily: 'Cardo',
  },
  navIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },

  /* Bottom Navigation */
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 99, 99, 0.67)',
    borderRadius: 12,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? '3%' : '2%',
    width: Platform.OS === 'ios' ? '92%' : '95%',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? '12%' : '10%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Cardo',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MenuScreen;