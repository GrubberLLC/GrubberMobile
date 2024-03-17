import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { X } from 'react-native-feather'
import { ListContext } from '../../Context/ListContext'

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 32

const SelectListComponent = (props) => {
  const { setList, viewLists, setViewLists } = props

  const {userLists} = useContext(ListContext)

  const setNewList = (item: any) => {
    setList(item)
    setViewLists(!viewLists)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lists</Text>
          <TouchableOpacity onPress={() => {setViewLists(!viewLists)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.resultsContainer}>
            {
              userLists.length > 0
                ? userLists.map((item) => {
                  return(
                    <TouchableOpacity onPress={() => {setNewList(item)}} style={styles.placeContainer}>
                      <Image style={styles.placeImage} source={{uri: item.picture}}/>
                      <View style={styles.overlay}></View>
                      <View style={styles.placeInfo}>
                        <View>
                          <Text style={styles.placeName}>{item.name}</Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold', marginTop: 8}}>{item.description}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })
                : null
            }
          </ScrollView>
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
    flex: 1,
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
  },
  resultsContainer: {
    flex: 1,
    marginVertical: 16
  },
  placeContainer: {
    height: ImageWidth * .66,
    width: ImageWidth,
    backgroundColor: 'grey',
    marginVertical: 8,
    borderRadius: 8
  },
  placeImage: {
    height: ImageWidth * .66,
    width: ImageWidth,
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    height: ImageWidth * .66,
    width: ImageWidth,
    backgroundColor: 'rgba(0,0,0,.5)',
    top: 0,
    left: 0
  },
  placeInfo: {
    position: 'absolute',
    height: ImageWidth * .66,
    width: ImageWidth,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 16
  },
  placeName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  address: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  }
})

export default SelectListComponent
