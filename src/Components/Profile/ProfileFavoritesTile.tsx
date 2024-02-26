import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { MessageSquare, Star } from 'react-native-feather'

const imageWidth = Dimensions.get('window').width - 24

const ProfileFavoritesTile = (props) => {
  const {place} = props

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: place.picture}}/>
      </View>
      <View style={styles.detailsContainter}>
        <View style={styles.detailsRow}>
          <Text style={styles.name}>{place.name}</Text>
          <Text style={styles.price}>{place.price}</Text>
        </View>
        <View style={styles.detailsRowLeft}>
          <Text style={styles.address}>{place.address_formatted}</Text>
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
    </View>
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

export default ProfileFavoritesTile
