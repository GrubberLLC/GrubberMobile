import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Check, X } from 'react-native-feather'

const RequestGroupComponent = (props) => {

  const { member, acceptMemberRequest } = props

  return (
    <View style={styles.profile}>
      <View style={styles.profileSections}>
        <View style={styles.profilePicture}>
          <Image style={styles.picture} source={{uri: member.picture}} />
        </View>
      </View>
      <View style={styles.profileNames}>
        <Text style={styles.profilename}>Join {member.name}</Text>
        <Text style={styles.profilename}><Text style={{fontWeight: 'bold'}}>({member.sent_request})</Text> sent request</Text>
      </View>
      <View style={styles.selection}>
        <View style={styles.rejectRequest}>
          <X height={24} width={24} color={'black'}/>
        </View>
        <TouchableOpacity onPress={() => {acceptMemberRequest(member.member_id)}} style={styles.acceptRequest}>
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
    backgroundColor:'lightgrey',
    marginRight: 12,
    overflow: 'hidden'
  },
  picture: {
    height: 45,
    width: 45,
    borderRadius: 30,
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

export default RequestGroupComponent
