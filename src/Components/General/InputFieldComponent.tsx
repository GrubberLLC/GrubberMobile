import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as Icons from 'react-native-feather';

const InputFieldComponent = (props) => {
  const {
    label,
    value,
    handleFunction,
    secure,
    palceholder
  } = props

  const IconComponent = Icons[label];

  return (
    <View style={styles.inputContiner}>
      {IconComponent ? <IconComponent style={styles.inputIcon} height={24} width={24} color="black" /> : null}
      <TextInput
        placeholder={palceholder}
        placeholderTextColor={'grey'}
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
    backgroundColor: 'rgba(218, 218, 218, .8)',
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
    marginRight: 8
  },
  inputIconValid: {
    marginLeft: 8
  },
  inputField: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'grey'
  }
})

export default InputFieldComponent
