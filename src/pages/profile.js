import {
  Box, Grid, GridItem,Flex
} from '@chakra-ui/react';
import UserInfo from '@/components/userInfo';
import { useEffect, useState } from 'react';

import {DisplayList} from '@/components/displayWatchlist';
import { FriendList } from '@/components/friendsList';
import {
  db,
  collection,
  getDocs,
  auth,
  doc,
  where,
  query,
  updateDocRef,
} from "../configure/firebase.js";


export default function Profile() {
  const [userID, setUserID] = useState("");
  const email = auth?.currentUser?.email;
   // get the user's ID of the current login
   useEffect(() => {
    const fetchID = async () => {
      console.log("email", email);
      const q = query(collection(db, "Users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc, index) => {
        setUserID(doc.id);
      });

      console.log("userID", userID);
    };
    fetchID();
  }, [email, userID]);
  return (
    <Box height='100%' width='80%' padding='3rem'>
    <Grid templateColumns='repeat(2, 1fr)' gap={'20%'} height='90%'>
      <GridItem>
        <Flex direction='column' height='100%' >
          <Box marginBottom={'10%'}>
          <UserInfo email={email} userID ={userID}/>
          </Box>
          <FriendList email={email} userID={userID} />

        </Flex>
      </GridItem>
      <GridItem>
        <DisplayList email = {email} userID ={userID}/>
      </GridItem>
    </Grid>
  </Box>
  );
}