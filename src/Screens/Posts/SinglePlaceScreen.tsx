import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ChevronsLeft, Star } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { YELP_API_KEY, BASE_URL } from '@env'
import axios from 'axios'
import Yelp from '../../Assets/yelp.png'
import PlaceAddComment from '../../Components/Lists/PlaceAddComment'
import CommentComponent from '../../Components/Lists/CommentComponent'
import { Linking, Alert } from 'react-native';
import SearchPlaceAddCommentComponent from '../../Components/Search/SearchPlaceAddCommentComponent'

const imageWidth = Dimensions.get('window').width 

const SinglePlaceScreen = ({route}) => {
  const { place } = route.params

  const navigation = useNavigation()

  const [currentPlace, setCurrentPlace] = useState(null)

  const [loading, setLoading] = useState(true)

  const [comments, setComments] = useState([])
  const [addComment, setAddComment] = useState(false)

  useEffect(() => {
    grabYelpInfo(place.id)
    grabPlaceComments()
  }, [])

  const openYelp = async (yelp_url: string) => {
    try {
      // Check if the Yelp app can be opened with the given URL
      const canOpen = await Linking.canOpenURL(yelp_url);
      if (canOpen) {
        await Linking.openURL(yelp_url);
      } else {
        // Fallback to opening the URL in the web browser
        await Linking.openURL(yelp_url);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open the link.');
    }
  };


  const grabYelpInfo = (place_id: string) => {
    const apiKey = YELP_API_KEY;
    const options = {
      method: 'GET',
      headers: { 
        'accept': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      url: `https://api.yelp.com/v3/businesses/${place_id}`
    };
    
    axios(options)
      .then(response => {
        setCurrentPlace(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('yelp fusion error: ', err);
      });
  }

  const grabPlaceComments = () => {
    const url = `https://grubberapi.com/api/v1/comments/place/${place.id}`
    axios.get(url)
      .then(response => {
        setComments(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: place.picture}}/>
        <View style={styles.overlay}></View>
      </View>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.iconContainer}>
            <ChevronsLeft style={styles.icon} height={30} width={30} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {openYelp(place.url)}} style={styles.iconContainerRed}>
            <Image style={styles.iconImage} source={Yelp}/>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.rowSB}>
            <Text style={styles.name}>{place.name}</Text>
          </View>
          <View style={styles.rowSB}>
            <Text style={styles.address}>{place.location.address1}. {place.location.city}, {place.location.state} {place.location.zip_code}</Text>
          </View>
          <View style={styles.rowSB}>
            <View style={styles.row}>
              <Star height={20} width={20} color={'#e94f4e'} fill={'#e94f4e'}/>
              <Text style={styles.rating}>{place.rating}/5</Text>
              <Text style={styles.reviews}>({place.review_count} reviews)</Text>
            </View>
            <Text style={styles.price}>{place.price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentList}>
        {
          loading
            ? <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems:'center'}}><ActivityIndicator size={'large'} color={'#e94f4e'}/></View>
            : <View style={styles.placeContainer}>
                <View style={styles.commentContainer}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentTitle}>Comments:</Text>
                    <TouchableOpacity onPress={() => {setAddComment(!addComment)}}>
                      <Text style={styles.commentAdd}>Add Comment</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {
                      comments.length > 0
                        ? <ScrollView>
                            {
                              comments.map((comment) => {
                                return(
                                  <CommentComponent grabPlaceComments={grabPlaceComments} comment={comment}/>
                                )
                              })
                            }
                          </ScrollView>
                        : <View style={styles.scrollContainer}><Text style={{fontSize: 18}}>No Comments..</Text></View>
                    }
                  </View>
                </View>
              </View>
        }
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={addComment}
        >
          <SearchPlaceAddCommentComponent grabPlaceComments={grabPlaceComments} place={place} setAddComment={setAddComment} addComment={addComment}/>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'black',
    borderRadius: 12,
    marginTop: 8
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    zIndex: 3,
    backgroundColor: 'black'
  },
  overlay: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'rgba(20, 20, 20,.7)',
    zIndex: 4
  },
  header: {
    width: '100%',
    height: imageWidth - 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    padding: 16,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(200,200,200,.5)',
  },
  iconContainerRed: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#e94f4e',
  },
  bottomSetion: {
    width: '100%',
    padding: 16
  },
  contentList: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  placeContainer: {
    flex: 1,
    marginTop: 16
  },
  rowSB: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 16
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16
  },
  closed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94f4e'
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: 'white'
  },
  reviews: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'white'
  },
  price: {
    fontWeight: 'bold',
    color: 'white'
  },
  yelp: {
    height: 30,
    width: 30
  },
  yelpContainer: {
    margin: 16,
    padding: 10,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e94f4e',
    borderRadius: 10
  },
  yelpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  iconImage: {
    height: 25,
    width: 25,
    color: 'white'
  },
  commentContainer: {
    flex: 1,
    marginHorizontal: 16,
    padding: 8
  },
  commentHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8
  },
  commentTitle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  commentAdd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e94f4e'
  },
  scrollContainer: {
    width: '100%',
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    marginBottom: 40,
  }
})

export default SinglePlaceScreen
