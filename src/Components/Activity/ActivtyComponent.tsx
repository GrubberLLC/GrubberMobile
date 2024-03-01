import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { UserContext } from '../../Context/UserContext'

const ActivtyComponent = (props) => {

  const { activity } = props

  const { user } = useContext(UserContext)

  function convertDateToDaysOrHours(dateString: string) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    
    if (differenceInHours < 24) {
      return `Today`;
    } else {
      const differenceInDays = differenceInHours / 24;
      return `${Math.floor(differenceInDays)} days ago`;
    }
  }

  const replaceNameWithPronoun = (str: string) => {
    return str.replace(user.username, 'You')
  }

  return (
    <View style={styles.profile}>
      <View style={styles.profileSections}>
        <View style={styles.profilePicture}>
          <Image style={styles.profilePicture} source={{uri: activity.picture}}/>
        </View>
      </View>
      <View style={styles.profileNames}>
        <Text style={styles.username}>{replaceNameWithPronoun(activity.activity)}</Text>
        <Text style={styles.profilename}>{convertDateToDaysOrHours(activity.created_at)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  profilePicture: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor:'lightgrey',
    marginRight: 12,
    overflow: 'hidden'
  },
  profileNames: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilename: {
    fontSize: 16,
    marginTop: 2
  },
  removeContainer: {
    borderRadius: 32 ,
    backgroundColor: 'lightgrey',
    padding: 6
  },
  remove: {
    color: 'black',
    height: 32,
    width: 32,
    padding: 8
  },
  modal: {
    backgroundColor: 'lightgrey'
  },
  selection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rejectRequest: {
    backgroundColor: 'lightgrey',
    padding: 4,
    borderRadius: 20
  },
  acceptRequest: {
    backgroundColor: '#e94f4e',
    padding: 4,
    borderRadius: 20,
    marginLeft: 8
  }
})

export default ActivtyComponent
