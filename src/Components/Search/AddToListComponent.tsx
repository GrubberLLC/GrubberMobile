import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import { X } from 'react-native-feather'
import { BASE_URL } from '@env';
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { ListContext } from '../../Context/ListContext'


const AddToListComponent = (props) => {
  const { place, toggleViewAddToList } = props

  const { user } = useContext(UserContext)
  const { getUserLists, userLists } = useContext(ListContext)

  const [addingId, setAddingId] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUserLists(user.userId)
  }, [])

  const truncateString = (str: string) => {
    if (str.length > 30) {
      return str.slice(0, 30 > 3 ? 30 - 3 : 30) + "...";
    }
    return str;
  }

  const checkIfPlaceExists = (place: any, list: any) => {
    setLoading(true)
    setAddingId(list.list_id)
    const url = `https://grubberapi.com/api/v1/places/check/${place.id}`
    axios.get(url)
      .then(response => {
        response.data.length === 0
          ? addToPlaces(place, list)
          : addPlaceToList(response.data[0].place_id, list)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const addToPlaces = (place: any, list: any) => {
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
        addPlaceToList(response.data.id, list)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addPlaceToList = (place_id: string, list: any) => {
    let url = `https://grubberapi.com/api/v1/placeInList/`
    const favoritesData = {
      place_id: place_id,
      list_id: list.list_id,
    }
    axios.post(url, favoritesData)
      .then(response => {
        addNewActivity(list)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addNewActivity = (list: any) => {
    let url = `https://grubberapi.com/api/v1/activity/`
    const favoritesData = {
      user_id: user.userId,
      activity: `${user.username} added ${place.name} to ${list.name}`,
      type: 'list',
      list_id: list.list_id,
      favorite_id: null,
      following_id: null,
      comment_id: null,
      picture: list.picture
    }
    axios.post(url, favoritesData)
      .then(response => {
        setLoading(false)
        toggleViewAddToList(false)
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
          <Text style={styles.headerText}>Add To List</Text>
          <TouchableOpacity onPress={() => {toggleViewAddToList()}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollCOntainer}>
          <ScrollView style={styles.scroll}>
            {
              userLists.map((list) => {
                return(
                  <View style={styles.listContainer}>
                    <View style={styles.imageContainer}>
                      <Image style={styles.image} source={{uri: list.picture}}/>
                    </View>
                    <View style={styles.listDetails}>
                      <Text style={styles.name}>{list.name}</Text>
                      <Text>{truncateString(list.description)}</Text>
                    </View>
                    <View>
                      {
                        loading && list.id === addingId
                          ? <View style={styles.addContainer}><ActivityIndicator size={'small'} color={'white'}/></View>
                          : <TouchableOpacity onPress={() => {checkIfPlaceExists(place, list)}} style={styles.addContainer}>
                              <Text style={styles.add}>Add</Text>
                            </TouchableOpacity>
                      }
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
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
    backgroundColor: 'rbga(0,0,0,0)'
  },
  content: {
    width: '100%',
    backgroundColor: '#f2f2f2',
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
    fontWeight: 'bold'
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
  scrollCOntainer: {
    height: 300,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 16,
    borderRadius: 8
  },
  scroll: {
    flex: 1
  },
  listContainer: {
    width: '100%',
    padding: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    height: 55,
    width: 55,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    backgroundColor: 'lightgrey',
    borderRadius: 8,
  },
  listDetails: {
    flex: 1,
    marginHorizontal: 12
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4
  },
  addContainer: {
    backgroundColor: '#e94f4e',
    padding: 12,
    borderRadius: 30
  },
  add: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14
  }
})

export default AddToListComponent
