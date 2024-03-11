import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { UserContext } from '../../Context/UserContext'
import { Bell, Heart, MessageSquare, Plus, Star } from 'react-native-feather'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ListContext } from '../../Context/ListContext'
import axios from 'axios'

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 16

const PostsScreen = () => {
  const navigation = useNavigation()

  const { profile, user } = useContext(UserContext)
  const { getUserLists } = useContext(ListContext)

  const [posts, setPosts] = useState([])
  const [showFullCaption, setShowFullCaption] = useState(false)

  useEffect(() => {
    if (user && user.userId) {
      getuserPosts(user.userId)
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        getuserPosts(user.userId)
      }
    }, [navigation])
  );

  const getuserPosts = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/posts/user/${user.userId}`
    axios.get(url)
      .then(response => {
        console.log(response.data.length)
        setPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  function truncateString(str, maxLength = 150) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }

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
        <ScrollView style={styles.scroll}>
          {
            posts.length > 0 
              ? <>
                  {
                    posts.map((item) => {
                      console.log(item)
                      return(
                        <View style={styles.post}>
                          <View style={styles.profileHeader}>
                            <Image style={styles.profileImage} source={{uri: profile.profile_picture}}/>
                            <View style={{marginLeft: 16}}>
                              <Text style={styles.profileUserName}>{profile.username}</Text>
                              <Text style={styles.profileName}>{profile.full_name}</Text>
                            </View>
                          </View>
                          <View style={styles.image}>
                            <Image style={styles.image} source={{uri: item.media_url}}/>
                          </View>
                          <View style={styles.actionSection}>
                            <Heart height={24} width={24} color={'white'}/>
                            <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>{item.likes} Likes</Text>
                            <MessageSquare height={24} width={24} color={'white'}/>
                            <Text style={{paddingHorizontal: 8, color: 'white', fontWeight: 'bold'}}>0 Comments</Text>
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
                    })
                  }
                </>
              : <View style={styles.scollContent}>
                  <Text>No posts</Text>
                  <Text>Start Following foodies</Text>
                </View>
          }
        </ScrollView>
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
  }
})

export default PostsScreen
