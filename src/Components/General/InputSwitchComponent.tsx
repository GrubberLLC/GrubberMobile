import React from 'react'
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import * as Icons from 'react-native-feather';

const InputSwitchComponent = (props) => {
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
      <View style={styles.label}>
        {IconComponent ? <IconComponent style={styles.inputIcon} height={24} width={24} color="black" /> : null}
        <Text style={styles.inputField}>{palceholder}</Text>
      </View>
      <View>
        <Switch
          style={styles.switch}
          onValueChange={() => {handleFunction()}}
          trackColor={{false: 'white', true: '#e94f4e'}}
          value={value}
        />
      </View>
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
    justifyContent: 'space-between',
    marginTop: 12
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputIcon: {
    marginRight: 18,
    color: 'white'
  },
  inputField: {
    fontSize: 20,
    color: 'white',
  },
  switch: {
    transform: [{ scaleX: .85 }, { scaleY: .85 }],
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 16,
    padding: 2
  }
})

export default InputSwitchComponent
