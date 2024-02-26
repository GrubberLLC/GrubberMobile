import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { X } from 'react-native-feather'
import MainButton from '../General/MainButton'
import { deleteUser } from 'aws-amplify/auth'



const DeleteAccountComponent = (props) => {
  const { setEditProfile, editProfile } = props

  const deleteUserAccount = () => {
    deleteUser()
      .then(response => {
        setEditProfile(!editProfile)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Delete Account</Text>
          <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} >
            <X height={26} width={26} color={'#e94f4e'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Are you sure you want to delete your account? This action cannot be undone, and you will lose all your data, including your profile, settings, and any content you have created.</Text>
        </View>
        <MainButton label={'Delete Account'} handleFunction={() => {deleteUserAccount()}}/>
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
    backgroundColor: 'rgba(0,0,0,0'
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
  disclaimerContainer: {
    paddingVertical: 8
  },
  disclaimerText: {
    fontSize: 16,
  }
})

export default DeleteAccountComponent
