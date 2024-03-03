import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const imageWidth = Dimensions.get('window').width - 32

const ProfileListPlaceTileComponent = (props) => {
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

  function limitStringSize(str: string, maxLength = 25) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  function limitDescriptionStringSize(str: string, maxLength = 22) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('ProfileSingleListScreen', {list: item})}} style={styles.container}>
      <Image style={styles.listImage} source={{uri: item.picture}}/>
      <View style={styles.overlay}></View>
      <View style={styles.info}>
        <View style={styles.infoTopBar}>
          <Text style={styles.name}>{limitStringSize(item.name)}</Text>
        </View>
        <View style={styles.infoBottomBar}>
          <Text style={styles.activity}>{limitDescriptionStringSize(item.last_activity)}</Text>
          <Text style={styles.item}>{convertDateToDaysOrHours(item.created_at)}</Text>
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
    height: imageWidth - 140,
    backgroundColor: 'red'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageWidth,
    height: imageWidth - 140,
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
  infoBottomBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'grey',
    overflow: 'hidden'
  }
})

export default ProfileListPlaceTileComponent
