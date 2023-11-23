import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import {
  db,
  collection,
  getDocs,
  auth,
  query,
  where,
} from "../configure/firebase.js";
import { useRouter } from 'next/router';
import SearchFriend from "./searchFriends.js";

export const FriendList = ({ userID, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friendList, setFriendList] = useState([]);
  const [friendUrlAndName, setFriendUrlAndName] = useState([]);
  const router = useRouter();

  const getFriendData = useCallback(async (friendEmail, friendListID) => {
    const q = query(collection(db, "Users"), where("email", "==", friendEmail));
    const querySnapshot = await getDocs(q);
    const friendData = [];

    querySnapshot.forEach((doc) => {
      friendData.push({...doc.data() , friendListID});
    });

    return friendData;
  }, []);

  const getFriendDataForAll = useCallback(async (friends) => {
    try {
      const allFriendData = await Promise.all(
        friends.map((friend, index) => getFriendData(friend.email, friend.friendListID))
      );
      setFriendUrlAndName(allFriendData.flat());
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }, [getFriendData]);

  const getFriendList = useCallback(async (userID) => {
    try {
      const friendListRef = collection(db, "Users", userID, "Following");
      const querySnapshot = await getDocs(friendListRef);
      const friendData = [];

      querySnapshot.forEach((doc,index) => {
        friendData.push({...doc.data(), friendListID: doc.id});
      });

      setFriendList(friendData);
      getFriendDataForAll(friendData);
      console.log("friendNameANDurl", friendUrlAndName);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }, [getFriendDataForAll, friendUrlAndName]);

  useEffect(() => {
    console.log('how many times2')
    if (userID) {
      setFriendList([]);
      getFriendList(userID);
    }
  }, [userID, getFriendList]);

  // pass the objects to the new page when reroute
  function routeToFriendProfile(userEmail,friendEmail,friendName,friendID,userID){
    const queryParams = new URLSearchParams();
    queryParams.append('userEmail', userEmail);
    queryParams.append('friendEmail', friendEmail);
    queryParams.append('friendName', friendName);
    queryParams.append('friendID', friendID);
    queryParams.append('userID', userID);
    const queryString = queryParams.toString();

    router.push(`/friendProfile?${queryString}`);
  }

  return (
    <SimpleGrid columns={3} spacing={0} borderRadius={15} 
    backgroundColor="#d9d9d9"
    >
      {friendUrlAndName.map((friend, index) => (
        <Box key={friend.userName}>
          <Flex direction="column" alignItems="center">
            <Image
              src={friend.Url}
              alt={friend.Url}
              boxSize="50px"
              objectFit="cover"
              borderRadius="full"
              margin="3px"
              border={'pink 3px'}
              _hover={{ border: "yellow 3px solid" }}
              onClick={(e)=>{routeToFriendProfile(email,friend.email,friend.userName,friend.friendListID,userID)}}
            />
            <Text align="center" mt={1} fontSize="sm">
              {friend.userName}
            </Text>
          </Flex>
        </Box>
      ))}
      
      <Flex direction="column" alignItems="center"> 
        <Image              // this is for the add user function
          alt="add user"
          src="add-user.png"  
          boxSize="50px"
          objectFit="cover"
          borderRadius="full"
          margin="3px"
          _hover={{ border: "yellow 3px solid" }}
          onClick={onOpen}
        />
        <Text align="center" mt={1} fontSize="sm" color="green">
          Add Friend
        </Text>
      </Flex>
      <SearchFriend isOpen={isOpen} onClose={(e)=>{onClose(), getFriendList(userID)} } />
    </SimpleGrid>
  );
};
