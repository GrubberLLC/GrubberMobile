
import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { UserContext } from '../../Context/UserContext';
import { ChevronsLeft, MapPin } from 'react-native-feather';
import ListPlaceTileComponent from '../../Components/Lists/ListPlaceTileComponent';
import ProfileFavoritesTile from '../../Components/Profile/ProfileFavoritesTile';
import ActivityListPlaceTileComponent from '../../Components/Activity/ActivityListPlaceTileComponent';


const ActivityUserProfileScreen  = ({route}) => {
  const {profile} = route.params
  const navigation = useNavigation()

  const {user} = useContext(UserContext)

  const [tabView, setTabView] = useState('favorites')

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [favorites, setFavorites] = useState([])
  const [lists, setLists] = useState([])

  const [relationship, setRelationship] = useState(null)

  useEffect(() => {
    grabFollowingCount(profile.user_id)
    grabFollowersCount(profile.user_id)
    getUserFavorites(profile.user_id)
    getRelatiobship(profile.user_id)
    getUserLists(profile.user_id)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (profile && profile.user_id) {
        grabFollowingCount(profile.user_id)
        grabFollowersCount(profile.user_id)
        getUserFavorites(profile.user_id)
        getRelatiobship(profile.user_id)
        getUserLists(profile.user_id)
      }
    }, [navigation])
  );

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
      <View style={styles.subHeaderBottom}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: profile.profile_picture}}/>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.header}>
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
          <Text style={styles.info}><Text style={{color: '#e94f4e', fontWeight: 'bold'}}>{followers}</Text> Followers</Text>
          <Text style={[styles.info, {marginLeft: 18}]}><Text style={{color: '#e94f4e', fontWeight: 'bold'}}>{following}</Text> Following</Text>
        </View>
        {
          relationship === null 
            ? profile.public === 0 
              ? <View style={styles.private}><Text style={styles.privateText}>Account Is Private...</Text></View>
              : <View><View style={styles.optionRow}>
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
                        ? lists.length > 0
                            ? lists.map((list) => {
                                return(
                                  <View>
                                    <ListPlaceTileComponent item={list}/>
                                  </View>
                                )
                              })
                            : <View style={styles.empty}><Text style={styles.emptyText}>No Lists...</Text></View>
                        : favorites.length > 0
                            ? favorites.map((list) => {
                                return(
                                  <View>
                                    <ProfileFavoritesTile place={list}/>
                                  </View>
                                )
                              })
                            : <View style={styles.empty}><Text style={styles.emptyText}>No Favorites...</Text></View>
                    }
                  </ScrollView>
                </View>
              </View>
            : relationship.status === 'pending'
                ? profile.public === 0
                    ? <View style={styles.private}><Text style={styles.privateText}>Account Is Private...</Text></View>
                    : <View>
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
                                ? lists.length > 0
                                    ? lists.map((list) => {
                                        return(
                                          <View>
                                            <ListPlaceTileComponent item={list}/>
                                          </View>
                                        )
                                      })
                                    : <View style={styles.empty}><Text style={styles.emptyText}>No Lists...</Text></View>
                                : favorites.length > 0
                                    ? favorites.map((list) => {
                                        return(
                                          <View>
                                            <ProfileFavoritesTile place={list}/>
                                          </View>
                                        )
                                      })
                                    : <View style={styles.empty}><Text style={styles.emptyText}>No Favorites...</Text></View>
                            }
                          </ScrollView>
                        </View>
                      </View>
                : <View style={styles.fullController}>
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
                            ? lists.length > 0
                                ? lists.map((list) => {
                                    return(
                                      <View>
                                        <ActivityListPlaceTileComponent item={list}/>
                                      </View>
                                    )
                                  })
                                : <View style={styles.empty}><Text style={styles.emptyText}>No Lists...</Text></View>
                            : favorites.length > 0
                                ? favorites.map((list) => {
                                    return(
                                      <View>
                                        <ProfileFavoritesTile place={list}/>
                                      </View>
                                    )
                                  })
                                : <View style={styles.empty}><Text style={styles.emptyText}>No Favorites...</Text></View>
                        }
                      </ScrollView>
                    </View>
                  </View>

        }
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
    backgroundColor: '#f0f0f0',
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
  fullController: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  scroll: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  empty: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50
  },
  private: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privateText: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default ActivityUserProfileScreen
