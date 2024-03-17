import React, { useContext, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Bell, Check, ChevronsLeft, ChevronsRight, Plus, Star, X } from 'react-native-feather'
import { BASE_URL, YELP_API_KEY } from '@env';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import EditCaptionComponent from '../../Components/Posts/EditCaptionComponent';
import SearchPlaceComponent from '../../Components/Posts/SearchPlaceComponent';
import SelectPostVisibilityComponent from '../../Components/Posts/SelectPostVisibilityComponent';
import SelectListComponent from '../../Components/Posts/SelectListComponent';
import SelectContentComponent from '../../Components/Posts/SelectContentComponent';
import { useNavigation } from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 32

const AddPostScreen = () => {
  const navigation = useNavigation()

  const {profile, user} = useContext(UserContext)

  const [media, setMedia] = useState(null)
  const [caption, setCaption] = useState('')
  const [visible, setVisible] = useState(2)
  const [place, setPlace] = useState(null)
  const [list, setList] = useState(null)

  const [loading, setLoading] = useState(false)

  const [viewContent, setViewContent] = useState(false)
  const [viewCaption, setViewCaption] = useState(false)
  const [viewPlace, setViewPlace] = useState(false)
  const [viewVisibility, setViewVisibility] = useState(false)
  const [viewLists, setViewLists] = useState(false)

  const toggleCaptionText = (text: string) => {
    setCaption(text)
  }

  const toggleViewCaption = () => {
    setViewCaption(!viewCaption)
  }

  const toggleViewPlace = () => {
    setViewPlace(!viewPlace)
  }

  const toggleViewVisible = () => {
    setViewVisibility(!viewVisibility)
  }
  
  const toggleViewList = () => {
    setViewLists(!viewLists)
  }

  const toggleViewImage = () => {
    setViewContent(!viewContent)
  }

  const addPost = () => {
    checkIfPlaceInDatabase()
  }

  const checkIfPlaceInDatabase = () => {
    setLoading(true)
    const url = `https://grubberapi.com/api/v1/places/check/${place.id}`
    axios.get(url)
      .then(response => {
        response.data.length === 0
          ? addToPlaces(place, list)
          : submitPost(response.data[0].place_id)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const addToPlaces = (place: any, list: any) => {
    let url = `https://grubberapi.com/api/v1/places/`
    const formatted_address = `${place.location.address1} ${place.location.city}, ${place.location.state} ${place.location.zip_code}`
    const placeData = {
      name: place.name,
      phone: place.phone,
      address_street: place.location.address1,
      address_city: place.location.city,
      address_state: place.location.state,
      address_zipcode: place.location.zip_code,
      address_formatted: formatted_address,
      rating: place.rating,
      review_count: place.review_count,
      picture: place.image_url,
      price: place.price,
      yelp_url: place.url,
      yelp_id: place.id
    }
    axios.post(url, placeData)
      .then(response => {
        submitPost(response.data.id)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const submitPost = (place_id: number) => {
    let url = `https://grubberapi.com/api/v1/posts/`
    const postData = {
      user_id: user.userId,
      media_url: media,
      place_id: place_id,
      list_id: list.list_id,
      caption: caption,
      likes: 0,
      location: null,
      visible: 2,
      boosted: 0,
    }
    axios.post(url, postData)
      .then(response => {
        setLoading(false)
        navigation.goBack()
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false)
        throw error;
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <ChevronsLeft style={{marginRight: 12}} height={24} width={24} color={'white'}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Post</Text>
      </View>
      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={toggleViewImage} style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Media</Text>
            </View>
            <TouchableOpacity onPress={toggleViewImage}>
              <ChevronsRight height={24} width={24} color={'white'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleViewCaption} style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Message</Text>
            </View>
            <TouchableOpacity onPress={toggleViewCaption}>
              <ChevronsRight height={24} width={24} color={'white'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleViewPlace} style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Place</Text>
            </View>
            <TouchableOpacity onPress={toggleViewPlace}>
              <ChevronsRight height={24} width={24} color={'white'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleViewVisible} style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Visibility</Text>
              {
                visible === 2
                  ? <Text style={styles.text}>(Everyone)</Text>
                  : visible === 1
                      ? <Text style={styles.text}>(Friends)</Text>
                      : <Text style={styles.text}>(Private)</Text>
              }
            </View>
            <TouchableOpacity onPress={toggleViewVisible}>
              <ChevronsRight height={24} width={24} color={'white'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleViewList} style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Lists</Text>
            </View>
            <TouchableOpacity onPress={toggleViewList}>
              <ChevronsRight height={24} width={24} color={'white'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.samplePost}>
          <View style={styles.sampleHeader}>
            <Text style={styles.sampleHeaderText}>Post:</Text>
          </View>
          {
            media === null 
              ? null
              : <View>
                  <Image style={styles.mediaImage} source={{uri: media}}/>
                  <View style={styles.overlay}>{list === null ? null : <View style={styles.listTextContainer}><Text style={styles.listText}>{list.name}</Text></View>}</View>
                </View>
          }
          {
            place === null 
              ? null 
              : <View style={styles.samplePlace}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Image style={styles.samplePlaceImage} source={{uri: place.image_url}}/>
                    <View style={{marginLeft: 16}} >
                      <View>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{place.name}</Text>
                      </View>
                      <View style={styles.buttonRow}>
                        <Star style={{marginRight: 5}} height={24} width={24} color={'#e94f4e'} fill={'#e94f4e'}/>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>{place.rating}/5</Text>
                        <Text style={{marginRight: 12, color: 'white', fontWeight: '700', fontSize: 16}}>({place.review_count} Reviews)</Text>
                      </View>
                    </View>
                  </View>
                </View>
          }
          {
            caption === ''
              ? null
              : <View style={{width: '100%', paddingVertical: 16}}><Text style={{color: 'white', fontSize: 16}}>{caption}</Text></View>
          }
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {addPost()}}>
            <Text style={styles.label}>{loading ? <ActivityIndicator size={'small'} color={'black'}/> : 'Share Post'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        style={styles.modal}
        animationType='slide'
        transparent={true}
        visible={viewCaption}
      >
        <EditCaptionComponent caption={caption} setCaption={setCaption} viewCaption={viewCaption} setViewCaption={setViewCaption}/>
      </Modal>
      <Modal
        style={styles.modal}
        animationType='slide'
        transparent={true}
        visible={viewPlace}
      >
        <SearchPlaceComponent setPlace={setPlace} viewPlace={viewPlace} setViewPlace={setViewPlace}/>
      </Modal>
      <Modal
        style={styles.modal}
        animationType='slide'
        transparent={true}
        visible={viewVisibility}
      >
        <SelectPostVisibilityComponent visible={visible} setVisible={setVisible} viewVisibility={viewVisibility} setViewVisibility={setViewVisibility}/>
      </Modal>
      <Modal
        style={styles.modal}
        animationType='slide'
        transparent={true}
        visible={viewLists}
      >
        <SelectListComponent list={list} setList={setList} viewLists={viewLists} setViewLists={setViewLists}/>
      </Modal>
      <Modal
        style={styles.modal}
        animationType='slide'
        transparent={true}
        visible={viewContent}
      >
        <SelectContentComponent media={media} setMedia={setMedia} toggleViewImage={toggleViewImage}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1c1c1c',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    backgroundColor: '#1c1c1c'
  },
  imageContainer: {
    height: deviceWidth,
    width: deviceWidth,
    borderTopWidth: 2,
    borderTopColor: '#3d3d3d',
  },
  image: {
    height: deviceWidth,
    width: deviceWidth,
    backgroundColor:'grey'
  },
  tempImage: {
    height: deviceWidth,
    width: deviceWidth,
    backgroundColor:'#1c1c1c',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: 'grey'
  },
  section: {
    width: '100%',
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderBottomColor: '#3d3d3d',
    borderTopColor: '#3d3d3d',
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  subSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    flex: 1,
    marginLeft: 12,
    color: 'white',
    fontSize: 16
  },
  scroll: {
    maxHeight: 200,
    marginTop: 16,
  },
  placeContainer: {
    padding: 8,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  places: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeImageContainer: {
    height: 42,
    width: 42,
    borderRadius: 5,
    marginRight: 16
  },
  placeImage: {
    height: 42,
    width: 42,
    borderRadius: 5,
    backgroundColor: 'grey'
  },
  placeInfo: {
    flex: 1,
    paddingVertical: 12
  },
  placeButtonRow: {
    marginTop: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginLeft: 8,
    fontSize: 18
  },
  subText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16
  },
  button: {
    padding: 8
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
  samplePost: {
    margin: 16,
  },
  sampleHeader: {
    marginBottom: 16
  },
  sampleHeaderText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  mediaImage: {
    height: ImageWidth,
    width: ImageWidth,
    borderRadius: 8
  },
  samplePlace: {
    width: '100%',
    paddingVertical: 16
  },
  samplePlaceImage: {
    height: 55,
    width: 55,
    borderRadius: 5
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  overlay: {
    position: 'absolute',
    height: ImageWidth,
    width: ImageWidth,
    borderRadius: 8,
  },
  listTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden'
  },
  listText: {
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#e94f4e',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 8,
    overflow: 'hidden'
  }
})

export default AddPostScreen
