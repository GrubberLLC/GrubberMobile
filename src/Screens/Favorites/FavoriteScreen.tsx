
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { UserContext } from '../../Context/UserContext';
import FavoritePlaceTileComponent from '../../Components/Favorites/FavoritePlaceTileComponent';


const FavoriteScreen  = () => {
  const navigation = useNavigation()

  const { user } = useContext(UserContext)

  const [favorites, setFavorites] = useState([])

  const getUserFavorites = (user_id: string) => {
    setFavorites([])
    let url = `https://grubberapi.com/api/v1/favorites/user/${user_id}`
    axios.get(url)
      .then(response => {
        setFavorites(response.data)
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

  useEffect(() => {
    getUserFavorites(user.userId)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        getUserFavorites(user.userId)
      }
    }, [navigation])
  );

  useEffect(() => {
  }, [favorites])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.results}>
          {
            favorites.length > 0
              ? <ScrollView style={styles.scroll}>
                  {
                    favorites.map((place) => {
                      return(
                        <>
                          <FavoritePlaceTileComponent removeFromFavorites={removeFromFavorites} favorites={favorites} place={place}/>
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
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
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
    backgroundColor: '#2c2c2c',
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
  }
})

export default FavoriteScreen
