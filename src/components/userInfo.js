import {
  Box, SimpleGrid, Grid, GridItem, VStack, HStack, Stack, Text, Heading, Image, Card, IconButton,Button, list, filter
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { useEffect, useState } from 'react';
import {db, addDoc, auth, query, where} from '../configure/firebase.js';
import {getDocs, collection} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function UserInfo() {
const  [userInfo, setUserInfo] = useState([]);
const router = useRouter();


  // use useEffect to make sure the page automatically show the user info
  useEffect(() => {
      const getUserInfo = async () => {
        
        // setup query to get specific user info
        try {
          const UserRef = collection(db, "Users");
          const q = query(UserRef, where("email", "==",auth?.currentUser?.email));
          const querySnapshot = await getDocs(q);
         
          // get the data array from the querySnapshot only
          querySnapshot.docs.map((doc) => {
           
            const data = doc.data();
            setUserInfo(data); // assign the data to a usestate
            
           
          });
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
       
          console.log('user:',auth?.currentUser?.email);
       
      }
      getUserInfo()

  }, []
  )

  // sign out user and redirect to login page
  function signOutUser() {
    console.log('sign out');
    signOut(auth)
    //   console.log('Sign-out successful.')
      router.push('/login');
}
  return(
    <GridItem height='100%'>
              <Box border='blue 3px solid' width='20rem' borderRadius={15} backgroundColor='#d9d9d9'>
                <VStack>
                  <Heading color='#000' marginBottom='1rem'>{userInfo.userName}</Heading>
                  <Image 
                    borderRadius='full'
                    src='/alien.png'
                    border='dashed cyan 5px'
                    alt='avatar image'
                    boxSize='150px'
                />
                <Text>Edit Avatar</Text>
                <Text>Member Since:</Text>
                <Text>{userInfo.memberSince}</Text>
                <Button onClick={ (e) =>{signOutUser()}} colorScheme='yellow'>Log Out</Button>
                </VStack>
              </Box>
              

            </GridItem>
  )
  
}