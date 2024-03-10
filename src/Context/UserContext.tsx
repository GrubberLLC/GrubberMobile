import { getCurrentUser, signIn, signOut, signUp } from 'aws-amplify/auth';
import React, { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { BASE_URL } from '@env'
import { AppState } from 'react-native';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [loadingLogin, setLoadingLogin] = useState(false)

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const grabUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      updateLoginStatus(currentUser.userId)
      await getUserProfile(currentUser.userId); // Assuming getUserProfile returns a promise
      return currentUser; // Optionally return user or some indication of success
    } catch (err) {
      throw err; // Rethrow or handle error as needed
    }
  };

  const signInUser = (username: string, password: string) => {
    setLoadingLogin(true)
    signIn({username, password})
      .then((response) => {
        grabUser()
      })
      .catch((error) => {
        setLoadingLogin(false)
        setInvalidLogin(true)
        console.log(error)
      })
  }

  const signOutUser = (user_id: string) => {
    updateLogoutStatus(user_id)
    signOut()
      .then(response => {
        setUser(null)
      })
      .catch(response => {
      })
  }

  const getUserProfile = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/${user_id}`
    axios.get(url)
      .then(response => {
        setProfile(response.data[0])
        setLoadingLogin(false)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const updateLoginStatus = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/loggedIn/${user_id}`
    let body = {
      status: 1
    }
    axios.put(url, body)
      .then(response => {
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const updateLogoutStatus = (user_id: string) => {
    let url = `https://grubberapi.com/api/v1/profiles/loggedIn/${user_id}`
    let body = {
      status: 0
    }
    axios.put(url, body)
      .then(response => {
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const getUserFavorites = (user_id: string) => {
    setFavorites([])
    let url = `https://grubberapi.com/api/v1/favorites/user/${user_id}`
    axios.get(url)
      .then(response => {
        setFavorites(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  const updateUserProfile = (user_id: string, profileData: any) => {
    let url = `https://grubberapi.com/api/v1/profiles/${user_id}`
    axios.put(url, profileData)
      .then(response => {
        setProfile(response.data)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error;
      });
  }

  return (
    <UserContext.Provider value={{ user, 
                                   profile,
                                   invalidLogin,
                                   favorites,
                                   loadingLogin,
                                   grabUser, 
                                   signOutUser, 
                                   signInUser,
                                   getUserProfile,
                                   updateUserProfile,
                                   getUserFavorites }}>
      {children}
    </UserContext.Provider>
  );
};