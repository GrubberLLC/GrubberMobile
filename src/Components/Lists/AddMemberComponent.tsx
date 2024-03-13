import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { User, X } from 'react-native-feather'
import InputFieldComponent from '../General/InputFieldComponent'
import axios from 'axios' 
import { BASE_URL } from '@env';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { UserContext } from '../../Context/UserContext'

const AddMemberComponent = (props) => {
  const { setViewAddList, viewAddList, members, list, getAllListMembers } = props

  const { user } = useContext(UserContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearchChange = (text: string) => {
    setSearchTerm(text)
  }

  useEffect(() => {
    searchForusers()
  }, [searchTerm])

  const isUserAMember = (userId: string) => {
    return members.some(member => member.user_id === userId);
  }

  const searchForusers = () => {
    const url = `https://grubberapi.com/api/v1/profiles/search/${searchTerm}`
    axios.get(url)
      .then(response => {
        setSearchResults(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const addNewMemberToList = (user_id: string) => {
    const url = `https://grubberapi.com/api/v1/members/`
    const memberObject = {
      list_id: list.list_id,
      user_id: user_id,
      status: 'member',
      type: 'pending',
      sent_request: user.username
    }
    axios.post(url, memberObject)
      .then(response => {
        getAllListMembers()
        setViewAddList(!viewAddList)
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
          <Text style={styles.headerText}>Add new Member</Text>
          <TouchableOpacity onPress={() => {setViewAddList(!viewAddList)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContiner}>
          <User style={styles.inputIcon} height={24} width={24} color="white" />
          <TextInput
            placeholder={'search username...'}
            placeholderTextColor={'white'}
            autoCapitalize='none'
            style={styles.inputField}
            returnKeyLabel='Done'
            value={searchTerm}
            onChangeText={(text) => {handleSearchChange(text)}}
          />
        </View>
        <View style={styles.searchResults}>
          {
            searchResults.length > 0
              ? <ScrollView>
                  {
                    searchResults.map((profile) => {
                      const alreadyAMember = isUserAMember(profile.user_id);
                      return(
                        <View style={styles.profile}>
                          <View style={styles.profileSection}>
                            {/* <View style={styles.profilePicture}></View> */}
                            <Image style={styles.profilePicture} source={{uri: profile.profile_picture}}/>
                          </View>
                          <View style={styles.profileNames}>
                            <Text style={styles.username}>{profile.username}</Text>
                            <Text style={styles.profilename}>{profile.full_name}</Text>
                          </View>
                          {!alreadyAMember && (
                            <TouchableOpacity onPress={() => {addNewMemberToList(profile.user_id)}} style={styles.removeContainer}>
                              <Text style={styles.remove}>Add</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )
                    })
                  }
                </ScrollView>
              : null
          }
        </View>  
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
    backgroundColor: '#2c2c2c',
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
    fontWeight: 'bold',
    color: 'white'
  },
  inputContiner: {
    backgroundColor: '#4d4d4d',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingRight: 24,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18
  },
  inputIcon: {
    marginRight: 8
  },
  inputIconValid: {
    marginLeft: 8
  },
  inputField: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  },
  placeHolder: {
    height: 125,
    width: 125,
    backgroundColor: '#4d4d4d',
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
  searchResults: {
    flex: 1,
    marginTop: 16
  },
  profile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#4d4d4d',
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
    color: 'white'
  },
  profilename: {
    fontSize: 16,
    color: 'white'
  },
  removeContainer: {
    borderRadius: 32 ,
    backgroundColor: '#e94f4e',
    padding: 6
  },
  remove: {
    color: 'white',
    padding: 2,
    fontWeight: 'bold'
  },
})

export default AddMemberComponent
