import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Bold, ChevronsRight } from 'react-native-feather';
import { UserContext } from '../../Context/UserContext';
import { ListContext } from '../../Context/ListContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListGridComponent = () => {
  const navigation = useNavigation()

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 24 ) / 5; 

  const { user } = useContext(UserContext)
  const { getUserLists, userLists } = useContext(ListContext)

  useEffect(() => {
    getUserLists(user.userId)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.userId) {
        getUserLists(user.userId)
      }
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      {userLists.map((item, index) => {
        return(
          <TouchableOpacity onPress={() => {navigation.navigate('ProfileSingleListScreen', {list: item})}} key={index} style={styles.wrapper}>
            {
              item.picture
                ? <Image style={[styles.image, { width: itemWidth, height: itemWidth }]} source={{ uri: item.picture }} />
                : null
            }
            <View style={{flex: 1, marginLeft: 16}}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={{color: 'white', fontWeight: 'bold', marginTop: 8}}>{item.description}</Text>
            </View>
          </TouchableOpacity>
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
    fontWeight: 'bold'
  }
});

export default ListGridComponent;