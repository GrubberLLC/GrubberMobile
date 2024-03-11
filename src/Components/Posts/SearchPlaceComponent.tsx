import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import { Home, MapPin, MessageSquare, Plus, RefreshCcw, Search, Star, X } from 'react-native-feather'
import { YELP_API_KEY } from '@env';
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 32

const SearchPlaceComponent = (props) => {
  const { setPlace, viewPlace, setViewPlace } = props

  const {profile} = useContext(UserContext)

  const [searchText, setSearchText] = useState('')
  const [searchLocation, setSearchLocation] = useState(profile.location)
  const [results, setRestults] = useState([])


  const handleSearchText = (text: string) => {
    setSearchText(text)
  }

  const handleSearchLocation = (text: string) => {
    setSearchLocation(text)
  }

  useEffect(() => {
    autoCompleteSearch()
  }, [searchLocation, searchText])

  const autoCompleteSearch = async () => {
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: searchText,
      location: searchLocation,
      categories: 'type%3A%20restaurant',
      sort_by: 'best_match'
    };
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: query,
      });
      setRestults(response.data.businesses)
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const setSelectedPlace = (item: any) => {
    setPlace(item)
    setViewPlace(!viewPlace)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Search Place</Text>
          <TouchableOpacity onPress={() => {setViewPlace(!viewPlace)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContiner}>
            <Home height={24} width={24} color={'white'}/>
            <TextInput
              placeholder={'place...'}
              placeholderTextColor={'white'}
              autoCapitalize='none'
              style={styles.input}
              returnKeyLabel='Done'
              multiline
              value={searchText}
              onChangeText={(text) => {handleSearchText(text)}}
            />
          </View>
          <View style={styles.inputContiner}>
            <MapPin height={24} width={24} color={'white'}/>
            <TextInput
              placeholder={'location...'}
              placeholderTextColor={'white'}
              autoCapitalize='none'
              style={styles.input}
              returnKeyLabel='Done'
              multiline
              value={searchLocation}
              onChangeText={(text) => {handleSearchLocation(text)}}
            />
          </View>
          <View style={styles.searchButton}>
            <Search height={24} width={24} color={'white'}/>
          </View>
        </View>
        <ScrollView style={styles.resultsContainer}>
          {
            results.length > 0
              ? results.map((item) => {
                return(
                  <TouchableOpacity onPress={() => {setSelectedPlace(item)}} style={styles.placeContainer}>
                    <Image style={styles.placeImage} source={{uri: item.image_url}}/>
                    <View style={styles.overlay}></View>
                    <View style={styles.placeInfo}>
                      <View>
                        <Text style={styles.placeName}>{item.name}</Text>
                      </View>
                      <View style={styles.buttonRow}>
                        <Text style={styles.address}>{item.location.address1} {item.location.address2} {item.location.city}, {item.location.state} {item.location.zip_code}</Text>
                      </View>
                      <View style={styles.buttonRow}>
                        <Star style={{marginRight: 5}} height={24} width={24} color={'#e94f4e'} fill={'#e94f4e'}/>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{item.rating}/5</Text>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>({item.review_count} Reviews)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
              : null
          }
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
    backgroundColor: 'rbga(0,0,0,0)'
  },
  content: {
    flex: 1,
    backgroundColor: '#363636',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderTopEndRadius: 16
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
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
    borderRadius: 16,
    marginTop: 8
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 16,
    marginTop: 8
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
  inputsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContiner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    flex: 1,
    color: 'white',
    fontSize: 18,
    marginHorizontal: 8
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  searchButton: {
    backgroundColor: '#e94f4e',
    padding: 8,
    borderRadius: 6
  },
  resultsContainer: {
    flex: 1,
    marginVertical: 16
  },
  placeContainer: {
    height: ImageWidth * .66,
    width: ImageWidth,
    backgroundColor: 'grey',
    marginVertical: 8,
    borderRadius: 8
  },
  placeImage: {
    height: ImageWidth * .66,
    width: ImageWidth,
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    height: ImageWidth * .66,
    width: ImageWidth,
    backgroundColor: 'rgba(0,0,0,.5)',
    top: 0,
    left: 0
  },
  placeInfo: {
    position: 'absolute',
    height: ImageWidth * .66,
    width: ImageWidth,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 16
  },
  placeName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  address: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  }
})

export default SearchPlaceComponent
