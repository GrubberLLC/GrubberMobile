import React, { useContext, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import AuthInputFieldComponent from '../../Components/Authentication/AuthInputFieldComponent'
import MainButton from '../../Components/General/MainButton'

const LoginScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signInUser, invalidLogin, loadingLogin } = useContext(UserContext)

  const handleUpdateUsername = (text: string) => {
    setUsername(text)
  } 

  const handleUpdatePassword = (text: string) => {
    setPassword(text)
  }

  const handleUserLogin = () => {
    signInUser(username, password)
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>GRUBBER</Text>
        <Text style={styles.slogan}>Discover | Savor | Share</Text>
      </View>
      <View style={styles.formContent}>
        <Text style={styles.formLabel}>Login</Text>
        {
          invalidLogin
            ? <Text style={styles.infoSelectRed}>Invalide Username/Password</Text>
            : null
        }
        <AuthInputFieldComponent 
          palceholder='username'
          label='Mail'
          value={username}
          handleFunction={handleUpdateUsername}
          secure={false}
          validation={true}
        />
        <AuthInputFieldComponent 
          palceholder='password'
          label='Lock'
          value={password}
          handleFunction={handleUpdatePassword}
          secure={true}
          validation={true}
        />
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => {navigation.navigate('ForgotPasswordScreen')}}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <MainButton label={loadingLogin ? <ActivityIndicator size={'small'}/> : 'Login'} handleFunction={handleUserLogin}/>
        <View style={styles.accountSignupContainer}>
          <Text style={styles.info}>No Account Yet? </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('SignupScreen')}}>
            <Text style={styles.infoSelect}>Signup</Text>
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
    marginTop: 8
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
  infoSelectRed: {
    fontSize: 16,
    color: '#d94f4e',
    fontWeight: 'bold',
    marginTop: 8
  },
  infoSelect: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default LoginScreen
