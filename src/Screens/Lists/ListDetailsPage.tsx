import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { BASE_URL } from '@env';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronsLeft, X } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import AddMemberComponent from '../../Components/Lists/AddMemberComponent';
import MainButton from '../../Components/General/MainButton';
import { UserContext } from '../../Context/UserContext';

const imageWidth = Dimensions.get('window').width 

const ListDetailsPage = ({route}) => {
  const { list } = route.params

  const navigation = useNavigation()

  const {user} = useContext(UserContext)

  const [members, setMembers] = useState([])
  const [viewAddMembers, setViewAddMembers] = useState(false)
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const owner = members.find(member => member.status === 'Owner');
    const isCurrentUserOwner = !!owner && owner.user_id === user.userId;
    setIsOwner(isCurrentUserOwner);
    
  }, [members, user.userId]);

  const toggleViewAddMember = () => {
    setViewAddMembers(!viewAddMembers)
  }

  const [isPublic, setIsPublic] = useState(list.public === 1 ? true : false)
  const updatePublicStatus = () => {
    updateListView()
    setIsPublic(!isPublic)
  }

  useEffect(() => {
    getAllListMembers()
  }, [])

  const updateListView = () => {
    const url = `https://grubberapi.com/api/v1/lists/public/${list.list_id}`
    axios.put(url, {public: isPublic ? 0 : 1})
      .then(response => {
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const getAllListMembers = () => {
    const url = `https://grubberapi.com/api/v1/members/list/${list.list_id}`
    axios.get(url)
      .then(response => {
        setMembers(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const leaveGroup = () => {
    const memberRecord = members.find(member => member.user_id === user.userId);
    const url = `https://grubberapi.com/api/v1/members/${memberRecord.member_id}`
    axios.delete(url)
      .then(response => {
        navigation.navigate('AllListsScreens')
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const deleteGroup = () => {
    const memberRecord = members.find(member => member.user_id === user.userId);
    const url = `https://grubberapi.com/api/v1/members/${memberRecord.member_id}`
    axios.delete(url)
      .then(response => {
        console.log(response.data)
        const deleteUrl = `https://grubberapi.com/api/v1/lists/${list.list_id}`
        axios.delete(deleteUrl)
          .then(response => {
            console.log(response.data)
            navigation.navigate('AllListsScreens')
          })
          .catch(error => {
            console.error('Error deleting list:', error);
            throw error;
      });
      })
      .catch(error => {
        console.error('Error deleting member:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: list.picture}}/>
        <View style={styles.overlay}></View>
      </View>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.iconContainer}>
            <ChevronsLeft style={styles.icon} height={30} width={30} color={'white'}/>
          </TouchableOpacity>
          <View style={styles.listNameDescription}>
            <Text style={styles.name}>{list.name}</Text>
            <Text style={styles.description}>{list.description}</Text>
          </View>
        </View>
      </View>
      <View style={viewAddMembers === true ? styles.contentListOpen : styles.contentList}>
        <View style={styles.subcontainer}>
          <View style={styles.subheader}>
            <Text style={styles.headerText}>Preferences</Text>
          </View>
          {isOwner && (
            <>
              <View style={styles.preferencesContainer}>
                <View style={styles.switchRow}>
                  <Text style={styles.title}>Public View</Text>
                  <Switch 
                    style={styles.switch}
                    trackColor={{false: '#767577', true: '#e94f4e'}}
                    value={isPublic}
                    onValueChange={updatePublicStatus}
                  />
                </View>
                <View style={styles.disclaimer}>
                  <Text>Anyone can view your list and it's content</Text>
                </View>
              </View>
            </>
          )}
          <View style={styles.subheader}>
            <Text style={styles.headerText}>
              Members
            </Text>
            <TouchableOpacity onPress={toggleViewAddMember}>
              <Text style={styles.subHeaderText}>Add Member</Text>
            </TouchableOpacity>
          </View>
          <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={viewAddMembers}
          >
            <AddMemberComponent 
              members={members} 
              viewAddList={viewAddMembers} 
              setViewAddList={setViewAddMembers}
              list={list}
              getAllListMembers={getAllListMembers}/>
          </Modal>
          <View style={styles.membersContainer}>
            <ScrollView>
              {
                members.length > 0
                  ? members.map((member) => {
                    return(
                      <TouchableOpacity onPress={() => {navigation.navigate('UserProfileScreen', {profile: member})}} style={styles.profile}>
                        <View style={styles.profileSection}>
                          <View style={styles.profilePicture}></View>
                        </View>
                        <View style={styles.profileNames}>
                          {
                            member.type === 'active' 
                              ? <Text style={styles.username}>{member.username}</Text>
                              : <Text style={styles.username}>{member.username} {`(${member.type})`}</Text>
                          }
                          <Text style={styles.profilename}>{member.full_name} {`(${member.status})`}</Text>
                        </View>
                        {
                          member.status === 'Owner'
                            ? null 
                            : <TouchableOpacity style={styles.removeContainer}>
                                <X style={styles.remove}/>
                              </TouchableOpacity>
                        }
                      </TouchableOpacity>
                    )
                  })
                  : <Text>No Members</Text>
              }
            </ScrollView>
          </View>
          {isOwner 
            ? (
              <MainButton label={'Delete Group'} handleFunction={deleteGroup}/>
            ) : (
              <MainButton label={'Leave Group'}  handleFunction={leaveGroup}/>
            )
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
  imageContainer: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth,
    // backgroundColor: 'grey',
    borderRadius: 12,
    marginTop: 8
  },
  image: {
    flex: 1,
    zIndex: 3
  },
  overlay: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'rgba(20, 20, 20,.5)',
    borderRadius: 12,
    zIndex: 4
  },
  header: {
    width: '100%',
    height: imageWidth - 220,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  topBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: 16
  },
  listNameDescription: {
    marginLeft: 16,
    flex: 1
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(200,200,200,.5)'
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
  contentList: {
    flex: 1,
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden'
  },
  contentListOpen: {
    flex: 1,
    backgroundColor: '#c2c2c2',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden'
  },
  subcontainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  subheader: {
    marginTop: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94f4e'
  },
  preferencesContainer: {
    marginVertical: 16
  },
  switchRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  title: {
    fontSize: 18
  },
  switch: {
    transform: [{ scaleX: .85 }, { scaleY: .85 }],
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 16,
    padding: 2
  },
  disclaimer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  subheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  membersContainer: {
    flex: 1,
    // backgroundColor: 'grey'
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
  }
})

export default ListDetailsPage
