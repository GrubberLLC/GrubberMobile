import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ChevronsLeft, Plus } from 'react-native-feather'
import { UserContext } from '../../Context/UserContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FriendRequestComponent from '../../Components/Activity/FriendRequestComponent';
import RequestGroupComponent from '../../Components/Activity/RequestGroupComponent';

const NotificationsScreen = () => {
  const navigation = useNavigation()

  const {user} = useContext(UserContext)

  const [friendsRequests, setFriendReqeuests] = useState([])
  const [groupRequests, setGroupRequests] = useState([])

  useEffect(() => {
    grabFriendRequests()
    grabGroupRequests()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        grabFriendRequests()
        grabGroupRequests()
      }
    }, [navigation])
  );

  const grabGroupRequests = () => {
    const url = `https://grubberapi.com/api/v1/members/list/pending/${user.userId}`
    axios.get(url)
      .then(response => {
        setGroupRequests(response.data)
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

  const grabFriendRequests = () => {
    const url = `https://grubberapi.com/api/v1/friends/following/${user.userId}`
    axios.get(url)
      .then(response => {
        setFriendReqeuests(response.data)
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
        grabFriendRequests()
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const acceptFriendRequest = (member: any) => {
    const url = `https://grubberapi.com/api/v1/friends/accept/${member.friend_id}`
    axios.put(url)
      .then(response => {
        grabFriendRequests()
        // createNewActivity(member, user.username, member.friend_id)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <ChevronsLeft style={{marginRight: 12}} height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.requestHeader}>
          <Text style={styles.headerText}>Friend Requests</Text>
        </View>
        {
          friendsRequests.length > 0
            ? <ScrollView style={styles.requestContainer}>
                {
                  friendsRequests.map((item) => {
                    return(
                      <View>
                        <FriendRequestComponent member={item} acceptFriendRequest={acceptFriendRequest} rejectFriendRequest={rejectFriendRequest}/>
                      </View>
                    )
                  })
                }
              </ScrollView>
            : null
        }
        <View style={styles.requestHeader}>
          <Text style={styles.headerText}>Group Requests</Text>
        </View>
        {
          groupRequests.length > 0
            ? <ScrollView style={styles.requestContainer}>
                {
                  groupRequests.map((item) => {
                    return(
                      <View>
                        <RequestGroupComponent member={item} acceptMemberRequest={acceptMemberRequest}/>
                      </View>
                    )
                  })
                }
              </ScrollView>
            : null
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 14,
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
  content: {
    flex: 1,
    backgroundColor: '#2c2c2c'
  },
  requestHeader: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  requestContainer: {
    width: '100%',
    paddingHorizontal: 16
  }
})

export default NotificationsScreen
