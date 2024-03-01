import React, { useContext, useState } from 'react'
import { Switch, Text, TouchableOpacity, View } from 'react-native'
import InputFieldComponent from '../../Components/General/InputFieldComponent'
import { BASE_URL } from '@env';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { ListContext } from '../../Context/ListContext';

const AddListScreen = () => {
  const navigation = useNavigation()

  const { profile } = useContext(UserContext)
  const { createMember } = useContext(ListContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const handleNameChange = (text: string) => {
    setName(text)
  }

  const handleDescriptionChange = (text: string) => {
    setDescription(text)
  }

  const handlePictureChange = (text: string) => {
    setPicture(text)
  }

  const createList = () => {
    const url = `https://grubberapi.com/api/v1/lists/`; 
    const listData = {
      name: name,
      description: description,
      picture: picture,
      last_activity: `${profile.username} created ${name}`,
      public: isPublic ? 1 : 0,
      created_by: profile.user_id,
    }
    axios.post(url, listData)
      .then(response => {
        const memberData = {
          user_id: profile.user_id,
          list_id: response.data.insertId,
          status: 'owner',
          type: 'active'
        }
        createMember(memberData)
        navigation.navigate('AllListsScreens')
      })
      .catch(error => {
        console.error('Error creating new profile:', error)
      });
  }

  return (
    <View>
      <Text>Add list Screen</Text>
      <InputFieldComponent
        placeholder={'Name...'}
        label={'Name'}
        value={name}
        handleFunction={handleNameChange}
        secure={false}
      />
      <InputFieldComponent
        placeholder={'Description...'}
        label={'Description'}
        value={description}
        handleFunction={handleDescriptionChange}
        secure={false}
      />
      <InputFieldComponent
        placeholder={'image url...'}
        label={'Image'}
        value={picture}
        handleFunction={handlePictureChange}
        secure={false}
      />
      <View>
        <Text>Public</Text>
        <Switch
          style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
          onValueChange={() => {setIsPublic(!isPublic)}}
          value={isPublic}
        />
      </View>
      <TouchableOpacity onPress={() => {createList()}}>
        <Text>Create A List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.goBack()}}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddListScreen
