import React, { useState } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from '@env';
import { signUp } from 'aws-amplify/auth'
import AuthInputFieldComponent from '../../Components/Authentication/AuthInputFieldComponent'
import AuthInputSwitchComponent from '../../Components/Authentication/AuthInputSwitchComponent'
import MainButton from '../../Components/General/MainButton'

const ProfileScreen = ({route}) => {
  const {username, email, password} = route.params

  const navigation = useNavigation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  const handleUpdateFirstName = (text: string) => {
    setFirstName(text)
  }

  const handleUpdateLastName = (text: string) => {
    setLastName(text)
  }

  const handleUpdatePhone = (text: string) => {
    setPhone(text)
  }

  const handleUpdateLocation = (text: string) => {
    setLocation(text)
  }

  const handleUpdatePublic = () => {
    setIsPublic(!isPublic)
  }

  const singupUser = () => {
    const profileData = {
      username: username,
      email: email,
      phone: phone,
      location: location,
      first_name: firstName,
      last_name: lastName,
      full_name: firstName + ' ' + lastName,
      public: isPublic ? 1 : 0,
      notifications: 1,
      followers: 0,
      following: 0,
      logged_in: 1,
    }

    const signupData = {
      username,
      password,
      options: {
        userAttributes: {
          email: email,
          phone_number: `+1${phone}`, 
          given_name: firstName,
          family_name: lastName,
          nickname: firstName,
          name: `${firstName} ${lastName}`,
          locale: location,
        }
      }
    }
    
    signUp(signupData)
      .then((currentUser: any) => {
        profileData.user_id = currentUser.userId
        createUserProfile(profileData)
      })
      .catch((err: any) => {
        console.log('User is not logged in:', err);
      });
  }

  const createUserProfile = (profile_data: any) => {
    const url = `https://grubberapi.com/api/v1/profiles/`; 
    axios.post(url, profile_data)
      .then(response => {
        navigation.navigate('ConfirmEmailScreen', {username:username})
      })
      .catch(error => {
        console.error('Error creating new profile:', error)
      });
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>GRUBBER</Text>
        <Text style={styles.slogan}>Discover | Savor | Share</Text>
      </View>
      <View style={styles.formContent}>
        <Text style={styles.formLabel}>Profile</Text>
        <AuthInputFieldComponent 
          palceholder='first name'
          label='User'
          value={firstName}
          handleFunction={handleUpdateFirstName}
          secure={false}
          validation={true}
        />
        <AuthInputFieldComponent 
          palceholder='last name'
          label='User'
          value={lastName}
          handleFunction={handleUpdateLastName}
          secure={false}
          validation={true}
        />
        <AuthInputFieldComponent 
          palceholder='phone'
          label='Phone'
          value={phone}
          handleFunction={handleUpdatePhone}
          secure={false}
          validation={true}
        />
        <AuthInputFieldComponent 
          palceholder='city, state'
          label='MapPin'
          value={location}
          handleFunction={handleUpdateLocation}
          secure={false}
          validation={true}
        />
        <AuthInputSwitchComponent  
          palceholder='Public'
          label='Eye'
          value={isPublic}
          handleFunction={handleUpdatePublic}
          secure={false}
        />
        <MainButton label={'Create Account'} handleFunction={singupUser} />
        <View style={styles.accountSignupContainer}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <Text style={styles.infoSelect}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
    marginTop: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  },
  slogan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  formContent: {
    width: '100%',
    padding: 20, 
  },
  formLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  forgotPasswordContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8
  },
  forgot: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  accountSignupContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  info: {
    fontSize: 16,
    color: 'white'
  },
  infoSelect: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',

  },
  splitFroms: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white'
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
  }
})

export default ProfileScreen
