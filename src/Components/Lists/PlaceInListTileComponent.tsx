import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MessageSquare, Star } from 'react-native-feather'

const imageWidth = Dimensions.get('window').width - 32

const PlaceInListTileComponent = (props) => {
  const {item} = props

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
    <TouchableOpacity onPress={() => {navigation.navigate('SinglePlaceScreen', {place: item})}} style={styles.container}>
      <Image style={styles.listImage} source={{uri: item.picture}}/>
      <View style={styles.overlay}></View>
      <View style={styles.info}>
        <View style={styles.infoTopBar}>
          <Text style={styles.name}>{limitStringSize(item.name)}</Text>
        </View>
        <Text style={styles.activity}>{item.address_formatted}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailsRowLeft}>
            <Star style={{marginRight: 4}} height={18} width={18} fill={'#e94f4e'} color={'#e94f4e'}/>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.address}>({item.review_count} reviews)</Text>
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
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12
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
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  info: {
    padding: 16
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
    fontWeight: 'bold'
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e94f4e'
  },
  activity: {
    fontSize: 18,
    fontWeight: '600',
    color: 'grey'
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
    color: 'black',
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

export default PlaceInListTileComponent
