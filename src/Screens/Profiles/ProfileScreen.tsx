
import React, { useContext, useEffect, useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { UserContext } from '../../Context/UserContext';
import { ChevronsLeft, MapPin, Settings } from 'react-native-feather';
import { ListContext } from '../../Context/ListContext';
import ListPlaceTileComponent from '../../Components/Lists/ListPlaceTileComponent';
import ProfileFavoritesTile from '../../Components/Profile/ProfileFavoritesTile';
import UserListComponent from '../../Components/Profile/UserListComponent';
import PostGridComponent from '../../Components/Profile/PostGridComponent';
import ListGridComponent from '../../Components/Profile/ListGridComponent';


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

  const [allPosts, setAllPosts] = useState([])

  const [tabView, setTabView] = useState('posts')

  useEffect(() => {
    grabFollowingCount()
    grabFollowersCount()
    getUserFavorites(user.userId)
    getuserPosts(user.userId)
    getUserLists(user.userId)
  }, [])

  
  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        grabFollowingCount()
        grabFollowersCount()
        getUserFavorites(user.userId)
        getuserPosts(user.userId)
        getUserLists(user.userId)
      }
    }, [navigation])
  );
    
  const getuserPosts = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/user/${user.userId}`
    axios.get(url)
      .then(response => {
        setAllPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }



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
      <View style={styles.header}>
        <Text style={styles.headerText}>{profile.username}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {navigation.navigate('SettingsScreen')}} style={styles.diceImage}>
            <Settings height={25} width={25} color={'white'}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.profileMainInfo}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: profile.profile_picture}}/>
          </View>
          <View style={styles.mainInfoContainer}>
            <Text style={styles.standardUsername}>{profile.username}</Text>
            <Text style={styles.standardInfoTextBottom}>{profile.full_name}</Text>
          </View>
        </View>
        <View style={styles.quickSummary}>
          <Text style={styles.text}>
            {profile.bio}
          </Text>
        </View>
        <View style={styles.quickSummary}>
          <TouchableOpacity onPress={() => {setShowFollowing(!showFollowing)}}><Text style={styles.value}>{followingCount} <Text style={{fontWeight: '500'}}>Follwoing</Text></Text></TouchableOpacity>
          <Text style={styles.text}>|</Text>
          <TouchableOpacity onPress={() => {setShowFollowers(!showFollowers)}}><Text style={styles.value}>{followerCount} <Text style={{fontWeight: '500'}}>Followers</Text></Text></TouchableOpacity>
        </View>
        <View style={styles.tabbedMenus}>
          {
            tabView === 'posts'
              ? <View style={styles.selectionContainer}>
                  <View style={styles.tab}>
                    <Text style={styles.tabTextSelected}>Posts</Text>
                  </View>
                  <TouchableOpacity onPress={() => {setTabView('lists')}} style={styles.tab}>
                    <Text style={styles.tabText}>Lists</Text>
                  </TouchableOpacity>
                </View>
              : <View style={styles.selectionContainer}>
                  <TouchableOpacity onPress={() => {setTabView('posts')}} style={styles.tab}>
                    <Text style={styles.tabText}>Posts</Text>
                  </TouchableOpacity>
                  <View style={styles.tab}>
                    <Text style={styles.tabTextSelected}>Lists</Text>
                  </View>
                </View>
          }
        </View>
        <ScrollView style={styles.tabSection}>
          {
            tabView === 'posts'
              ? <View style={styles.specificContent}>
                  <PostGridComponent posts={allPosts}/>
                </View>
              : <View style={styles.specificContent}>
                  <ListGridComponent/>
                </View>
          }
        </ScrollView>
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
    backgroundColor: '#2d2d2d',
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
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  post: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    padding: 8
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    height: 75,
    width: 75,
    backgroundColor:'grey',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white'
  },
  profileMainInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16
  },
  mainInfoContainer:{
    flex: 1,
    marginLeft: 16
  },
  standardInfoText: {
    fontSize: 18,
    color: 'white'
  },
  standardInfoTextBottom: {
    fontSize: 18,
    color: 'white',
    marginTop: 12
  },
  standardUsername: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  quickSummary: {
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8
  },
  value: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 6
  },
  tabbedMenus: {
    marginTop: 18,
    paddingHorizontal: 16
  },
  specificContent: {
    flex: 1,
    marginTop: 8,
  },
  selectionContainer: {
    width: '100%',
    backgroundColor: '#4d4d4d',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  tab: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    paddingVertical: 8,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#4d4d4d',
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    color: 'white'
  },
  tabTextSelected: {
    paddingVertical: 8,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'grey',
    textAlign: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    color: 'white'
  },
  tabSection: {
    marginTop: 16,
    paddingHorizontal: 8
  },
})

export default ProfileScreen
