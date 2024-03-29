import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { Plus, RefreshCcw, X } from 'react-native-feather'
import InputFieldComponent from '../General/InputFieldComponent'
import MainButton from '../General/MainButton'
import { launchImageLibrary } from 'react-native-image-picker'; // Import the function
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { uploadData } from 'aws-amplify/storage';
import { BASE_URL } from '@env';
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { ListContext } from '../../Context/ListContext'


const PlaceAddComment = (props) => {
  const { place, setAddComment, addComment, grabPlaceComments } = props

  const { user } = useContext(UserContext)
  const { getUserLists, userLists } = useContext(ListContext)

  const [name, setName] = useState('')
  const [commentImage, setCommentImage] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleNameChange = (text: string) => {
    setName(text)
  }

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Gallery Access Permission",
            message: "App needs access to your gallery...",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return (granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // For iOS, permissions are handled by the launchImageLibrary itself
      return true;
    }
  };
  
  const selectImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "You need to grant gallery access permission to select images.");
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName, type: response.assets[0].type, baseImage: response.assets[0].base64 };
        setCommentImage(source);
      }
    });
  };

  const getBlob = () => {
    return fetch(commentImage.uri)
      .then(response => response.blob()) // Convert the response to a blob
      .catch(error => {
          console.error("Error fetching blob:", error);
          throw error; // Propagate error to be handled later
      });
  };

  const uploadImage = async () => {
    setLoading(true)
    try {
        const blob = await getBlob(); // Wait for the blob to be fetched
        // Assuming listImage.fileName and listImage.type are available
        const fileName = commentImage.fileName;
        const fileType = commentImage.type;
        const folderName = "ListImages";

        const fileKey = `${folderName}/${fileName}`;

        // Wait for the uploadData function to complete
        const result = await uploadData({
            key: fileKey,
            data: blob,
            options: {
                accessLevel: 'guest',
            }
        }).result;
    
        let uploadedImage = `https://seekify-storage-da999112230453-staging.s3.us-west-1.amazonaws.com/public/${result.key}`
        createNewComment(uploadedImage)

    } catch (error) {
        console.log('Error:', error);
    }
  };

  const createNewComment = (imageUrl: string) => {
    const url = `https://grubberapi.com/api/v1/comments/`; 
    const list_data = {
      user_id: user.userId,
      image: commentImage === null ? null : imageUrl,
      comment: name,
      rating: null,
      place_favorites_id: null,
      place_list_id: place.pl_id
    }
    axios.post(url, list_data)
      .then(response => {
        newCommentActivity(place)
      })
      .catch(error => {
        console.error('Error creating new profile:', error)
      });
  }

  const newCommentActivity = (place: any) => {
    let url = `https://grubberapi.com/api/v1/activity/`
    const favoritesData = {
      user_id: user.userId,
      activity: `${user.username} commented on ${place.name}`,
      type: 'comment',
      list_id: null,
      favorite_id: null,
      following_id: null,
      comment_id: place.pl_id,
      picture: place.picture
    }
    axios.post(url, favoritesData)
      .then(response => { 
        setLoading(false)
        grabPlaceComments()
        setAddComment(!addComment)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add A Comment</Text>
          <TouchableOpacity onPress={() => {setAddComment(!addComment)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <InputFieldComponent 
          palceholder='Comment'
          label='MessageSquare'
          value={name}
          handleFunction={handleNameChange}
          secure={false}
          validation={true}
        />
        <View>
          <Text style={styles.pictureText}>Add Picture</Text>
          {
            commentImage === null 
              ? <TouchableOpacity onPress={selectImage} style={styles.placeHolder}><Plus  height={26} width={26} color={'black'}/></TouchableOpacity>
              : <View style={styles.menuOptions}>
                  <Image source={commentImage} style={styles.image} />
                  <View>
                    <TouchableOpacity onPress={selectImage}>
                      <RefreshCcw style={styles.imageIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setCommentImage(null)}}>
                      <X style={styles.imageIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
          }
        </View>
        <MainButton label={loading ? <ActivityIndicator size={'small'} color={'white'}/> : 'Create List'} handleFunction={() => {uploadImage()}}/>
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
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 32
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
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
    display: 'flex',
    flexDirection: 'row'
  }
})

export default PlaceAddComment
