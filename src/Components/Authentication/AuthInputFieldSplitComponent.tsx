import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as Icons from 'react-native-feather';

const AuthInputFieldSplitComponent = (props) => {
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
    width: '49%',
    backgroundColor: 'rgba(107, 107, 107, .8)',
    borderRadius: 32,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 12
  },
  inputIcon: {
    marginRight: 18
  },
  inputField: {
    fontSize: 20,
    color: 'white',
    
  }
})

export default AuthInputFieldSplitComponent
