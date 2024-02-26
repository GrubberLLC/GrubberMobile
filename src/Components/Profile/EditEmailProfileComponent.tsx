import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { X } from 'react-native-feather'
import InputFieldComponent from '../General/InputFieldComponent'
import { UserContext } from '../../Context/UserContext'
import MainButton from '../General/MainButton'
import { confirmSignUp, updateUserAttributes } from 'aws-amplify/auth'


const EditEmailProfileComponent = (props) => {
  const { setEditProfile, editProfile } = props

  const {profile, user, getUserProfile} = useContext(UserContext)

  const [email, setEmail] = useState(profile.email)
  const [emailCode, setEmailCode] = useState('')

  const [viewEmail, setViewEmail] = useState(true)

  const updateEmail = (text: string) => {
    setEmail(text)
  }

  const updateCode = (text: string) => {
    setEmailCode(text)
  }

  const updateEmailForCode = () => {
    updateUserAttributes({
      userAttributes: {
        email: email
      }
    })
    .then((response) => {
      setViewEmail(false)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const confirmUpdateEmail = () => {
    confirmSignUp({
      username: user.username,
      confirmationCode: emailCode
    })
    .then(response => {
      setEditProfile(!editProfile)
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        viewEmail
          ? <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Update Email</Text>
                <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
                  <X height={26} width={26} color={'#e94f4e'}/>
                </TouchableOpacity>
              </View>
              <InputFieldComponent 
                palceholder='First Name'
                label='User'
                value={email}
                handleFunction={updateEmail}
                secure={false}
                validation={true}
              />
              <MainButton label={'Update Email'} handleFunction={() => {updateEmailForCode()}}/>
            </View>
          : <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Confirm Code</Text>
                <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
                  <X height={26} width={26} color={'#e94f4e'}/>
                </TouchableOpacity>
              </View>
              <InputFieldComponent 
                palceholder='Confirmation Code'
                label='User'
                value={emailCode}
                handleFunction={updateCode}
                secure={false}
                validation={true}
              />
              <MainButton label={'Confirm Code'} handleFunction={() => {confirmUpdateEmail()}}/>
            </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0'
  },
  content: {
    width: '100%',
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
  }
})

export default EditEmailProfileComponent
