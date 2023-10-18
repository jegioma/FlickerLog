import React, { useState, useEffect, use } from 'react'; // Correct import statement

import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  HStack,
  Stack,
  Text,
  Heading,
  Image,
  Card,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import UserInfo from '@/components/userInfo';
import CreateWatchList from '@/components/createWatchList';
import { db, addDoc, collection, getDocs, auth, query, where } from '../configure/firebase.js';

export const DisplayList = () => {
  const [watchlists, setWatchlists] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();


   // use useEffect to make sure the page automatically show the user info
   useEffect(() => {
    const getUserInfo = async () => {
      
      // setup query to get specific user info
      try {
        const ListRef = collection(db, "WatchList");
        const q = query(ListRef, where("email", "==",auth?.currentUser?.email));
        const querySnapshot = await getDocs(q);
        const dataArray = [];
        // get the data array from the querySnapshot only
        querySnapshot.docs.map((doc) => {
          
          const data = doc.data();
          dataArray.push(data);
 
        });
        setWatchlists(dataArray); // assign the data to a usestate
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
     
    }
    getUserInfo()

}, [watchlists]
)
  
    return (

        <Box border='green 3px solid' borderRadius={15} width='45rem' backgroundColor='#d9d9d9'>
            <VStack>
              <Heading color='#000'>Your Watchlists</Heading>
              <SimpleGrid columns={3} spacing={10} padding='2rem'>
                <Card
                  border='solid orange 3px'
                  width={40}
                  height={100}
                  borderRadius={20}
                  padding={5}
                  _hover={{ backgroundColor: 'pink', fontSize: '1.5em', height: '108', width: '42' }}
                  onClick={onOpen} // Use onOpen from useDisclosure
                >
                  <Stack align='center'>
                    <Heading fontSize='lg' color='#000'>
                      Create List
                    </Heading>
                    <AddIcon />
                  </Stack>
                </Card>
                {/* <Card border='solid orange 3px' width={40} height={100} borderRadius={20}></Card>
                <Card border='solid orange 3px' width={40} height={100} borderRadius={20}></Card>
                <Card border='solid orange 3px' width={40} height={100} borderRadius={20}></Card>
                <Card border='solid orange 3px' width={40} height={100} borderRadius={20}></Card> */}
                 {
             watchlists.map((list) => (
            <Card border='solid orange 3px' width={40} height={100} borderRadius={20}>
                <Stack align='center'>
                <Heading fontSize='lg' color='#000'>{list.listName}</Heading>
                </Stack>
              </Card>
            ))
    }
              </SimpleGrid>
            </VStack>
            <CreateWatchList isOpen={isOpen} onClose={onClose} />
          </Box>

    )

  }