import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Check, X } from 'react-native-feather'

const FriendRequestComponent = (props) => {

  const { member, rejectFriendRequest, acceptFriendRequest } = props

  return (
    <View style={styles.profile}>
      <View style={styles.profileSections}>
        <View style={styles.profilePicture}>
          <Image style={styles.profilePicture} source={{uri: member.profile_picture}}/>
        </View>
      </View>
      <View style={styles.profileNames}>
        <Text style={styles.username}>{member.username}</Text>
        <Text style={styles.profilename}>{member.full_name}</Text>
      </View>
      <View style={styles.selection}>
        <TouchableOpacity onPress={() => {rejectFriendRequest(member.friend_id)}} style={styles.rejectRequest}>
          <X height={24} width={24} color={'black'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {acceptFriendRequest(member)}} style={styles.acceptRequest}>
          <Check  height={24} width={24} color={'white'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    padding: 12,
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
    color: 'white'
  },
  profilename: {
    fontSize: 16,
    marginTop: 2,
    color: 'white'
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
    padding: 4,
    borderRadius: 20
  },
  acceptRequest: {
    backgroundColor: '#e94f4e',
    padding: 4,
    borderRadius: 20,
    marginLeft: 8
  }
})

export default FriendRequestComponent
