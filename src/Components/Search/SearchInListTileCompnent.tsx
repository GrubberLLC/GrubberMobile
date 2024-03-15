import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MessageSquare, Star } from 'react-native-feather'

const imageWidth = Dimensions.get('window').width - 16

const SearchInListTileCompnent = (props) => {
  const {place} = props

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

  function limitStringSize(str: string, maxLength = 22) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('SearchPlaceScreen', {place: place})}} style={styles.container}>
      <Image style={styles.listImage} source={{uri: place.image_url}}/>
      <View style={styles.overlay}></View>
      <View style={styles.info}>
        <View style={styles.infoTopBar}>
          <Text style={styles.name}>{limitStringSize(place.name)}</Text>
        </View>
        <Text style={styles.activity}>{place.location.address1} {place.location.city}, {place.location.state} {place.location.zip_code}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailsRowLeft}>
            <Star style={{marginRight: 4}} height={18} width={18} fill={'#e94f4e'} color={'#e94f4e'}/>
            <Text style={styles.rating}>{place.rating}/5</Text>
            <Text style={styles.address}>({place.review_count} reviews)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#2c2c2c',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 18
  },
  listImage: {
    width: imageWidth,
    height: imageWidth - 150,
    backgroundColor: 'red'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageWidth,
    height: imageWidth - 150,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  info: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: '#4d4d4d'
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
  address: {
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

export default SearchInListTileCompnent
