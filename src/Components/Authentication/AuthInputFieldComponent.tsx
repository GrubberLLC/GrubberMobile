import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as Icons from 'react-native-feather';

const AuthInputFieldComponent = (props) => {
  const {
    label,
    value,
    handleFunction,
    secure,
    palceholder,
    validation
  } = props

  const IconComponent = Icons[label];

  return (
    <View style={validation ? styles.inputContiner : styles.inputContinerRed}>
      {IconComponent ? <IconComponent style={styles.inputIcon} height={24} width={24} color="white" /> : null}
      <TextInput
        placeholder={palceholder}
        placeholderTextColor="white"
        autoCapitalize='none'
        style={styles.inputField}
        returnKeyLabel='Done'
        secureTextEntry={secure}
        value={value}
        onChangeText={(text) => {handleFunction(text)}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContiner: {
    backgroundColor: 'rgba(107, 107, 107, .8)',
    borderRadius: 32,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 12
  },
  inputContinerRed: {
    backgroundColor: 'rgba(107, 107, 107, .8)',
    borderRadius: 32,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 12,
    borderColor: '#e94f4e',
    borderWidth: 2,
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
    borderBottomColor: 'grey'
  }
})

export default AuthInputFieldComponent
