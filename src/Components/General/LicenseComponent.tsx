import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Alert, Dimensions, ScrollView } from 'react-native'
import { X } from 'react-native-feather'

const imageWidth = Dimensions.get('window').width - 32
const imageHeight = (imageWidth * 9) / 16;

const LicenseComponent = (props) => {
  const { setEditProfile, editProfile } = props

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Open Source License</Text>
          <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          <Text style={styles.name}>Grubber LLC.</Text>
          <Text style={styles.slogan}>MIT License</Text>
          <Text style={styles.established}>Copyright (c) 2024 - 2025 Grubber LLC</Text>
          <Text style={styles.paragraph}>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</Text>
          <Text style={styles.paragraph}>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</Text>
          <Text style={styles.paragraph}>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</Text>
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
    backgroundColor: 'rgba(0,0,0,0'
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 32
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  imageContainer: {
    height: imageHeight,
    width: imageWidth,
    backgroundColor: 'grey',
    marginVertical: 28
  },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  scroll: {
    flex: 1,
    marginBottom: 8,
    marginTop: 24
  },
  name: {
    fontWeight: 'bold',
    color: '#e94f4e',
    fontSize: 28
  },
  slogan: {
    fontSize: 16,
    marginTop: 8
  },
  established: {
    fontSize: 16,
    marginTop: 8
  },
  version: {
    fontSize: 14,
    marginTop: 4
  },
  legal: {
    fontSize: 14,
    marginTop: 4
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8
  }
})

export default LicenseComponent
