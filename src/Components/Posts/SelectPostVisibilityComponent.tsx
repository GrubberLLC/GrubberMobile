import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { Circle, MessageSquare, Plus, RefreshCcw, X } from 'react-native-feather'
import MainButton from '../General/MainButton'
import InputFieldComponent from '../General/InputFieldComponent'
import { TextInput } from 'react-native-gesture-handler'

const SelectPostVisibilityComponent = (props) => {
  const { visible, setVisible, viewVisibility, setViewVisibility } = props

  const setNewVisiblilty = (val: number) => {
    setVisible(val)
    setViewVisibility(!viewVisibility)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Visibility</Text>
          <TouchableOpacity onPress={() => {setViewVisibility(!viewVisibility)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white'}}>Select who can view your posts.</Text>
        <View>
          <TouchableOpacity onPress={() => {setNewVisiblilty(2)}} style={styles.selection}>
            <Text style={styles.selectionText}>Everyone</Text>
            {
              visible === 2
                ? <Circle height={24} width={24} color={'white'} fill={'white'}/>
                : <Circle height={24} width={24} color={'white'}/>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setNewVisiblilty(1)}} style={styles.selection}>
            <Text style={styles.selectionText}>Friends</Text>
            {
              visible === 1
                ? <Circle height={24} width={24} color={'white'} fill={'white'}/>
                : <Circle height={24} width={24} color={'white'}/>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setNewVisiblilty(0)}} style={styles.selection}>
            <Text style={styles.selectionText}>Private</Text>
            {
              visible === 0
                ? <Circle height={24} width={24} color={'white'} fill={'white'}/>
                : <Circle height={24} width={24} color={'white'}/>
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rbga(0,0,0,0)'
  },
  content: {
    width: '100%',
    backgroundColor: '#363636',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderTopEndRadius: 16
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  },
  placeHolder: {
    height: 125,
    width: 125,
    backgroundColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 8
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 16,
    marginTop: 8
  },
  imageIcon: {
    height: 18,
    width: 18,
    color: '#e93f3e',
    margin: 10,
    marginLeft: 14
  },
  menuOptions: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputContiner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    flex: 1,
    color: 'white',
    fontSize: 18
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  selection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  selectionText: {
    fontSize: 18,
    color: 'white'
  }
})

export default SelectPostVisibilityComponent
