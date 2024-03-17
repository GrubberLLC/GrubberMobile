import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, Dimensions, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ChevronsLeft, Settings, Star } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { YELP_API_KEY, BASE_URL } from '@env'
import axios from 'axios'
import Yelp from '../../Assets/yelp.png'
import PlaceAddComment from '../../Components/Lists/PlaceAddComment'
import CommentComponent from '../../Components/Lists/CommentComponent'
import { Linking, Alert } from 'react-native';
import SinglePlacePostComponent from '../../Components/Lists/SinglePlacePostComponent'

const imageWidth = Dimensions.get('window').width 

const SinglePlaceScreen = ({route}) => {
  const { place } = route.params

  const navigation = useNavigation()

  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    grabPlacePosts()
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

  const grabPlacePosts = () => {
    let url = `https://grubberapi.com/api/v1/posts/place/${place.place_id}`
    axios.get(url)
      .then(response => {
        setAllPosts(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <ChevronsLeft height={26} width={26} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {openYelp(place.yelp_url)}} style={styles.diceImage}>
            <Image source={Yelp} style={styles.diceImage}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: place.picture}}/>
        <View style={styles.overlay}>
          <View style={styles.infoTopBar}>
            <Text style={styles.name}>{place.name}</Text>
          </View>
          <Text style={styles.activity}>{place.address_formatted}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowLeft}>
              <Star style={{marginRight: 4}} height={18} width={18} fill={'#e94f4e'} color={'#e94f4e'}/>
              <Text style={styles.rating}>{place.rating}/5</Text>
              <Text style={styles.address}>({place.review_count} reviews)</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.mainContnent}>
      <View style={{paddingHorizontal: 8, paddingVertical: 16}}> 
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Posts:</Text>
      </View>
        {
          allPosts.length > 0
            ? <ScrollView style={{flex: 1}}>
                {
                  allPosts.map((item) => {
                    return(
                      <SinglePlacePostComponent item={item}/>
                    )
                  })
                }
              </ScrollView>
            : <View style={styles.noPosts}><Text style={styles.noPostText}>No Posts Found</Text></View>
        }
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
    width: imageWidth,
    height: imageWidth - 180,
    backgroundColor: 'black',
    borderRadius: 12,
    marginTop: 8
  },
  image: {
    width: imageWidth,
    height: imageWidth - 180,
    zIndex: 3,
    backgroundColor: 'black'
  },
  overlay: {
    position: 'absolute',
    width: imageWidth,
    height: imageWidth - 180,
    backgroundColor: 'rgba(20, 20, 20,.7)',
    zIndex: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 16
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
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diceImage: {
    height: 25,
    width: 25
  },
  icon: {
    marginLeft: 12
  },
  subHeader: {
    width: '100%',
    paddingHorizontal: 18
  },
  infoTopBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  activity: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  detailsRowLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,  
  },
  rating: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 4
  },
  address: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 4
  },
  detailsRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
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
  },
  mainContnent: {
    flex: 1,
    backgroundColor: '#2c2c2c'
  },
  noPosts: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default SinglePlaceScreen
