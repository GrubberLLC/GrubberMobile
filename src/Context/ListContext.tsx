import React, { createContext, useState } from 'react';
import axios from 'axios'
import { BASE_URL } from '@env';

export const ListContext = createContext(null);

export const ListContextProvider = ({ children }) => {
  const [userLists, setUserLists] = useState([]);
  const [listPlaces, setListPlaces] = useState([])

  const getUserLists = (user_id: string) => {
    const url = `https://grubberapi.com/api/v1/lists/user/${user_id}`
    axios.get(url)
      .then(response => {
        setUserLists(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  };

  const getListPlaces = (list_id: string) => {
    const url = `https://grubberapi.com/api/v1/placeinlist/list/${list_id}`
    axios.get(url)
      .then(response => {
        setListPlaces(response.data)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error;
      });
  }

  const createMember = (memberData: any) => {
    const url = `https://grubberapi.com/api/v1/members/`
    axios.post(url, memberData)
      .then(response => {
        setUserLists(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        throw error;
      });
  }

  return (
    <ListContext.Provider value={{ userLists, 
                                   setUserLists,
                                   getUserLists,
                                   createMember,
                                   getListPlaces,
                                   listPlaces}}>
      {children}
    </ListContext.Provider>
  );
};