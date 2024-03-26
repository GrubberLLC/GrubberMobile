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
import ProfilePlaceInListComponent from '../../Components/Profile/ProfilePlaceInListComponent'

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

  function truncateString(str: string, maxLength = 20) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <ChevronsLeft height={26} width={26} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{truncateString(list.name)}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.diceImage} onPress={() => {pickRandomPlace()}}>
            <Image source={Dice} style={styles.diceImage}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setViewAddPlace(!viewAddPlace)}}>
            <Plus style={styles.icon} height={30} width={30} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('ProfielListDetails', {list: list})}} >
            <Settings style={styles.icon} height={22} width={22} color={'white'}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: '#2c2c2c', flex: 1, paddingVertical: 16, paddingHorizontal: 8}}>
        {/* <View style={styles.mainImageContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: list.picture}}  style={styles.mainIMage}/>
            <View style={styles.overlay}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>{list.name}</Text>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>{list.description}</Text>
            </View>
          </View>
        </View> */}
        {/* <View style={styles.contentList}> */}
          {
            listPlaces.length > 0
              ? <ScrollView>
                  {
                    listPlaces.map((place) => {
                      return(
                        <View style={{marginBottom: 16}}>
                          <ProfilePlaceInListComponent item={place}/>
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
      {/* </View> */}
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
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeader: {
    width: '100%',
    paddingHorizontal: 18
  },
  icon: {
    marginLeft: 12
  },
  diceImage: {
    height: 25,
    width: 25
  },
  mainImageContainer: {
    width: imageWidth - 16,
    height: imageWidth - 140,
  },
  imageContainer: {
    width: imageWidth - 16,
    height: imageWidth - 140,
  },
  mainIMage: {
    width: imageWidth - 16,
    height: imageWidth - 140,
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    width: imageWidth - 16,
    height: imageWidth - 140,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 16
  },
  contentList: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    overflow: 'hidden',
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
  },
})

export default SingleListScreen
