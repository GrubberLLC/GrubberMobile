import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MessageSquare, Plus, Star } from 'react-native-feather'

const imageWidth = Dimensions.get('window').width - 16

const PlaceListTileComponent = (props) => {
  const {addToList, place} = props

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: place.image_url}}/>
      </View>
      <View style={styles.overlayContainer}>
        <TouchableOpacity onPress={() => {addToList(place)}} style={styles.addListContainer}>
          <Plus height={22} width={22} color={'white'}/>
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
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 16,
    overflow: 'hidden'
  },
  imageContainer: {
    height: imageWidth - 150,
    width: imageWidth,
  },
  image: {
    height: imageWidth - 150,
    width: imageWidth,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden'
  },
  overlayContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    height: imageWidth - 150,
    width: imageWidth,
    backgroundColor: 'rgba(0,0,0,.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 16,

  },
  detailsContainter: {
    padding: 16,
    backgroundColor: '#4d4d4d',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    overflow: 'hidden'
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
    marginTop: 4,  
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  address: {
    fontSize: 18,
    color: 'white'
  },
  rating: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 4
  },
  favoriteContainer: {
    backgroundColor: 'white',
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

export default PlaceListTileComponent
