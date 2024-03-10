import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { UserContext } from '../../Context/UserContext'
import { Bell, Plus } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'

const PostsScreen = () => {
  const navigation = useNavigation()

  const {profile} = useContext(UserContext)

  const displayFeed = () => {
    return(
      <View style={styles.header}>
        <Text style={styles.headerText}>{profile.username}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {navigation.navigate('AddPostScreen')}}>
            <Plus style={{marginRight: 12}} height={26} width={26} color={'white'} />
          </TouchableOpacity>
          <Bell height={24} width={24} color={'white'}/>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {
        profile 
          ? displayFeed()
          : null
      }
      <View style={styles.content}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default PostsScreen
