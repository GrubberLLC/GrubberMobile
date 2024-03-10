import React, { useContext, useState } from 'react'
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Bell, ChevronsLeft, ChevronsRight, Plus, Star, X } from 'react-native-feather'
import { BASE_URL, YELP_API_KEY } from '@env';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import EditCaptionComponent from '../../Components/Posts/EditCaptionComponent';

const deviceWidth = Dimensions.get('window').width
const ImageWidth = deviceWidth - 32

const AddPostScreen = () => {

  const {profile} = useContext(UserContext)

  const [currentImage, setCurrentImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [visible, setVisible] = useState(false)
  const [place, setPlace] = useState(null)

  const [viewCaption, setViewCaption] = useState(false)

  const toggleCaptionText = (text: string) => {
    setCaption(text)
  }

  const toggleViewCaption = () => {
    setViewCaption(!viewCaption)
  }

  const autoCompleteSearch = async (text: string) => {
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: searchTerm,
      location: profile.location,
      categories: 'type%3A%20restaurant',
      sort_by: 'best_match'
    };
  
    try {
      const response = await axios.get(yelpUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: query,
      });
      console.log(response.data)
      setResults(response.data.businesses)
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
    }
  };

  function limitStringSize(str: string, maxLength = 32) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ChevronsLeft style={{marginRight: 12}} height={24} width={24} color={'white'}/>
        <Text style={styles.headerText}>Create Post</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          {
            currentImage
              ? <View style={styles.image}><Image/></View>
              : <View style={styles.tempImage}><Plus style={styles.icon} height={36} width={36}/></View>
          }
        </View>
        <View style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Caption:</Text>
              <Text style={styles.subText}>{limitStringSize(caption)}</Text>
            </View>
            <TouchableOpacity onPress={toggleViewCaption}>
              <ChevronsRight height={24} width={24} color={'white'}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.subSection}>
            <Text style={styles.labelText}>Place:</Text>
            {/* <TextInput 
              style={styles.input}
              placeholder='write caption here...'
              value={caption}
              placeholderTextColor={'white'}
              onChangeText={toggleCaptionText}
              multiline
            /> */}
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.subSection}>
            <View style={styles.selectedInfo}>
              <Text style={styles.labelText}>Visibility:</Text>
              <Text style={styles.text}>Everyone</Text>
            </View>
            <ChevronsRight height={24} width={24} color={'white'}/>
          </View>
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
  }
})

export default AddPostScreen
