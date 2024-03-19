import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert, Dimensions, ScrollView } from 'react-native'
import { X } from 'react-native-feather'
import imageSource from '../../Assets/about.png'
import Cafe from '../../Assets/cafe.png'

const imageWidth = Dimensions.get('window').width - 32
const imageHeight = (imageWidth * 9) / 16;

const AboutComponent = (props) => {
  const { setEditProfile, editProfile } = props

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>About Grubber</Text>
          <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={Cafe}/>
        </View>
        <ScrollView style={styles.scroll}>
          <Text style={styles.name}>Grubber LLC.</Text>
          <Text style={styles.slogan}>Discover, Savor, Share, and Dine Together.</Text>
          <Text style={styles.established}>Established: November 11, 2023</Text>
          <Text style={styles.version}>Version 1.0.0 (March 1, 2025)</Text>
          <Text style={styles.legal}>© Grubber LLC. All Rights Reserved (2024 - 2025)</Text>
          <Text style={styles.paragraph}>Welcome to Grubber, the ultimate social dining app that's redefining the way friends and family discover, share, and enjoy the world of food together. At Grubber, we believe that meals are more than just food on a plate; they're shared experiences that forge lasting bonds and create cherished memories. Our platform is designed to make finding your next great meal an adventure that you can embark on with those closest to you.</Text>
          <Text style={styles.paragraph}>With Grubber, you can effortlessly create and manage lists of your favorite restaurants, from hidden gems to beloved eateries, and share them with your personal network. Whether you're keeping your lists private or setting them public for the world to see, Grubber connects you with a community of food enthusiasts eager to explore and exchange their culinary finds.</Text>
          <Text style={styles.paragraph}>Favoriting your go-to restaurants has never been easier, allowing you quick access to your top picks for those "where should we eat?" moments. And with the ability to follow other users, you'll gain insights into where the food lovers are dining, ensuring you're always in the know about the hottest spots in town.</Text>
          <Text style={styles.paragraph}>At Grubber, we're passionate about bringing people together through the love of food. Join our community today and start sharing your culinary adventures, discovering new dining experiences, and connecting with friends and family over the meals you love. Because with Grubber, every meal is an opportunity to savor the connection.</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0'
  },
  content: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 32
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  imageContainer: {
    height: imageHeight,
    width: imageWidth,
    marginVertical: 28
  },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  scroll: {
    flex: 1,
    marginBottom: 8
  },
  name: {
    fontWeight: 'bold',
    color: '#e94f4e',
    fontSize: 28
  },
  slogan: {
    fontSize: 16,
    marginTop: 8,
    color: 'white'
  },
  established: {
    fontSize: 16,
    marginTop: 8,
    color: 'white'
  },
  version: {
    fontSize: 14,
    marginTop: 4,
    color: 'white'
  },
  legal: {
    fontSize: 14,
    marginTop: 4,
    color: 'white'
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    color: 'white'
  }
})

export default AboutComponent
