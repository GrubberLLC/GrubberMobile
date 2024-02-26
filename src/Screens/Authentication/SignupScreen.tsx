import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthInputFieldComponent from '../../Components/Authentication/AuthInputFieldComponent'
import MainButton from '../../Components/General/MainButton'
import axios from 'axios'
import { BASE_URL } from '@env';

const SignupScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')

  const [availableUsername, setAvailableUsername] = useState(true); // true by default
  const [availableEmail, setAvailableEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(false)
  const [validPasswordMatch, setValidPasswordMatch] = useState(false)

  const handleUpdateUsername = (text: string) => {
    validateUsername(text);
    setUsername(text);
  };

  const handleUpdateEmail = (text: string) => {
    validateEmail(text)
    setEmail(text)
  }

  const handleUpdatePassword = (text: string) => {
    text.length > 0
      ? isValidPassword(text)
      : setValidPassword(true)
    text === verify 
      ? setValidPasswordMatch(true)
      : setValidPasswordMatch(false)
    setPassword(text)
  }

  const handleUpdateVerify = (text: string) => {
    password === text 
      ? setValidPasswordMatch(true)
      : setValidPasswordMatch(false)
    setVerify(text)
  }

  const handleSignup = () => {
    if(availableUsername && availableEmail && validPassword && validPasswordMatch){
      navigation.navigate('ProfileScreen', {
        username: username,
        email: email,
        password: password
      })
    } else {
      null
    }
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

  const validateUsername = (username: string) => {
    const url = `https://grubberapi.com/api/v1/profiles/user/${username}`;
    axios.get(url)
      .then(response => {
        setAvailableUsername(response.data.length === 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const validateEmail = (email: string) => {
    const url = `https://grubberapi.com/api/v1/profiles/email/${email}`
    axios.get(url)
      .then(response => {
        response.data.length > 0
          ? setAvailableEmail(false)
          : setAvailableEmail(true)
      })
      .catch((error) => {
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
        <Text style={styles.formLabel}>Signup</Text>
        <AuthInputFieldComponent 
          palceholder='username'
          label='User'
          value={username}
          handleFunction={handleUpdateUsername}
          secure={false}
          showValidation={false}
          validation={availableUsername}
        />
        {
          availableUsername
            ? null
            : <View style={styles.errorContainer}><Text style={styles.infoSelectRed}>Username already exists</Text></View>
        }
        <AuthInputFieldComponent 
          palceholder='email'
          label='Mail'
          value={email}
          handleFunction={handleUpdateEmail}
          secure={false}
          validation={availableEmail}
        />
        {
          availableEmail
            ? null
            : <View style={styles.errorContainer}><Text style={styles.infoSelectRed}>Email already exists</Text></View>
        }
        <AuthInputFieldComponent 
          palceholder='password'
          label='Lock'
          value={password}
          handleFunction={handleUpdatePassword}
          secure={true}
          validation={validPassword}
        />
        {
          validPassword
            ? null 
            : <View style={styles.errorContainer}><Text style={styles.infoSelectRed}>A-Z, a-z, 0-9, 8+ Characters</Text></View>
        }
        <AuthInputFieldComponent 
          palceholder='verify password'
          label='Lock'
          value={verify}
          handleFunction={handleUpdateVerify}
          secure={true}
          validation={validPasswordMatch}
        />
        {
          validPasswordMatch
            ? null 
            : <View style={styles.errorContainer}><Text style={styles.infoSelectRed}>Password & Verify don't match</Text></View>
        }
        <MainButton label={'Signup'} handleFunction={handleSignup} />
        <View style={styles.accountSignupContainer}>
          <Text style={styles.info}>Have an account? </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}}>
            <Text style={styles.infoSelect}>Login</Text>
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
  errorContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  infoSelectGreen: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 8
  },
  infoSelectRed: {
    fontSize: 16,
    color: '#e94f4e',
    fontWeight: 'bold',
    marginTop: 8
  }
})

export default SignupScreen
