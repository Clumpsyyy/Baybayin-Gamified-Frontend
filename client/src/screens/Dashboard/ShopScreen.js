import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ShopScreen = () => {
  const [orchivium, setOrchivium] = useState(0);

  return (
    <ImageBackground 
      source={require('../../assets/MainBG.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>SHOP</Text>
            <Text style={styles.orchiviumText}>{orchivium} Orchivium</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.boxContainer}>
            <View style={styles.box} />
          </View>
          <View style={styles.line} />
          <Text style={styles.avatarText}>AVATAR</Text>
          <View style={styles.circleScrollContainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.circleContainer}>
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.line} />
          <Text style={styles.avatarText}>THEMES</Text>
          <View style={styles.squareScrollContainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.squareContainer}>
                <View style={styles.square} />
                <View style={styles.square} />
                <View style={styles.square} />
                <View style={styles.square} />
                <View style={styles.square} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.line} />
          
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 20, 
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  orchiviumText: {
    fontSize: 16,
    color: '#3D261C'
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#3D261C',
    marginTop: 5,
    alignSelf: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  box: {
    width: 300,
    height: 144,
    borderRadius: 16,
    backgroundColor: '#784C34',
  },
  squareScrollContainer: {
    width: '100%',
  },
  squareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  square: {
    width: 130,
    height: 280,
    borderRadius: 16,
    backgroundColor: '#784C34',
    marginHorizontal: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D261C',
    marginTop: 15,
    marginBottom: 10,
  },
  circleScrollContainer: {
    width: '100%',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#784C34',
    marginHorizontal: 5,
  },
});

export default ShopScreen;