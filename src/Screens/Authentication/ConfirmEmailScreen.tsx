import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { autoSignIn, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import AuthInputFieldComponent from '../../Components/Authentication/AuthInputFieldComponent'
import MainButton from '../../Components/General/MainButton'

const ConfirmEmailScreen = ({route}) => {
  const {username} = route.params
  const navigation = useNavigation()

  const [confirmationCode, setConfirmationCode] = useState('')

  const handleConfirmationCodeChange = (text: string) => {
    setConfirmationCode(text)
  }

  const confirmEmailCode = () => {
    confirmSignUp({
        username: username,
        confirmationCode: confirmationCode
    })
    .then(response => {
      setConfirmationCode('')
      autoSignIn()
      navigation.navigate('LoginScreen');
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  };

  const resendConfirmationCode = () => {
    resendSignUpCode({
      username: username
    })
    .then(response => {
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>GRUBBER</Text>
        <Text style={styles.slogan}>Discover | Savor | Share</Text>
      </View>
      <View style={styles.formContent}>
        <Text style={styles.formLabel}>Confirm Email</Text>
        <Text style={styles.info}>Enter the code that was emailed to you.</Text>
        <AuthInputFieldComponent 
          palceholder='Confirmation Code'
          label='Hash'
          value={confirmationCode}
          handleFunction={handleConfirmationCodeChange}
          secure={false}
          validation={true}
        />
        <MainButton label={'Confirm Code'} handleFunction={confirmEmailCode}/>
        <View style={styles.accountSignupContainer}>
          <Text style={styles.info}>Didn't receive a code? </Text>
          <TouchableOpacity onPress={() => {resendConfirmationCode()}}>
            <Text style={styles.infoSelect}>Resend Code</Text>
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
    fontWeight: 'bold'
  }
})

export default ConfirmEmailScreen
