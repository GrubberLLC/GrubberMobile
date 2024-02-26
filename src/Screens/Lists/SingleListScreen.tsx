import React, { useContext, useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, Dimensions, View, Image, TouchableOpacity } from 'react-native'
import { ChevronsLeft, Plus, Settings } from 'react-native-feather'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BASE_URL } from '@env'
import axios from 'axios'
import PlaceInListTileComponent from '../../Components/Lists/PlaceInListTileComponent'
import AddPlaceWithinListCompoent from '../../Components/Lists/AddPlaceWithinListCompoent'
import { UserContext } from '../../Context/UserContext'
import Dice from '../../Assets/casino.png'
import ShowRandomPlaceCompoenent from '../../Components/Lists/ShowRandomPlaceCompoenent'

const imageWidth = Dimensions.get('window').width 

const SingleListScreen = ({route}) => {
  const { list } = route.params
  const { user } = useContext(UserContext)

  const navigation = useNavigation()

  const [viewAddPlace, setViewAddPlace] = useState(false)
  const [listPlaces, setListPlaces] = useState([])

  const [listMembers, setListMembers] = useState([])

  const [randomPlace, setRandomPlace] = useState(null)
  const [viewRandomPlace, setViewRandomPlace] = useState(false)

  useEffect(() => {
    getListPlaces(list.list_id)
    getMembers(list.list_id)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        getListPlaces(list.list_id)
        getMembers(list.list_id)
      }
    }, [navigation])
  );

  const getListPlaces = (list_id: number) => {
    let url = `https://grubberapi.com/api/v1/placeInList/list/${list_id}`
    axios.get(url)
      .then(response => {
        setListPlaces(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getMembers = (list_id: number) => {
    const url = `https://grubberapi.com/api/v1/members/list/${list_id}`
    axios.get(url)
      .then(response => {
        setListMembers(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const pickRandomPlace = () => {
    if (listPlaces.length > 0) {
      const randomIndex = Math.floor(Math.random() * listPlaces.length);
      setRandomPlace(listPlaces[randomIndex]);
      setViewRandomPlace(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: list.picture}}/>
        <View style={styles.overlay}></View>
      </View>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.iconContainer}>
            <ChevronsLeft style={styles.icon} height={30} width={30} color={'white'}/>
          </TouchableOpacity>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {pickRandomPlace()}} style={styles.imageIconContainer}>
              <Image source={Dice} height={30} width={30}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setViewAddPlace(!viewAddPlace)}} style={styles.iconContainerLeft}>
              <Plus style={styles.icon} height={30} width={30} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('ListDetailsPage', {list: list})}} style={styles.iconContainer}>
              <Settings style={styles.icon} height={30} width={30} color={'white'}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomSetion}>
          <Text style={styles.name}>{list.name}</Text>
          <Text style={styles.description}>{list.description}</Text>
        </View>
      </View>
      <View style={styles.contentList}>
        {
          listPlaces.length > 0
            ? <ScrollView>
                {
                  listPlaces.map((place) => {
                    return(
                      <View style={{padding: 16, paddingBottom: 0}}>
                        <PlaceInListTileComponent item={place}/>
                      </View>
                    )
                  }) 
                }
              </ScrollView>
            : <View style={styles.noPlace}><Text style={styles.noPlaceText}>No Places In List...</Text></View>
        }
      </View>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={viewAddPlace}
      >
        <AddPlaceWithinListCompoent setViewAddList={setViewAddPlace} viewAddList={viewAddPlace} list={list} getListPlaces={getListPlaces}/>
      </Modal>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={viewRandomPlace}
      >
        <ShowRandomPlaceCompoenent setViewRandomPlace={setViewRandomPlace} viewRandomPlace={viewRandomPlace} place={randomPlace}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'black',
    borderRadius: 12,
    marginTop: 8
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    zIndex: 3,
    backgroundColor: 'black'
  },
  overlay: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'rgba(20, 20, 20,.5)',
    zIndex: 4
  },
  header: {
    width: '100%',
    height: imageWidth - 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  topBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 16,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(200,200,200,.5)'
  },
  iconContainerLeft: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(200,200,200,.5)',
    marginRight: 8
  },
  imageIconContainer: {
    padding: 12,
    paddingLeft: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(200,200,200,.5)',
    marginRight: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSetion: {
    width: '100%',
    padding: 16
  },
  name: {
    fontSize: 24, 
    color: 'white',
    marginBottom: 12,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: 'white'
  },
  contentList: {
    flex: 1,
    backgroundColor: '#c2c2c2',
    overflow: 'hidden',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  noPlace: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noPlaceText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default SingleListScreen
