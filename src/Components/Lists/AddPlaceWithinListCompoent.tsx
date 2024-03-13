import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { Home, MapPin, Search, X } from 'react-native-feather'
import axios from 'axios' 
import { BASE_URL, YELP_API_KEY } from '@env';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import PlaceListTileComponent from './PlaceListTileComponent'
import { UserContext } from '../../Context/UserContext'
import { ListContext } from '../../Context/ListContext'

const AddPlaceWithinListCompoent = (props) => {
  const { setViewAddList, viewAddList, list, getListPlaces} = props

  const {user} = useContext(UserContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const [results, setResults] = useState([])

  const [loading, setLoading] = useState(false)

  const searchYelp = async () => {
    setResults([])
    setLoading(true)
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: searchTerm,
      location: searchLocation,
      categories: 'type%3A%20restaurant',
    };
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: query,
      });
      setResults(response.data.businesses)
      setLoading(false)
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
    }
  };

  const checkIfPlaceExists = (place: any) => {
    let url = `https://grubberapi.com/api/v1/places/check/${place.id}`
    axios.get(url)
      .then(response => {
        response.data.length > 0
          ? addToList(response.data[0].place_id, place)
          : addToPlaces(place)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addToPlaces = (place: any) => {
    let url = `https://grubberapi.com/api/v1/places/`
    const formatted_address = `${place.location.address1} ${place.location.city}, ${place.location.state} ${place.location.zip_code}`
    const placeData = {
      name: place.name,
      phone: place.phone,
      address_street: place.location.address1,
      address_city: place.location.city,
      address_state: place.location.state,
      address_zipcode: place.location.zip_code,
      address_formatted: formatted_address,
      rating: place.rating,
      review_count: place.review_count,
      picture: place.image_url,
      price: place.price,
      yelp_url: place.url,
      yelp_id: place.id
    }
    axios.post(url, placeData)
      .then(response => {
        addToList(response.data.id, place)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addToList = (place_id: number, place: any) => {
    let url = `https://grubberapi.com/api/v1/placeinlist/`
    const favoritesData = {
      place_id: place_id,
      list_id: list.list_id
    }
    axios.post(url, favoritesData)
      .then(response => {
        addNewActivity(response.data.id, place)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addNewActivity = (favorite_id: number, place: any) => {
    let url = `https://grubberapi.com/api/v1/activity/`
    const favoritesData = {
      user_id: user.userId,
      activity: `${user.username} added ${place.name} to ${list.name}`,
      type: 'list',
      list_id: null,
      favorite_id: place.place_id,
      following_id: null,
      comment_id: null,
      picture: place.picture
    }
    axios.post(url, favoritesData)
      .then(response => {
        getListPlaces(list.list_id)
        setViewAddList(!viewAddList)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Place To List</Text>
          <TouchableOpacity onPress={() => {setViewAddList(!viewAddList)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <View style={styles.individualContainer}>
              <Home style={styles.icon} height={20} width={20} color={'white'}/>
              <TextInput 
                placeholder={'name'}
                placeholderTextColor={'grey'}
                autoCapitalize='none'
                style={styles.inputField}
                returnKeyLabel='Done'
                value={searchTerm}
                onChangeText={(text) => {setSearchTerm(text)}}
              />
            </View>
            <View style={{height: '90%', width: 1, backgroundColor: 'lightgrey'}}></View>
            <View style={styles.individualContainer}>
              <MapPin style={styles.icon} height={20} width={20} color={'white'}/>
              <TextInput 
                placeholder={'location'}
                placeholderTextColor={'grey'}
                autoCapitalize='none'
                style={styles.inputField}
                returnKeyLabel='Done'
                value={searchLocation}
                onChangeText={(text) => {setSearchLocation(text)}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {searchYelp()}} style={styles.searchContainer}>
            <Search style={styles.searchIcon} height={20} width={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.results}>
          {
            loading
              ? <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={'#e94f4e'}/></View>
              :results.length > 0
                ? <ScrollView style={styles.scroll}>
                    {
                      results.map((place) => {
                        return(
                          <>
                            <PlaceListTileComponent addToList={checkIfPlaceExists} place={place}/>
                          </>
                        )
                      })
                    }
                  </ScrollView>
                : <View style={styles.noLocation}><Text style={styles.noPlaceText}>No Places Found...</Text></View>
          }
        </View>
      </View>
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
    backgroundColor: 'rbga(0,0,0,0)',
  },
  content: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
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
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  },
  placeHolder: {
    height: 125,
    width: 125,
    backgroundColor: '#2c2c2c',
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
  searchResults: {
    flex: 1,
    marginTop: 16
  },
  profile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  profilePicture: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor:'#e94f4e',
    marginRight: 12,
    overflow: 'hidden'
  },
  profileNames: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilename: {
    fontSize: 16
  },
  removeContainer: {
    borderRadius: 32 ,
    backgroundColor: 'lightgrey',
    padding: 6
  },
  remove: {
    color: 'black',
    padding: 8
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 16,
    backgroundColor: '#4d4d4d'
  },
  inputSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 16,
    backgroundColor: '#4d4d4d'
  },
  individualContainer: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 8
  },
  inputField: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    color: 'white'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#e94f4e',
    borderRadius: 8
  },
  searchIcon: {
    backgroundColor: '#e94f4e'
  },
  results: {
    flex: 1,
    marginTop: 16
  },
  noLocation: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: {
    flex: 1
  },
  noPlaceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default AddPlaceWithinListCompoent
