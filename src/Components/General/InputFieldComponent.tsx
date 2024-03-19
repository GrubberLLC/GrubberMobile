import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as Icons from 'react-native-feather';

const InputFieldComponent = (props) => {
  const {
    label,
    value,
    handleFunction,
    secure,
    palceholder,
    multiline
  } = props

  const IconComponent = Icons[label];

  return (
    <View style={styles.inputContiner}>
      {IconComponent ? <IconComponent style={styles.inputIcon} height={24} width={24} color="black" /> : null}
      <TextInput
        placeholder={palceholder}
        placeholderTextColor={'white'}
        autoCapitalize='none'
        style={styles.inputField}
        returnKeyLabel='Done'
        secureTextEntry={secure}
        value={value}
        onChangeText={(text) => {handleFunction(text)}}
        multiline={multiline ? true : false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContiner: {
    backgroundColor: '#4d4d4d',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingRight: 24,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  inputIcon: {
    marginRight: 8,
    color: 'white'
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
  }
})

export default InputFieldComponent
