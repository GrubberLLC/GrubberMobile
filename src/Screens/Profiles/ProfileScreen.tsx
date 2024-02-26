
import React, { useContext, useEffect, useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { UserContext } from '../../Context/UserContext';
import { MapPin, Settings } from 'react-native-feather';
import { ListContext } from '../../Context/ListContext';
import ListPlaceTileComponent from '../../Components/Lists/ListPlaceTileComponent';
import ProfileFavoritesTile from '../../Components/Profile/ProfileFavoritesTile';
import UserListComponent from '../../Components/Profile/UserListComponent';


const ProfileScreen  = () => {
  const navigation = useNavigation()

  const { user, profile } = useContext(UserContext)
  const { getUserLists, userLists } = useContext(ListContext)

  const [followingCount, setFollowingCount] = useState(0)
  const [followerCount, setFollowersCount] = useState(0)
  const [favorites, setFavorites] = useState([])

  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  const [tabView, setTabView] = useState('lists')

  useEffect(() => {
    grabFollowingCount()
    grabFollowersCount()
    getUserFavorites(user.userId)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        grabFollowingCount()
        grabFollowersCount()
        getUserFavorites(user.userId)
      }
    }, [navigation])
  );

  const getUserFavorites = (user_id: string) => {
    setFavorites([])
    console.log(user_id)
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

  const grabFollowingCount = () => {
    let url = `https://grubberapi.com/api/v1/friends/following-count/${user.userId}`
    axios.get(url)
      .then(response => {
        setFollowers(response.data)
        setFollowersCount(response.data.length)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabFollowersCount = () => {
    let url = `https://grubberapi.com/api/v1/friends/follower-count/${user.userId}`
    axios.get(url)
      .then(response => {
        setFollowing(response.data)
        setFollowingCount(response.data.length)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeaderBottom}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: profile.profile_picture}}/>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <View></View>
            <TouchableOpacity onPress={() => {navigation.navigate('SettingsScreen')}} style={styles.manuIcon}>
              <Settings style={{flex: 1}} height={28} width={28} color={'white'}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topRow}>
          <Text style={styles.name}>{profile.first_name} {profile.last_name}</Text>
        </View>
        <View style={styles.subRow}>
          <Text style={styles.info}>{profile.username}</Text>
          <View style={styles.subRow}>
            <MapPin style={{marginRight: 4}} height={16} width={16} color={'#e94f4e'}/>
            <Text style={styles.info}>{profile.location}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {setShowFollowers(!showFollowers)}}><Text style={styles.info}><Text style={{color: '#e94f4e', fontWeight: 'bold'}}>{followerCount}</Text> Followers</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => {setShowFollowing(!showFollowing)}}><Text style={[styles.info, {marginLeft: 18}]}><Text style={{color: '#e94f4e', fontWeight: 'bold'}}>{followingCount}</Text> Following</Text></TouchableOpacity>
        </View>
        <View style={styles.optionRow}>
          <View style={styles.optionSelect}>
            {
              tabView === 'lists'
                ? <View style={styles.optionSelected}>
                    <Text style={[styles.optionText, {color: '#e94f4e'}]}>Lists</Text>
                  </View>
                : <TouchableOpacity onPress={() => {setTabView('lists')}} style={styles.option}>
                    <Text style={styles.optionText}>Lists</Text>
                  </TouchableOpacity>
            }
            {
              tabView === 'lists'
                ? <TouchableOpacity onPress={() => {setTabView('favorites')}} style={styles.option}>
                    <Text style={styles.optionText}>Favorites</Text>
                  </TouchableOpacity>
                : <View style={styles.optionSelected}>
                    <Text style={[styles.optionText, {color: '#e94f4e'}]}>Favorites</Text>
                  </View>
            }
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView style={styles.scroll}>
            {
              tabView === 'lists'
                ? userLists.map((list) => {
                    return(
                      <View>
                        <ListPlaceTileComponent item={list}/>
                      </View>
                    )
                  })
                : favorites.map((list) => {
                    return(
                      <View>
                        <ProfileFavoritesTile place={list}/>
                      </View>
                    )
                  })
            }
          </ScrollView>
        </View>
      </View>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={showFollowers}
      >
        {/* <CreateListComponent viewAddList={viewAddList} setViewAddList={setViewAddList}/> */}
        <UserListComponent setFunction={setShowFollowers} view={showFollowers} tab={'Followers'} list={followers} getFriends={grabFollowersCount}/>
      </Modal>

      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={showFollowing}
      >
        {/* <CreateListComponent viewAddList={viewAddList} setViewAddList={setViewAddList}/> */}
        <UserListComponent setFunction={setShowFollowing} view={showFollowing} tab={'Following'} list={following} getFriends={grabFollowingCount}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    zIndex: 1
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    zIndex: 2,
  },
  manuIcon: {
    backgroundColor: 'rgba(200,200,200,.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 8
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  subHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: 'black',
    paddingBottom: 100,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24
  },
  subHeaderBottom: {
    position: 'absolute',
    top: 110,
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 10
  },
  imageContainer: {
    height: 100,
    width: 100,
    backgroundColor:'grey',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  image: {
    height: 100, 
    width: 100, 
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white'
  },
  topRow: {
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 56
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  row: {
    width: '100%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4
  },
  subRow: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 4,
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    fontSize: 20,
    fontWeight: '500',
    color: 'grey'
  },
  optionRow: {
    marginTop: 16,
    paddingHorizontal: 16,
    width: '100%'
  },
  optionSelect: {
    backgroundColor:'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 32
  },
  optionSelected: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#e94f4e',
    borderRadius: 30,
    backgroundColor: '#FFF4F4'
  },
  option: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
  },
  optionText: {
    fontSize: 22,
    paddingVertical: 8,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 16,
    flex: 1,
    paddingHorizontal: 16,
  },
  scroll: {
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'lightgrey',
    borderRadius: 12,
    paddingVertical: 16
  }
})

export default ProfileScreen
