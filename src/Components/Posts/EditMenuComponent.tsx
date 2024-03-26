import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { ArrowDown, ChevronsDown, Edit, Edit2, Heart, Plus, RefreshCcw, Trash, Trash2, X } from 'react-native-feather'
import InputFieldComponent from '../General/InputFieldComponent'
import MainButton from '../General/MainButton'
import { launchImageLibrary } from 'react-native-image-picker'; // Import the function
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { uploadData } from 'aws-amplify/storage';
import { BASE_URL } from '@env';
import axios from 'axios'
import InputSwitchComponent from '../General/InputSwitchComponent'
import { UserContext } from '../../Context/UserContext'
import { ListContext } from '../../Context/ListContext'
import { useNavigation } from '@react-navigation/native'


const EditMenuComponent = (props) => {
  const navigation = useNavigation()

  const { toggleEditMenu, item } = props

  const { user } = useContext(UserContext)
  const { getUserLists, userLists } = useContext(ListContext)


  const handleEditChange = () => {
    toggleEditMenu()
    navigation.navigate('EditPostScreen', {item: item})
  }

  const handleDeletePost = () => {
    Alert.alert(
      "Confirm Deletion", // Title
      "Are you sure you want to delete this post?", // Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            console.log("Delete Pressed");
            const url = `https://grubberapi.com/api/v1/posts/${place.id}`
            axios.delete(url)
              .then(response => {
                console.log("Post Deleted");
              })
              .catch(error => {
                console.error('Error fetching user lists:', error);
                throw error;
              });
          },
          style: "destructive"
        }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.menuOptions}>
          {
            user.userId === item.user_id
              ? <TouchableOpacity style={styles.menuItem} onPress={handleEditChange}>
                  <Edit height={24} width={24} color={'white'}/>
                  <Text style={styles.menuItemText}>Edit Post</Text>
                </TouchableOpacity>
              : null
          }
          {
            user.userId === item.user_id
              ? <TouchableOpacity style={styles.menuItem} onPress={() => {handleDeletePost()}}>
                  <Trash2 height={24} width={24} color={'white'}/>
                  <Text style={styles.menuItemText}>Delete</Text>
                </TouchableOpacity>
              : null
          }
          <TouchableOpacity style={styles.menuItem}>
            <Heart height={24} width={24} color={'white'}/>
            <Text style={styles.menuItemText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Plus height={24} width={24} color={'white'}/>
            <Text style={styles.menuItemText}>Add To List</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleEditMenu} style={styles.closeContainer}>
          <ChevronsDown height={24} width={24} color={'white'}/>
        </TouchableOpacity>
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
    backgroundColor: '#2c2c2c',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 32
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
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
    marginTop: 16,
    color: 'white',
    marginBottom: 16
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
    width: '100%',
    backgroundColor: '#4d4d4d',
    borderRadius: 12
  },
  menuItem: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#2d2d2d',
    borderBottomWidth: 2
  },
  menuItemText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  closeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default EditMenuComponent
