import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Heart, MessageSquare, Star } from 'react-native-feather'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 16

const SinglePostComponent = (props) => {

  const {item} = props

  const { profile, user } = useContext(UserContext)

  const [showFullCaption, setShowFullCaption] = useState(false)
  const [postLikes, setPostLikes] = useState([])

  const hasUserLikedPost = postLikes.some(like => like.user_id === user.userId);

  let lastTap: any = null;

  useEffect(() => {
    getPostLikes()
  }, [])

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      hasUserLikedPost
        ? removeLike()
        : createLike()
    } else {
      lastTap = now;
    }
  };

  function truncateString(str: string, maxLength = 150) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }

  const createLike = () => {
    let url = `https://grubberapi.com/api/v1/likes/`
    console.log(item.post_id)
    const likeData = {
      post_id: item.post_id,
      user_id: user.userId
    }
    axios.post(url, likeData)
      .then(response => {
        console.log(response.data.length)
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
        console.log(response.data.length)
        setPostLikes(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
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
  
  return (
    <View key={item.post_id} style={styles.post}>
      <View style={styles.profileHeader}>
        <Image style={styles.profileImage} source={{uri: profile.profile_picture}}/>
        <View style={{marginLeft: 16}}>
          <Text style={styles.profileUserName}>{profile.username}</Text>
          <Text style={styles.profileName}>{profile.full_name}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.image}>
          <Image style={styles.image} source={{uri: item.media_url}}/>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.actionSection}>
        <TouchableOpacity onPress={() => {hasUserLikedPost ? removeLike() : createLike()}}>
          <Heart height={24} width={24} color={hasUserLikedPost ? '#e94f4e' : 'white'} fill={hasUserLikedPost ? '#e94f4e' : 'none'}/>
        </TouchableOpacity>
        <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>{postLikes.length} Likes</Text>
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
      <View style={{width: '100%', paddingBottom: 16}}>
        {
          showFullCaption
            ? <Text style={{color: 'white', fontSize: 16}}>{item.caption}
                <TouchableOpacity onPress={() => {setShowFullCaption(!showFullCaption)}}>
                  <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Show Less</Text>
                </TouchableOpacity>
              </Text>
            : <Text style={{color: 'white', fontSize: 16}}>{truncateString(item.caption)} 
                <TouchableOpacity onPress={() => {setShowFullCaption(!showFullCaption)}}>
                  <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Show More</Text>
                </TouchableOpacity>
              </Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    padding: 8
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
    backgroundColor: '#2c2c2c'
  },
  scroll: {
    flex: 1
  },
  profileImage: {
    height: 46,
    width: 46,
    borderRadius:25
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
    borderRadius: 8
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
  actionSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16
  },
  notificationIcon: {
    position: 'absolute',
    right: 0,
    top: -5
  }
})

export default SinglePostComponent