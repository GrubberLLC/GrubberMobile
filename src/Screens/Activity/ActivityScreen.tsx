
import React, { useContext, useEffect, useState } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { UserContext } from '../../Context/UserContext';
import { Check, X } from 'react-native-feather';
import RequestGroupComponent from '../../Components/Activity/RequestGroupComponent';
import InputFieldComponent from '../../Components/General/InputFieldComponent';
import FriendRequestComponent from '../../Components/Activity/FriendRequestComponent';
import ActivtyComponent from '../../Components/Activity/ActivtyComponent';


const ActivityScreen = () => {
  const navigation = useNavigation()

  const { user, profile } = useContext(UserContext)

  const [viewRequeset, setViewRequest] = useState('friends')
  const [members, setMembers] = useState([])
  const [friends, setFriends] = useState([])

  const [following, setFollowing] = useState([])
  const [followRequest, setFollowRequest] = useState([])

  const [searchUser, setSearchUser] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [viewActivity, setViewActivity] = useState('personal')
  const [activities, setActivities] = useState([])

  useEffect(() => {
    grabGroupRequests()
    grabFollowing()
    grabFriendRequests()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        grabGroupRequests()
        grabFollowing()
        grabFriendRequests()
      }
    }, [navigation])
  );

  const updateSearchUser = (text: string) => {
    searchForusers(text)
    setSearchUser(text)
  }

  const searchForusers = (text: string) => {
    const url = `https://grubberapi.com/api/v1/profiles/search/${text}`
    console.log(url)
    axios.get(url)
      .then(response => {
        setSearchResults(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const sendFriendRequest = (person: any) => {
    console.log(person)
    const url = `https://grubberapi.com/api/v1/friends/`
    const friendData = {
      follower_id: user.userId,
      following_id: person.user_id,
      status: person.public ? 'active' : 'pending'
    }
    axios.post(url, friendData)
      .then(response => {
        console.log(response.data)
        if(person.public){
          createNewActivity(profile, person.username, response.data.id)
        } else {
          grabFollowing()
          grabFriendRequests()
        }
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const grabGroupRequests = () => {
    const url = `https://grubberapi.com/api/v1/members/${user.userId}`
    axios.get(url)
      .then(response => {
        setMembers(response.data)
      })
      .catch(error => {
        console.error('Error fetching members:', error);
        throw error;
      });
  }

  const acceptMemberRequest = (member_id: number) => {
    const url = `https://grubberapi.com/api/v1/members/request/${member_id}`
    axios.put(url)
      .then(response => {
        grabGroupRequests()
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const rejectFriendRequest = (friend_id: number) => {
    const url = `https://grubberapi.com/api/v1/friends/${friend_id}`
    axios.delete(url)
      .then(response => {
        grabFollowing()
        grabFriendRequests()
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const acceptFriendRequest = (member: any) => {
    console.log(JSON.stringify(member))
    const url = `https://grubberapi.com/api/v1/friends/accept/${member.friend_id}`
    axios.put(url)
      .then(response => {
        createNewActivity(member, user.username, member.friend_id)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const grabFollowing = () => {
    const url = `https://grubberapi.com/api/v1/friends/follower/${user.userId}`
    console.log(url)
    axios.get(url)
      .then(response => {
        setFollowing(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const grabFriendRequests = () => {
    const url = `https://grubberapi.com/api/v1/friends/following/${user.userId}`
    axios.get(url)
      .then(response => {
        console.log(response.data)
        setFollowRequest(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const getFollowStatus = (profileUserId) => {
    const followInfo = following.find(f => f.following_id === profileUserId);
    return followInfo ? followInfo.status : null;
  };

  const grabuserActivity = () => {
    const url = `https://grubberapi.com/api/v1/activity/user/${user.userId}`
    axios.get(url)
      .then(response => {
        console.log(response.data)
        setActivities(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const createNewActivity = (follower: string, following: string, follow_id: number) => {
    let url = `https://grubberapi.com/api/v1/activity/`
    const favoritesData = {
      user_id: user.userId,
      activity: `${follower.username} is following ${following}`,
      type: 'friend',
      list_id: null,
      favorite_id: null,
      following_id: follow_id,
      comment_id: null,
      picture: members.picture
    }
    axios.post(url, favoritesData)
      .then(response => {
        grabFollowing()
        grabFriendRequests()
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Activity</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputHeader}>
          <InputFieldComponent 
            label='Search'
            value={searchUser}
            handleFunction={updateSearchUser}
            secure={false}
            palceholder={'search username...'}
          />
          {
            searchResults.length > 0
              ? <ScrollView style={styles.scroll}>
                  {
                    searchResults.map((profile) => {
                      const followStatus = getFollowStatus(profile.user_id);
                      console.log(user.userId)
                      return(
                        <TouchableOpacity onPress={() => {navigation.navigate('UserProfileScreen', {profile: profile})}} style={styles.profile}>
                          <View style={styles.profileSection}>
                            <View style={styles.profilePicture}>
                              <Image style={styles.profilePicture} source={{uri: profile.profile_picture}}/>
                            </View>
                          </View>
                          <View style={styles.profileNames}>
                            <Text style={styles.username}>{profile.username}</Text>
                            <Text style={styles.profilename}>{profile.full_name}</Text>
                          </View>
                          {/* {!alreadyAMember && (
                            <TouchableOpacity style={styles.removeContainer}>
                              <Text style={styles.remove}>Add</Text>
                            </TouchableOpacity>
                          )} */}
                          {
                            profile.user_id === user.userId ? null : (
                              followStatus === "pending" 
                                ? (
                                    <Text style={styles.pending}>Pending</Text>
                                  ) 
                                : followStatus === "active" 
                                    ? <Text style={styles.friend}>Following</Text> 
                                    : (
                                        <TouchableOpacity onPress={() => sendFriendRequest(profile)} style={styles.addContainer}>
                                          <Text style={styles.add}>Add</Text>
                                        </TouchableOpacity>
                                      )
                            )
                          }
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              : null
          }
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Requests</Text>
        </View>
        {
          viewRequeset === 'friends'
            ? <View style={styles.requestContainer}>
                <Text style={styles.requestTabSelected}>{`Friends ${followRequest.length}`}</Text>
                <TouchableOpacity onPress={() => {setViewRequest('groups')}}>
                  <Text style={styles.requestTab}>{`Groups ${members.length}`}</Text>
                </TouchableOpacity>
              </View>
            : <View style={styles.requestContainer}>
                <TouchableOpacity onPress={() => {setViewRequest('friends')}}>
                  <Text style={styles.requestTab}>{`Friends ${followRequest.length}`}</Text>
                </TouchableOpacity>
                <Text style={styles.requestTabSelected}>{`Groups ${members.length}`}</Text>
              </View>
        }
        <View style={styles.requestContent}>
          {
            viewRequeset === 'friends'
              ? followRequest.length > 0 
                  ? <ScrollView>
                      {
                        followRequest.map((member) => {
                            return(
                              <View>
                                <FriendRequestComponent member={member} rejectFriendRequest={rejectFriendRequest} acceptFriendRequest={acceptFriendRequest}/>
                              </View>
                            )
                        })
                      }
                    </ScrollView>
                  : null 
              : members.length > 0 
                  ? <ScrollView>
                      {
                        members.map((member) => {
                          if(member.type === 'pending'){
                            console.log(member)
                            return(
                              <View>
                                <RequestGroupComponent member={member} acceptMemberRequest={acceptMemberRequest}/>
                              </View>
                            )
                          }
                        })
                      }
                    </ScrollView>
                  : null
          }
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Recent Activity</Text>
        </View>
        {
          viewActivity === 'all'
            ? <View style={styles.requestContainer}>
                <TouchableOpacity onPress={() => {setViewActivity('personal')}}>
                  <Text style={styles.requestTab}>Yours</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setViewActivity('following')}}>
                  <Text style={styles.requestTab}>Following</Text>
                </TouchableOpacity>
              </View>
            : null
        }
        {
          viewActivity === 'personal'
            ? <View style={styles.requestContainer}>
                <Text style={styles.requestTabSelected}>Yours</Text>
                <TouchableOpacity onPress={() => {setViewActivity('following')}}>
                  <Text style={styles.requestTab}>Following</Text>
                </TouchableOpacity>
              </View>
            : null
        }
        {
          viewActivity === 'following'
            ? <View style={styles.requestContainer}>
                <TouchableOpacity onPress={() => {setViewActivity('personal')}}>
                  <Text style={styles.requestTab}>Yours</Text>
                </TouchableOpacity>
                <Text style={styles.requestTabSelected}>Following</Text>
              </View>
            : null
        }
        <View style={styles.activityContent}>
          {
            viewActivity === 'personal'
              ? activities.length > 0
                  ? <ScrollView style={styles.activityScroll}>
                      {
                        activities.map(activity => {
                          return(
                            <View><ActivtyComponent activity={activity}/></View>
                          )
                        })
                      }
                    </ScrollView>
                  : null
              : null
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    paddingBottom: 4
  },
  title: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  inputHeader: {
    marginBottom: 12
  },
  subHeaderText: {
    fontWeight: 'bold',
    fontSize: 22
  },
  scroll: {
    marginTop: 12,
    width: '100%',
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 8
  },
  requestContainer: {
    marginTop: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  requestTab: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 8,
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18
  },
  requestTabSelected: {
    padding: 10,
    backgroundColor: '#e94f4e',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  requestContent: {
    marginVertical: 12,
    width: '100%',
    backgroundColor: 'grey'
  },
  activityContent: {
    flex: 1,
    marginTop: 16,
    width: '100%',
  },
  profile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  profilePicture: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor:'#e94f4e',
    marginRight: 12,
    overflow: 'hidden'
  },
  profileNames: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilename: {
    fontSize: 16,
    marginTop: 2
  },
  removeContainer: {
    borderRadius: 32 ,
    backgroundColor: '#e94f4e',
    padding: 6
  },
  remove: {
    color: 'white',
    height: 32,
    padding: 8
  },
  modal: {
    backgroundColor: 'lightgrey'
  },
  selection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rejectRequest: {
    backgroundColor: 'lightgrey',
    padding: 4,
    borderRadius: 20
  },
  acceptRequest: {
    backgroundColor: '#e94f4e',
    padding: 4,
    borderRadius: 20,
    marginLeft: 8
  },
  pending: {
    backgroundColor: 'lightgrey',
    padding: 12,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'black'
  },
  add: {
    backgroundColor: '#e94f4e',
    padding: 12,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'white'
  },
  friend: {
    overflow: 'hidden',
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#e94f4e'
  },
  activityScroll: {
    flex: 1
  }
})

export default ActivityScreen
