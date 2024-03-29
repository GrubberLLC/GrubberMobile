import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { X } from 'react-native-feather'
import { BASE_URL } from '@env';
import axios from 'axios'


const UserListComponent = (props) => {
  const {  setFunction, view, tab, list, getFriends } = props

  const removeFriends = (friend_id: number) => {
    const url = `https://grubberapi.com/api/v1/friends/${friend_id}`
    axios.delete(url)
      .then(response => {
        getFriends()
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{tab}</Text>
          <TouchableOpacity onPress={() => {setFunction(!view)}}>
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.mainContent}>
          {
            list.length === 0 
              ? <View><Text>No {tab}</Text></View>
              : <View style={styles.list}>
                  {
                    list.map((profile) => {
                      return(
                        <View style={styles.profile}>
                          <View style={styles.profileSections}>
                            <View style={styles.profilePicture}>
                              <Image style={styles.profilePicture} source={{uri: profile.profile_picture}}/>
                            </View>
                          </View>
                          <View style={styles.profileNames}>
                            <Text style={styles.username}>{profile.username}</Text>
                            <Text style={styles.profilename}>{profile.full_name}</Text>
                          </View>
                          <View style={styles.selection}>
                            <TouchableOpacity onPress={() => {removeFriends(profile.friend_id)}} style={styles.rejectRequest}>
                              <Text style={styles.rejectText}>
                                Following
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rbga(0,0,0,0)'
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 32
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  },
  placeHolder: {
    height: 125,
    width: 125,
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 8
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 16,
    marginTop: 8
  },
  imageIcon: {
    height: 18,
    width: 18,
    color: '#e93f3e',
    margin: 10,
    marginLeft: 14
  },
  menuOptions: {
    display: 'flex',
    flexDirection: 'row'
  },
  mainContent: {
    flex: 1,
    marginTop: 24
  },
  list: {
    flex: 1
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
    backgroundColor: 'lightgrey',
    padding: 6
  },
  remove: {
    color: 'black',
    height: 32,
    width: 32,
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
    padding: 8,
    borderRadius: 20
  },
  rejectText: {
    fontWeight: 'bold',
  },
  acceptRequest: {
    backgroundColor: '#e94f4e',
    padding: 4,
    borderRadius: 20,
    marginLeft: 8
  }
})

export default UserListComponent
