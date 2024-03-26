import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, TouchableWithoutFeedback, Dimensions, ScrollView, TextInput, Modal, Alert } from 'react-native'
import { UserContext } from '../../Context/UserContext'
import { ArrowRight, ArrowUp, ChevronsLeft, Edit, Heart, MessageSquare, MoreHorizontal, Star, Trash2, X } from 'react-native-feather'
import axios from 'axios'
import EditMenuComponent from '../../Components/Posts/EditMenuComponent'
import { useNavigation } from '@react-navigation/native'

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 16

const SinglePostScreen = ({route}) => {
  const {item} = route.params
  const navigation = useNavigation()

  const { profile, user } = useContext(UserContext)

  const [comment, setComment] = useState('')
  const [postLikes, setPostLikes] = useState([])
  const [postComments, setPostComments] = useState([])

  const [editMenu, setEditMenu] = useState(false)

  let lastTap: any = null;

  const hasUserLikedPost = postLikes.some(like => like.user_id === user.userId);

  useEffect(() => {
    getPostLikes()
    getPostComments()
  }, [])

  const toggleEditMenu = () => {
    setEditMenu(!editMenu)
  }

  const updateCommentText = (text: string) => {
    setComment(text)
  }

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 500;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      hasUserLikedPost
        ? removeLike()
        : createLike()
    } else {
      lastTap = now;
    }
  };

  const createLike = () => {
    let url = `https://grubberapi.com/api/v1/likes/`
    const likeData = {
      post_id: item.post_id,
      user_id: user.userId
    }
    axios.post(url, likeData)
      .then(response => {
        getPostLikes()
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getPostLikes = () => {
    let url = `https://grubberapi.com/api/v1/likes/${item.post_id}`
    axios.get(url)
      .then(response => {
        setPostLikes(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getPostComments = () => {
    let url = `https://grubberapi.com/api/v1/postComments/${item.post_id}`
    axios.get(url)
      .then(response => {
        setPostComments(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  function truncateString(str: string, maxLength = 120) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }

  const removeLike = () => {
    const userLike = postLikes.find(like => like.user_id === user.userId);
    if (userLike) {
      let url = `https://grubberapi.com/api/v1/likes/${userLike.like_id}`;
      axios.delete(url)
        .then(response => {
          getPostLikes(); 
        })
        .catch(error => {
          console.error('Error removing like:', error);
          throw error;
        });
    }
  }

  const createComment = () => {
    comment.length > 0
      ? () => {
          let url = `https://grubberapi.com/api/v1/postComments/`
          const commentData = {
            post_id: item.post_id,
            comment: comment,
            user_id: user.userId
          }
          axios.post(url, commentData)
            .then(response => {
              getPostComments()
              setComment('')
            })
            .catch(error => {
              console.error('Error fetching profile:', error);
              throw error;
            });
        }
      : null
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack()}} >
            <ChevronsLeft height={26} width={26} color={'white'}/>
          </TouchableOpacity>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 16}} onPress={() => {navigation.navigate('EditPostScreen', {item: item})}} >
              <Edit height={18} width={18} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleDeletePost()}} >
              <Trash2 height={18} width={18} color={'white'}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.postContainer}>
          <View style={styles.profileHeader}>
            <Image style={styles.profileImage} source={{uri: item.profile_picture}}/>
            <View style={{marginLeft: 16}}>
              <Text style={styles.profileUserName}>{item.username}</Text>
              <Text style={styles.profileName}>{item.full_name}</Text>
            </View>
          </View>
          {
            item.media_url
              ? <>
                  <TouchableWithoutFeedback onPress={handleDoubleTap}>
                    <View style={styles.image}>
                      <Image style={styles.image} source={{uri: item.media_url}}/>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={styles.actionSection}>
                    <TouchableOpacity onPress={() => {hasUserLikedPost ? removeLike() : createLike()}}>
                      <Heart height={24} width={24} color={hasUserLikedPost ? 'white' : 'white'} fill={hasUserLikedPost ? 'white' : 'none'}/>
                    </TouchableOpacity>
                    <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>{postLikes.length} Likes</Text>
                    <View>
                      <MessageSquare height={24} width={24} color={'white'} fill={'white'}/>
                    </View>
                    <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>{postComments.length} Comments</Text>
                  </View>
                  <TouchableOpacity style={styles.place}>
                    <Image style={styles.placeImage} source={{uri: item.picture}}/>
                    <View style={{marginLeft: 16}} >
                      <View>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{item.name}</Text>
                      </View>
                      <View style={styles.buttonRow}>
                        <Star style={{marginRight: 5}} height={24} width={24} color={'#e94f4e'} fill={'#e94f4e'}/>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{item.rating}/5</Text>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>({item.review_count} Reviews)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{width: '100%', marginBottom: 24}}>
                    <Text style={{color: 'white', fontSize: 16}}>{item.caption}</Text>
                  </View>
                </>
              : <>
                  <View style={{width: '100%', marginBottom: 24}}>
                    <Text style={{color: 'white', fontSize: 16}}>{item.caption}</Text>
                  </View>
                  <View style={styles.actionSection}>
                    <TouchableOpacity onPress={() => {hasUserLikedPost ? removeLike() : createLike()}}>
                      <Heart height={24} width={24} color={hasUserLikedPost ? 'white' : 'white'} fill={hasUserLikedPost ? 'white' : 'none'}/>
                    </TouchableOpacity>
                    <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>{postLikes.length} Likes</Text>
                    <View>
                      <MessageSquare height={24} width={24} color={'white'} fill={'white'}/>
                    </View>
                    <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>{postComments.length} Comments</Text>
                  </View>
                  <TouchableOpacity style={styles.place}>
                    <Image style={styles.placeImage} source={{uri: item.picture}}/>
                    <View style={{marginLeft: 16}} >
                      <View>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{item.name}</Text>
                      </View>
                      <View style={styles.buttonRow}>
                        <Star style={{marginRight: 5}} height={24} width={24} color={'#e94f4e'} fill={'#e94f4e'}/>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{item.rating}/5</Text>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>({item.review_count} Reviews)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
          }
          <View style={styles.addCommentContainer}>
            <Image height={30} width={30} style={styles.profileImageComment} source={{uri: profile.profile_picture}}/>
            <TextInput
              placeholder={'comment...'}
              placeholderTextColor={'white'}
              autoCapitalize='none'
              style={styles.commentInput}
              returnKeyLabel='Done'
              multiline
              value={comment}
              onChangeText={(text) => {updateCommentText(text)}}
            />
            <TouchableOpacity onPress={() => {createComment()}}>
              <ArrowRight style={styles.submitComment} height={30} width={30} color={'white'}/>
            </TouchableOpacity>
          </View>
          <View style={styles.postComments}>
            {
              postComments.map((comment) => {
                return(
                  <View style={styles.postCommentInfo}>
                    <View>
                      <Image style={styles.profileCommentPicture} source={{uri: comment.profile_picture}}/>
                    </View>
                    <View style={{marginLeft: 16}}>
                      <Text style={{color: 'white', marginBottom: 8, fontWeight: 'bold'}}>{comment.username}</Text>
                      <Text style={{color: 'white'}}>{comment.comment}</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={editMenu}
        >
          <EditMenuComponent toggleEditMenu={toggleEditMenu} item={item}/>
        </Modal>
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
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  postContainer: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    padding: 8
  },
  profileImage: {
    height: 46,
    width: 46,
    borderRadius:25
  },
  profileImageComment: {
    borderRadius:25,
    marginRight: 8
  },
  profileHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4
  },
  profileUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  profileName: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    marginTop: 4
  },
  image: {
    height: ImageWidth,
    width: ImageWidth,
    backgroundColor: 'grey',
    borderRadius: 8,
    marginBottom: 16
  },
  actionSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  place: {
    width: '100%', 
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row'
  },
  placeImageContainer: {
    height: 54,
    width: 54,
    borderRadius: 8
  },
  placeImage: {
    height: 54,
    width: 54,
    borderRadius: 8
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  commentInput: {
    flex: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    color: 'white',
  },
  button: {
    paddingVertical: 8
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  postComments: {
    paddingVertical: 16,
    marginBottom: 16
  },
  profileCommentPicture: {
    height: 35,
    width: 35,
    borderRadius:25
  },
  postCommentInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  addCommentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16
  },
  submitComment: {
    marginLeft: 8
  }
})

export default SinglePostScreen
