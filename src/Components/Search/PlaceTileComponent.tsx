import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Heart, MessageSquare, Plus, Star } from 'react-native-feather'

const imageWidth = Dimensions.get('window').width - 24

const PlaceTileComponent = (props) => {
  const {place, toggleViewAddToList, removeFromFavorites, checkIfPlaceExists, favorites} = props
  const navigation = useNavigation()

  const isFavoritePlace = (placeId: string, favorites: any) => {
    const favorite = favorites.find(fav => fav.yelp_id === placeId);
    return favorite ? { isFavorite: true, favoritesId: favorite.favorites_id } : { isFavorite: false };
  };

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('SearchSinglePlaceScreen', {place: place})}} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: place.image_url}}/>
      </View>
      <View style={styles.overlayContainer}>
        {
          isFavoritePlace(place.id, favorites).isFavorite
            ? <TouchableOpacity onPress={() => {removeFromFavorites(isFavoritePlace(place.id, favorites).favoritesId)}} style={styles.favoriteContainer}>
                <Heart height={26} width={26} color={'white'} fill={'white'}/>
              </TouchableOpacity>
            : <TouchableOpacity onPress={() => {checkIfPlaceExists(place)}} style={styles.favoriteContainer}>
                <Heart height={26} width={26} color={'white'}/>
              </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => {toggleViewAddToList()}} style={styles.addListContainer}>
          <Plus style={{marginRight: 4}} height={22} width={22} color={'white'}/>
          <Text style={styles.addListText}>Add To List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainter}>
        <View style={styles.detailsRow}>
          <Text style={styles.name}>{place.name}</Text>
          <Text style={styles.price}>{place.price}</Text>
        </View>
        <View style={styles.detailsRowLeft}>
          <Text style={styles.address}>{place.location.address1} {place.location.city}, {place.location.state} {place.location.zip_code}</Text>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.detailsRowLeft}>
            <Star style={{marginRight: 4}} height={18} width={18} fill={'#e94f4e'} color={'#e94f4e'}/>
            <Text style={styles.rating}>{place.rating}</Text>
            <Text style={styles.address}>({place.review_count} reviews)</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <MessageSquare style={{marginRight: 4}} height={18} width={18} color={'#e94f4e'}/>
            <Text>0</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16
  },
  imageContainer: {
    height: imageWidth - 150,
    width: imageWidth,
  },
  image: {
    flex: 1
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: imageWidth - 150,
    width: imageWidth,
    backgroundColor: 'rgba(0,0,0,.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 16
  },
  detailsContainter: {
    padding: 8,
    backgroundColor: 'white'
  },
  detailsRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsRowLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,  },
  name: {
    fontWeight: 'bold',
    fontSize: 22
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94f4e'
  },
  address: {
    fontSize: 18,
    color: 'grey'
  },
  rating: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 4
  },
  favoriteContainer: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 32,
    marginTop: 4
  },
  addListContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#e94f4e',
    borderRadius: 10,
    marginBottom: 4
  },
  addListText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  }
})

export default PlaceTileComponent
