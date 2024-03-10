import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { MessageSquare, Plus, RefreshCcw, X } from 'react-native-feather'
import MainButton from '../General/MainButton'
import InputFieldComponent from '../General/InputFieldComponent'
import { TextInput } from 'react-native-gesture-handler'

const EditCaptionComponent = (props) => {
  const { caption, setCaption, viewCaption, setViewCaption } = props

  const [captionText, setCaptionText] = useState(caption)


  const handleCaptionText = (text: string) => {
    setCaptionText(text)
  }

  const updateText = () => {
    setCaption(captionText)
    setViewCaption(!viewCaption)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Caption</Text>
          <TouchableOpacity onPress={() => {setViewCaption(!viewCaption)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContiner}>
          <TextInput
            placeholder={'caption...'}
            placeholderTextColor={'white'}
            autoCapitalize='none'
            style={styles.input}
            returnKeyLabel='Done'
            multiline
            value={captionText}
            onChangeText={(text) => {handleCaptionText(text)}}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {updateText()}}>
            <Text style={styles.label}>Add Caption</Text>
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
  }
})

export default EditCaptionComponent
