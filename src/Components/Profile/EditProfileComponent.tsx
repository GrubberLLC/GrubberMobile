import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import { Plus, RefreshCcw, X } from 'react-native-feather'
import InputFieldComponent from '../General/InputFieldComponent'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext'
import InputSwitchComponent from '../General/InputSwitchComponent'
import { launchImageLibrary } from 'react-native-image-picker'; // Import the function
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { uploadData } from 'aws-amplify/storage';
import MainButton from '../General/MainButton'
import axios from 'axios'
import {BASE_URL} from '@env'


const EditProfileComponent = (props) => {
  const { setEditProfile, editProfile } = props

  const navigation = useNavigation()

  const {profile, user, getUserProfile} = useContext(UserContext)

  const [phone, setPhone] = useState(profile.phone)
  const [location, setLocation] = useState(profile.location)
  const [firstName, setFirstName] = useState(profile.first_name)
  const [lastname, setLastName] = useState(profile.last_name)
  const [picture, setPicture] = useState(profile.profile_picture)
  const [isPublic, setIsPublic] = useState(profile.public === 1 ? true : false)
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  const updatePhone = (text: string) => {
    setPhone(text)
  }

  const updateLocation = (text: string) => {
    setLocation(text)
  }

  const updateFirstName = (text: string) => {
    setFirstName(text)
  }

  const updateLastName = (text: string) => {
    setLastName(text)
  }

  const updateBio = (text: string) => {
    const currentLength = text.length
    currentLength < 255
      ? setBio(text)
      : null
  }

  const updatePublic = () => {
    setIsPublic(!isPublic)
  }

  const updateProfile = (imageUrl: string) => {
    const url = `https://grubberapi.com/api/v1/profiles/${profile.profile_id}`; 
    const profileData = {
      user_id: user.userId,
      username: profile.username,
      email: profile.email,
      profile_picture: imageUrl,
      notification: profile.notification,
      followers: profile.followers,
      following: profile.following,
      full_name: firstName + ' ' + lastname,
      first_name: firstName,
      bio: bio,
      last_name: lastname,
      phone: phone,
      location: location,
      public: isPublic ? 1 : 0,
    }
    axios.put(url, profileData)
      .then(response => {
        getUserProfile(user.userId)
        setEditProfile(!editProfile)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error creating new profile:', error)
      });
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
        setPicture(source);
      }
    });
  };

  const getBlob = () => {
    return fetch(picture.uri)
      .then(response => response.blob()) // Convert the response to a blob
      .catch(error => {
          console.error("Error fetching blob:", error);
          throw error; // Propagate error to be handled later
      });
  };

  const uploadImage = async () => {
    setLoading(true)
    if(picture === profile.profile_picture){
      updateProfile(picture)
    } else {
      try {
          const blob = await getBlob(); // Wait for the blob to be fetched
          // Assuming listImage.fileName and listImage.type are available
          const fileName = picture.fileName;
          const fileType = picture.type;
          const folderName = "profileImages";
  
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
          updateProfile(uploadedImage)
  
      } catch (error) {
          console.log('Error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New list</Text>
          <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <InputFieldComponent 
          palceholder='First Name'
          label='User'
          value={firstName}
          handleFunction={updateFirstName}
          secure={false}
          validation={true}
        />
        <InputFieldComponent 
          palceholder='Last Name'
          label='User'
          value={lastname}
          handleFunction={updateLastName}
          secure={false}
          validation={true}
        />
        <InputFieldComponent 
          palceholder='Phone'
          label='Phone'
          value={phone}
          handleFunction={updatePhone}
          secure={false}
          validation={true}
        />
        <InputFieldComponent 
          palceholder='Location'
          label='MapPin'
          value={location}
          handleFunction={updateLocation}
          secure={false}
          validation={true}
        />
        <InputFieldComponent 
          palceholder='bio'
          label='MessageSquare'
          value={bio}
          handleFunction={updateBio}
          secure={false}
          validation={false}
          multiline={true}
        />
        <InputSwitchComponent 
          palceholder='Public'
          label='Eye'
          value={isPublic}
          handleFunction={updatePublic}
          secure={false}
          validation={true}
        />
        <View>
          <Text style={styles.pictureText}>Add Picture</Text>
          {
            picture === null 
              ? <TouchableOpacity onPress={selectImage} style={styles.placeHolder}><Plus  height={26} width={26} color={'black'}/></TouchableOpacity>
              : <View style={styles.menuOptions}>
                  <Image source={{uri: picture}} style={styles.image} />
                  <View>
                    <TouchableOpacity onPress={selectImage}>
                      <RefreshCcw style={styles.imageIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setPicture(null)}}>
                      <X style={styles.imageIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
          }
        </View>
        <MainButton label={loading ? <ActivityIndicator size={'small'} color={'white'}/> : 'Update Profile'} handleFunction={() => {uploadImage()}}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0'
  },
  content: {
    flex: 1,
    backgroundColor: '#2c2c2c',
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
    fontWeight: 'bold',
    color: 'white'
  },
  pictureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white'
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

export default EditProfileComponent
