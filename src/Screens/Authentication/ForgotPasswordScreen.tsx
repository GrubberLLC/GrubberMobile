import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { resetPassword } from 'aws-amplify/auth'
import AuthInputFieldComponent from '../../Components/Authentication/AuthInputFieldComponent'
import MainButton from '../../Components/General/MainButton'

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')

  const handleUsernameChange = (text: string) => {
    setUsername(text)
  }

  const ResetUsersPassword = () => {
    resetPassword({username})
      .then(response => {
        navigation.navigate('LoginScreen')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>GRUBBER</Text>
        <Text style={styles.slogan}>Discover | Savor | Share</Text>
      </View>
      <View style={styles.formContent}>
        <Text style={styles.formLabel}>Reset Password</Text>
        <Text style={styles.info}>Reset password email will be sent.</Text>
        <AuthInputFieldComponent 
          palceholder='Username...'
          label='User'
          value={username}
          handleFunction={handleUsernameChange}
          secure={false}
          validation={true}
        />
        {/* <TouchableOpacity onPress={() => {ResetUsersPassword()}}>
          <Text>Reset Password</Text>
        </TouchableOpacity> */}
        <MainButton label={'Reset Password'} handleFunction={ResetUsersPassword}/>
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
  }
})

export default ForgotPasswordScreen
