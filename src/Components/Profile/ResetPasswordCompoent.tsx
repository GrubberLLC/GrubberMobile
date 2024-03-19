import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import { X } from 'react-native-feather'
import { UserContext } from '../../Context/UserContext'
import MainButton from '../General/MainButton'
import { updatePassword, type UpdatePasswordInput } from 'aws-amplify/auth';
import InputFieldComponent from '../General/InputFieldComponent'



const ResetPasswordCompoent = (props) => {
  const { setEditProfile, editProfile } = props

  const {user} = useContext(UserContext)

  const [getCode, setGetCode] = useState(true)

  const [confirmationCode, setConfirmationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [matchingPassword, setMatchingPassword] = useState(false)

  const updateConfirmationCode = (text: string) => {
    setConfirmationCode(text)
  }

  const updateUserPassword = (text: string) => {
    isValidPassword(text)
    setNewPassword(text)
    checkIfMatch(text, verifyPassword)
  }

  const updateVerify = (text: string) => {
    setVerifyPassword(text)
    checkIfMatch(newPassword, text)
  }

  const checkIfMatch = (password: string, verify: string) => {
    password === verify
      ? setMatchingPassword(true)
      : setMatchingPassword(false)
  }

  function isValidPassword(password: string) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    if (password.length > 8 && hasUpperCase && hasLowerCase && hasDigit) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }

  const handleUpdatePassword = () => {
    validPassword && matchingPassword
      ? updatePassword({ oldPassword: confirmationCode, newPassword: newPassword })
        .then(() => {
          setEditProfile(!editProfile)
        })
        .catch(err => {
          console.log(err)
          if (err.message.includes('Incorrect username or password.')) {
            Alert.alert('Error', 'Incorrect old password');
          } else {
            // Handle other types of errors or simply log them
            Alert.alert('Error', 'An error occurred while updating the password.');
          }
        })
      : null
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New Password</Text>
          <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <InputFieldComponent 
          palceholder='Old Password'
          label='Lock'
          value={confirmationCode}
          handleFunction={updateConfirmationCode}
          secure={true}
          validation={true}
        />
        <InputFieldComponent 
          palceholder='Password'
          label='Lock'
          value={newPassword}
          handleFunction={updateUserPassword}
          secure={true}
          validation={true}
        />
        {
          validPassword
            ? null 
            : <View style={styles.validation}>
                <Text style={styles.validationText}>A-Z, a-z, 0-9, 8+ Characters</Text>
              </View>
        }
        <InputFieldComponent 
          palceholder='Verify Password'
          label='CheckCircle'
          value={verifyPassword}
          handleFunction={updateVerify}
          secure={true}
          validation={true}
        />
        {
          matchingPassword
            ? null 
            : <View style={styles.validation}>
                <Text style={styles.validationText}>Password & Verify don't match</Text>
              </View>
        }
        <MainButton label={'Reset Password'} handleFunction={() => {handleUpdatePassword()}}/>
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
    backgroundColor: 'rgba(0,0,0,0'
  },
  content: {
    width: '100%',
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
  validation: {
    width: '100%',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  validationText: {
    fontWeight: '600',
    color: '#e94f4e'
  }
})

export default ResetPasswordCompoent
