import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Bold, ChevronsRight } from 'react-native-feather';

const PostGridComponent = ({ posts }) => {
  const navigation = useNavigation()

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 24 ) / 4; 

  function limitStringSize(str: string, maxLength = 85) {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  return (
    <View style={styles.container}>
      {posts.map((image, index) => {
        return(
          <View key={index} style={styles.wrapper}>
            {
              image.media_url === null
                ? null
                : <Image style={[styles.image, { width: itemWidth, height: itemWidth, marginRight: 16 }]} source={{ uri: image.media_url }} />
            }
            <View style={{flex: 1}}>
              <Text style={styles.text}>{limitStringSize(image.caption)}</Text>
              <TouchableOpacity onPress={() => {navigation.navigate('ProfileSinglePostScreen', {item: image})}} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Post Details</Text>
                <ChevronsRight height={20} width={20} color={'white'}/>
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  wrapper: {
    width: '100%',
    padding: 12,
    borderTopColor: 'grey',
    borderTopWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    borderRadius: 8,
    resizeMode: 'cover', // Ensure images fill the square space
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
});

export default PostGridComponent;