
import React, { useContext, useState } from 'react'
import { Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../Context/UserContext';
import { AlertCircle, Briefcase, ChevronsLeft, ChevronsRight, Edit, Lock, LogOut, Mail, MessageCircle, X } from 'react-native-feather';
import EditProfileComponent from '../../Components/Profile/EditProfileComponent';
import ResetPasswordCompoent from '../../Components/Profile/ResetPasswordCompoent';
import DeleteAccountComponent from '../../Components/Profile/DeleteAccountComponent';
import AboutComponent from '../../Components/Profile/AboutComponent';
import LicenseComponent from '../../Components/General/LicenseComponent';


const SettingsScreen  = () => {
  const navigation = useNavigation()

  const {user, signOutUser} = useContext(UserContext)

  const [editProfile, setEditProfile] = useState(false)
  const [editDeleteAccount, setEditDeleteAccount] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [viewAbout, setViewAbout] = useState(false)
  const [viewLicense, setViewLicense] = useState(false)

  const openURL = async (url: string) => {
    // Check if the link is supported
    const supported = await Linking.canOpenURL(url);
  
    if (supported) {
      // Open the link
      await Linking.openURL(url);
    } else {
      console.error('Don\'t know how to open this URL:', url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.diceImage}>
            <ChevronsLeft height={25} width={25} color={'white'}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile ({user.username})</Text>
          </View>
          <TouchableOpacity onPress={() => {setEditProfile(!editProfile)}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <Edit height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>Edit Profile</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={editProfile}
          >
            <EditProfileComponent editProfile={editProfile} setEditProfile={setEditProfile}/>
          </Modal>
          <TouchableOpacity onPress={() => {setEditPassword(!editPassword)}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <Lock height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>Reset Password</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
        </View>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={editPassword}
        >
          <ResetPasswordCompoent editProfile={editPassword} setEditProfile={setEditPassword}/>
        </Modal>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Support</Text>
          </View>
          <TouchableOpacity onPress={() => {openURL('https://grubber.io/contact')}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <Mail height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>Contact Us</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {openURL('https://grubber.io/faqs')}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <MessageCircle height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>FAQ's</Text>
            </View>
            <ChevronsRight  onPress={() => {openURL('https://www.linkedin.com/company/100541044/admin/feed/posts/')}} height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <Briefcase height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>Careers</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account</Text>
          </View>
          <TouchableOpacity onPress={() => {setViewAbout(!viewAbout)}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <AlertCircle height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>About Grubber</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={viewAbout}
          >
            <AboutComponent editProfile={viewAbout} setEditProfile={setViewAbout}/>
          </Modal>
          <TouchableOpacity onPress={() => {signOutUser(user.userId)}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <LogOut height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>Logout</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setEditDeleteAccount(!editDeleteAccount)}} style={styles.sectionTab}>
            <View style={styles.sectionLeft}>
              <X height={24} width={24} color={'#e94f4e'}/>
              <Text style={styles.tabTitle}>Delete Account</Text>
            </View>
            <ChevronsRight  height={24} width={24} color={'white'}/>
          </TouchableOpacity>
        </View>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={editDeleteAccount}
        >
          <DeleteAccountComponent editProfile={editDeleteAccount} setEditProfile={setEditDeleteAccount}/>
        </Modal>
        <View style={styles.sectionLegal}>
          <View style={styles.legal}>
            <TouchableOpacity onPress={() => {openURL('https://app.termly.io/document/privacy-policy/c216545a-3131-4991-a6aa-23649d3b06a4')}}>
              <Text style={styles.legalTab}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text> - </Text>
            <TouchableOpacity onPress={() => {openURL('https://app.termly.io/document/terms-of-service/4a3f6b3f-58ef-4a5d-a6d5-57a677bfcdf0')}}>
              <Text style={styles.legalTab}>Terms Of Service</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {setViewLicense(!viewLicense)}} style={[styles.legal, {marginTop: 4}]}>
            <Text style={styles.legalTab}>Open Source Licenses</Text>
          </TouchableOpacity>
        </View>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={viewLicense}
        >
          <LicenseComponent editProfile={viewLicense} setEditProfile={setViewLicense}/>
        </Modal>
        <View style={styles.sectionVersion}>
          <View style={styles.legal}>
            <Text style={styles.versionText}>Version 1.0.0 (March 1, 2024)</Text>
          </View>
        </View>
      </ScrollView> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    zIndex: 1
  },
  header: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  post: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    padding: 8
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // manuIcon: {
  //   backgroundColor: 'rgba(200,200,200,.4)',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   borderRadius: 20,
  //   padding: 8
  // },
  // header: {
  //   backgroundColor: 'black',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingVertical: 20,
  //   paddingHorizontal: 16,
  // },
  // post: {
  //   borderBottomColor: 'grey',
  //   borderBottomWidth: 2,
  //   padding: 8
  // },
  // headerText: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: 'bold'
  // },
  // headerIcons: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // subHeader: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 18,
  //   backgroundColor: 'black',
  //   paddingBottom: 30,
  //   borderBottomRightRadius: 24,
  //   borderBottomLeftRadius: 24
  // },
  // settingTitle: {
  //   color: 'white',
  //   fontSize: 28,
  //   fontWeight: 'bold',
  //   marginLeft: 16
  // },
  scroll: {
    flex: 1,
    backgroundColor: '#2c2c2c'
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
  },
  sectionHeader: {
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginHorizontal: 16,
    paddingHorizontal: 8
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    paddingVertical: 8,
  },
  sectionTab: {
    paddingVertical: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  sectionLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabTitle: {
    marginLeft: 6,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  sectionLegal: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  legal: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  legalTab: {
    fontSize: 16,
    color: '#e94f4e',
  },
  sectionVersion: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 16
  },
  versionText: {
    color: 'white'
  }
})

export default SettingsScreen
