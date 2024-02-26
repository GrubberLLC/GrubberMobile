import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MainButton = (props) => {
  const {handleFunction, label} = props
  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {handleFunction()}}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: 32,
    backgroundColor: '#e94f4e',
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default MainButton
