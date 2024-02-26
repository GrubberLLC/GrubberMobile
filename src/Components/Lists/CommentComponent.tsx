import React, { useContext } from 'react'
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Trash2 } from 'react-native-feather'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'
import {BASE_URL} from '@env'

const imageWidth = Dimensions.get('window').width - 24

const CommentComponent = (props) => {
  const {comment, grabPlaceComments} = props

  const {user} = useContext(UserContext)

  const confirmDelete = () => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteCurrentComment() }
      ]
    );
  };

  const deleteCurrentComment = () => {
    const url = `https://grubberapi.com/api/v1/comments/${comment.comment_id}`
    axios.delete(url)
      .then(response => {
        grabPlaceComments()
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageConainer}>
        <Image style={styles.profileImage} source={{uri: comment.profile_picture}}/>
      </View>
      <View style={styles.commentContainer}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.username}>{comment.username}</Text>
          {
            user.userId === comment.user_id 
              ? <TouchableOpacity onPress={() => {confirmDelete()}}><Trash2 height={20} width={20} color={'#e94f4e'} /></TouchableOpacity>
              : null
          }
        </View>
        <Text style={styles.comment}>{comment.comment}</Text>
        <Image style={styles.commentPhoto} source={{uri: comment.image}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 26,
    paddingBottom: 16
  }, 
  profileImageConainer: {
    height: 40,
    width: 40,
    borderRadius: 22,
    marginHorizontal: 12
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 22
  },
  commentContainer: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  comment: {
    fontSize: 16 
  },
  commentPhoto: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 16,
    
  }
})

export default CommentComponent
