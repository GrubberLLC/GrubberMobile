import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Dimensions } from 'react-native'
import { MessageSquare, Plus, RefreshCcw, Star, X } from 'react-native-feather'
import InputFieldComponent from '../General/InputFieldComponent'
import MainButton from '../General/MainButton'
import { launchImageLibrary } from 'react-native-image-picker'; // Import the function
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { uploadData } from 'aws-amplify/storage';
import { BASE_URL } from '@env';
import axios from 'axios'
import InputSwitchComponent from '../General/InputSwitchComponent'
import { UserContext } from '../../Context/UserContext'
import { ListContext } from '../../Context/ListContext'
import { useNavigation } from '@react-navigation/native'

const imageWidth = Dimensions.get('window').width - 32

const ShowRandomPlaceCompoenent = (props) => {
  const { setViewRandomPlace, viewRandomPlace, place } = props
  const navigation = useNavigation()

  function convertDateToDaysOrHours(dateString: string) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    
    if (differenceInHours < 24) {
      return `Today`;
    } else {
      const differenceInDays = differenceInHours / 24;
      return `${Math.floor(differenceInDays)} days ago`;
    }
  }

  const redirectToPlaceScreen = () => {
    setViewRandomPlace(!viewRandomPlace)
    navigation.navigate('SinglePlaceScreen', {place: place})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Randomly Selected Place</Text>
          <TouchableOpacity onPress={() => {setViewRandomPlace(!viewRandomPlace)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {redirectToPlaceScreen()}}>
          <View style={styles.listImageContainer}>
            <Image style={styles.listImage} source={{uri: place.picture}}/>
          </View>
          <View style={styles.overlay}></View>
          <View style={styles.info}>
            <View style={styles.infoTopBar}>
              <Text style={styles.name}>{place.name}</Text>
              <Text style={styles.item}>{convertDateToDaysOrHours(place.created_at)}</Text>
            </View>
            <Text style={styles.activity}>{place.address_formatted}</Text>
            <View style={styles.detailsRow}>
              <View style={styles.detailsRowLeft}>
                <Star style={{marginRight: 4}} height={18} width={18} fill={'#e94f4e'} color={'#e94f4e'}/>
                <Text style={styles.rating}>{place.rating}/5</Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>({place.review_count} reviews)</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
    backgroundColor: 'rbga(0,0,0,0)'
  },
  content: {
    width: '100%',
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
    alignItems: 'center',
    marginBottom: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  },
  placeHolder: {
    height: 125,
    width: 125,
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 16,
    marginTop: 8,
    overflow: 'hidden'
  },
  imageIcon: {
    height: 18,
    width: 18,
    color: '#e93f3e',
    margin: 10,
    marginLeft: 14
  },
  menuOptions: {
    display: 'flex',
    flexDirection: 'row'
  },
  listImageContainer: {
    width: imageWidth,
    height: imageWidth - 150,
    borderRadius: 8,
    overflow: 'hidden'
  },
  listImage: {
    width: imageWidth,
    height: imageWidth - 150,
    backgroundColor: 'lightgrey',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageWidth,
    height: imageWidth - 150,
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    overflow: 'hidden'
  },
  info: {
    padding: 8,
    backgroundColor: '#4d4d4d',
    borderRadius: 8
  },
  infoTopBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  activity: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  detailsRowLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,  
  },
  rating: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 4
  },
  detailsRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
})

export default ShowRandomPlaceCompoenent
