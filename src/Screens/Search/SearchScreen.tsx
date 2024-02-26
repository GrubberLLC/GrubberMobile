
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { YELP_API_KEY } from '@env';
import { UserContext } from '../../Context/UserContext';
import { TextInput } from 'react-native-gesture-handler';
import { Bold, Home, MapPin, Search } from 'react-native-feather';
import PlaceTileComponent from '../../Components/Search/PlaceTileComponent';
import AddToListComponent from '../../Components/Search/AddToListComponent';


const SearchScreen  = () => {
  const navigation = useNavigation()

  const { user, profile, favorites, getUserFavorites } = useContext(UserContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const [results, setResults] = useState([])
  const [isRecommended, setIsRecommended] = useState(true)

  const [viewAddToList, setViewAddToList] = useState(false)

  const [loading, setLoading] = useState(false)

  const toggleViewAddToList = () => {
    setViewAddToList(!viewAddToList)
  }

  useEffect(() => {
    getUserFavorites(user.userId)
    searchRecommndations()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        getUserFavorites(user.userId)
      }
    }, [navigation])
  );

  const searchRecommndations = async () => {
    setLoading(true)
    setResults([])
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: searchTerm,
      location: profile.location,
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

  const searchYelp = async () => {
    setLoading(true)
    setResults([])
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: searchTerm,
      location: searchLocation,
    };
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: query,
      });
      setResults(response.data.businesses)
      setIsRecommended(false)
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
          ? addToFavorites(response.data[0].place_id, place)
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
        addToFavorites(response.data.id, place)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addToFavorites = (id: number, place: any) => {
    let url = `https://grubberapi.com/api/v1/favorites/`
    const favoritesData = {
      place_id: id,
      user_id: user.userId,
      list_id: null
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
      activity: `${user.username} added ${place.name} to favorites`,
      type: 'favorite',
      list_id: null,
      favorite_id: place.place_id,
      following_id: null,
      comment_id: null,
      picture: place.picture
    }
    axios.post(url, favoritesData)
      .then(response => {
        getUserFavorites(user.userId)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const removeFromFavorites = (id: number) => {
    let url = `https://grubberapi.com/api/v1/favorites/${id}`
    axios.delete(url)
      .then(response => {
        getUserFavorites(user.userId)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Find A Place</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.individualContainer}>
            <Home style={styles.icon} height={20} width={20} color={'#e94f4e'}/>
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
            <MapPin style={styles.icon} height={20} width={20} color={'#e94f4e'}/>
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
          <TouchableOpacity onPress={() => {searchYelp()}} style={styles.searchContainer}>
            <Search style={styles.searchIcon} height={20} width={20} color={'white'} />
          </TouchableOpacity>
        </View>
        {
          isRecommended
            ? <View style={styles.recommendedHeader}>
                <Text style={styles.recommendedHeaderText}>Recommendations:</Text>
              </View>
            : null
        }
        <View style={styles.results}>
          {
            loading
              ? <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'} color={'#e94f4e'}/></View>
              : results.length > 0
                  ? <ScrollView style={styles.scroll}>
                      {
                        results.map((place) => {
                          return(
                            <>
                              <PlaceTileComponent checkIfPlaceExists={checkIfPlaceExists} toggleViewAddToList={toggleViewAddToList} favorites={favorites} removeFromFavorites={removeFromFavorites} addToPlaces={addToPlaces} place={place}/>
                              <Modal
                                style={styles.modal}
                                animationType="slide"
                                transparent={true}
                                visible={viewAddToList}
                              >
                                <AddToListComponent viewAddToList={viewAddToList} toggleViewAddToList={toggleViewAddToList} place={place}/>
                              </Modal>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    paddingBottom: 4
  },
  title: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
    padding: 12
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 16,
    backgroundColor: 'white'
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
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    backgroundColor: '#e94f4e',
    borderRadius: 16,
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
    fontWeight: 'bold'
  },
  recommendedHeader: {
    marginTop: 16
  },
  recommendedHeaderText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default SearchScreen
