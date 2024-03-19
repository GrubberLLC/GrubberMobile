
import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { UserContext } from '../../Context/UserContext';
import { ChevronsLeft, MapPin } from 'react-native-feather';
import ListPlaceTileComponent from '../../Components/Lists/ListPlaceTileComponent';
import ProfileFavoritesTile from '../../Components/Profile/ProfileFavoritesTile';
import ProfileListPlaceTileComponent from '../../Components/Profile/ProfileListPlaceTileComponent';
import PostGridComponent from '../../Components/Profile/PostGridComponent';
import ListGridComponent from '../../Components/Profile/ListGridComponent';


const UserProfileScreen  = ({route}) => {
  const {profile} = route.params
  const navigation = useNavigation()

  const {user} = useContext(UserContext)

  const [tabView, setTabView] = useState('post')

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [favorites, setFavorites] = useState([])
  const [lists, setLists] = useState([])

  const [relationship, setRelationship] = useState(null)

  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    grabFollowingCount(profile.user_id)
    grabFollowersCount(profile.user_id)
    getUserFavorites(profile.user_id)
    getRelatiobship(profile.user_id)
    getUserLists(profile.user_id)
    getuserPosts(profile.user_id)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (profile && profile.user_id) {
        grabFollowingCount(profile.user_id)
        grabFollowersCount(profile.user_id)
        getUserFavorites(profile.user_id)
        getRelatiobship(profile.user_id)
        getUserLists(profile.user_id)
        getuserPosts(profile.user_id)
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

  const getUserLists = (user_id: string) => {
    const url = `https://grubberapi.com/api/v1/lists/user/${user_id}`
    axios.get(url)
      .then(response => {
        setLists(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  };

  const removeFromFriends = (friend_id: any) => {
    let url = `https://grubberapi.com/api/v1/friends/${friend_id}`
    axios.delete(url)
      .then(response => {
        grabFollowingCount(profile.user_id)
        grabFollowersCount(profile.user_id)
        getUserFavorites(profile.user_id)
        getRelatiobship(profile.user_id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const addToFriends = (profile: any) => {
    const favoriteData = {
      follower_id: user.userId,
      following_id: profile.user_id,
      status: profile.public === 0 ? 'pending' : 'active'
    }
    let url = `https://grubberapi.com/api/v1/friends/`
    axios.post(url, favoriteData)
      .then(response => {
        profile.ppublic === 0 
          ? getRelatiobship(profile.user_id) 
          : createNewActivity(response.data.id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const createNewActivity = (friend_id: number) => {
    const activityUrl = `https://grubberapi.com/api/v1/activity/`; 
    const activityData = {
      user_id: user.userId,
      activity: `${user.username} is following ${profile.username}`,
      type: 'list',
      list_id: null,
      favorite_id: null,
      following_id: friend_id,
      comment_id: null,
      picture: profile.picture
    }
    axios.post(activityUrl, activityData)
      .then(response => {
        grabFollowingCount(profile.user_id)
        grabFollowersCount(profile.user_id)
        getUserFavorites(profile.user_id)
        getRelatiobship(profile.user_id)
      })
      .catch(error => {
        console.log('error adding member to list: ', error)
      })
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

  const grabFollowingCount = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/following-count/${user_id}`
    axios.get(url)
      .then(response => {
        setFollowers(response.data.length)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const grabFollowersCount = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/follower-count/${user_id}`
    axios.get(url)
      .then(response => {
        setFollowing(response.data.length)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getRelatiobship = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/friends/relation/${user.userId}/${user_id}`
    axios.get(url)
      .then(response => {
        response.data.length === 0
          ? null
          : setRelationship(response.data[0])
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* <View style={styles.header}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.manuIcon}>
              <ChevronsLeft style={{flex: 1}} height={28} width={28} color={'white'}/>
            </TouchableOpacity>
            <View>
              {
                relationship === null 
                  ? profile.public === 0
                      ? <TouchableOpacity onPress={() => {addToFriends(profile)}} style={styles.statusContainerRed}><Text style={styles.statusFollowing}>Follow</Text></TouchableOpacity>
                      : <TouchableOpacity onPress={() => {addToFriends(profile)}} style={styles.statusContainerRed}><Text style={styles.statusFollowing}>Follow</Text></TouchableOpacity>
                  : relationship.status === 'pending'
                      ? <TouchableOpacity onPress={() => {removeFromFriends(relationship.friend_id)}}  style={styles.statusContainer}><Text style={styles.statusFollowing}>Pending</Text></TouchableOpacity>
                      : <TouchableOpacity onPress={() => {removeFromFriends(relationship.friend_id)}} style={styles.statusContainer}><Text style={styles.statusFollowing}>Unfollow</Text></TouchableOpacity>
              }
            </View>
          </View>
        </View> */}
        <View style={styles.header}>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.diceImage}>
              <ChevronsLeft height={25} width={25} color={'white'}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>{profile.username}</Text>
        </View>
        <View style={styles.profileMainInfo}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: profile.profile_picture}}/>
          </View>
          <View style={styles.mainInfoContainer}>
            <View style={styles.namesSection}>
              <Text style={styles.standardUsername}>{profile.username}</Text>
              <View>
              {
                relationship === null 
                  ? profile.public === 0
                      ? <TouchableOpacity onPress={() => {addToFriends(profile)}} style={styles.statusContainerRed}><Text style={styles.statusFollowing}>Follow</Text></TouchableOpacity>
                      : <TouchableOpacity onPress={() => {addToFriends(profile)}} style={styles.statusContainerRed}><Text style={styles.statusFollowing}>Follow</Text></TouchableOpacity>
                  : relationship.status === 'pending'
                      ? <TouchableOpacity onPress={() => {removeFromFriends(relationship.friend_id)}}  style={styles.statusContainer}><Text style={styles.statusFollowing}>Pending</Text></TouchableOpacity>
                      : <TouchableOpacity onPress={() => {removeFromFriends(relationship.friend_id)}} style={styles.statusContainer}><Text style={styles.statusFollowing}>Unfollow</Text></TouchableOpacity>
              }
            </View>
            </View>
            <Text style={styles.standardInfoTextBottom}>{profile.full_name}</Text>
          </View>
        </View>
        {
          profile.bio 
            ? <View style={styles.quickSummary}>
                <Text style={styles.text}>
                  {profile.bio}
                </Text>
              </View>
            : null
        }
        <View style={styles.quickSummary}>
          <Text style={styles.value}>{following} <Text style={{fontWeight: '500'}}>Follwoing</Text></Text>
          <Text style={styles.text}>|</Text>
          <Text style={styles.value}>{followers} <Text style={{fontWeight: '500'}}>Followers</Text></Text>
        </View>
        <View style={styles.tabbedMenus}>
          {
            tabView === 'post'
              ? <View style={styles.selectionContainer}>
                  <View style={styles.tab}>
                    <Text style={styles.tabTextSelected}>Posts</Text>
                  </View>
                  <TouchableOpacity onPress={() => {setTabView('lists')}} style={styles.tab}>
                    <Text style={styles.tabText}>Lists</Text>
                  </TouchableOpacity>
                </View>
              : <View style={styles.selectionContainer}>
                  <TouchableOpacity onPress={() => {setTabView('post')}} style={styles.tab}>
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
            tabView === 'post'
              ? <View style={styles.specificContent}>
                  <PostGridComponent posts={allPosts}/>
                </View>
              : <View style={styles.specificContent}>
                  <ListGridComponent/>
                </View>
          }
        </ScrollView>
      </View>
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
    backgroundColor: '#2c2c2c',
    zIndex: 2,
  },
  manuIcon: {
    backgroundColor: 'rgba(200,200,200,.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 8
  },
  header: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
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
  subHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingHorizontal: 8,
  },
  namesSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusContainer: {
    backgroundColor: 'rgba(200,200,200,.4)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24
  },
  statusContainerRed: {
    backgroundColor: '#e94f4e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24
  },
  statusFollowing: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default UserProfileScreen
