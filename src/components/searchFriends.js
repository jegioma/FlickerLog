import { React, useState, useRef, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  SimpleGrid,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

import {
  db,
  addDoc,
  doc,
  collection,
  getDocs,
  auth,
  where,
  query,
  or,
  subcollection
} from "../configure/firebase.js";

import ShowAlert from "./alert.js";


export default function SearchFriend({ isOpen, onClose }) {
  const [friendResult, setFriendResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [showError, setShowError] = useState("no");
  const [showGoodAlert, setShowGoodAlert] = useState("no");
  const [errorMessage, setErrorMessage] = useState("");
  const [userID,setUserID] = useState("");
  const [alreadyFollow, setAlreadyFollow] = useState(false);
  const UserRef = collection(db, "Users");
  const email = auth?.currentUser?.email;


  const searchResult = async () => {
    try {
      const q = query(
        UserRef,
        or(
          where("email", "==", searchInput),
          where("userName", "==", searchInput)
        )
      );

      const querySnapshot = await getDocs(q);

      // get the data array from the querySnapshot only
      const dataArray = [];
      querySnapshot.docs.map((doc, index) => {
        console.log("0length");
        const data = doc.data();
        const dataId = doc.id;
        dataArray.push({ ...data, id: dataId });
      });

      if (dataArray.length !== 0) {
        setFriendResult(dataArray);
        setHasResult(true);
        setShowError("no");
        
      } else {
        setFriendResult([]);
        setErrorMessage("No user found");
        setShowGoodAlert("no");
        setShowError("yes");
        
        setHasResult(false);
      }
      
    } catch (error) {
      console.log("Error getting documents: ", error);
    }

  };

  function closeFunctions() {
    onClose(), setFriendResult([]), setShowError("no"),setShowGoodAlert('no'), setAlreadyFollow(false);
  }

 // get the user's ID of the current login
 useEffect(() => {
  console.log('how many time search friend')
  const fetchID = async () => {
    console.log("email", email);
    const q = query(collection(db, "Users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc, index) => {
      setUserID(doc.id);
    });

  };
  fetchID();
}, [email]);

useEffect(() => {
  console.log('1')
  if(friendResult.length != 0){
  validateResult();
  }
  // eslint-disable-next-line
}, [friendResult,]);

// add friend id to the current user's following list
  const followButton = async (id,friendEmail) => {
    if(alreadyFollow){
      setErrorMessage("You are already following this user");
      setShowGoodAlert("no");
      setShowError("yes");
    }
    else{
    const subCollectionRef = collection(db, 'Users', userID, 'Following');
    await addDoc(subCollectionRef, {
      // Add fields to your subcollection document data here
      friendId: id,
      email: friendEmail,
    });
     setShowGoodAlert("yes");
     setShowError("no");
  }

  }

  // handle the shortcut key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchResult();
    }
  };


  // check if the user is already following the searched user
  const validateResult = async () => {
    const friendListRef = collection(db, "Users", userID, "Following");
    const querySnapshot = await getDocs(friendListRef);
    const friendData = [];
    querySnapshot.forEach((doc, index) => {
      friendData.push(doc.data());
    });

    if (friendResult.length != 0) {
    console.log("friend data", friendData);
    console.log("friend result", friendResult[0].email);
  
    // check if at least one element satifies the condition : friend.email == friendResult[0].email (loop)
    const isAlreadyFollowed = friendData.some((friend) => friend.email === friendResult[0].email);
  
    if (isAlreadyFollowed) {
      console.log("already follow");
      setAlreadyFollow(true);
    } else {
      console.log("not following");
      setAlreadyFollow(false);
    }
  }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={closeFunctions}>
      <ModalOverlay />
      <ModalContent backgroundColor={"blue"} color={"white"}>
        <ModalHeader align={"center"}>Searching For User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form>
            <FormControl>
              {showError === "yes"
                ? ShowAlert("error", "Failed!", errorMessage)
                : null}
              {showGoodAlert === "yes"
                ? ShowAlert("success", "Success!", "You successfully follow"):null}
              <Input
                placeholder="Enter the user name or email"
                background={"white"}
                color={"black"}
                onChange={(e) => {
                  setSearchInput(e.target.value.toLowerCase());
                }}
                onKeyDown={handleKeyDown} // Listen for Enter key press
              />
            </FormControl>
          </form>

          <SimpleGrid columns={3} spacing={2}>
            {hasResult &&
              friendResult.map((friend, index) => (
                <Flex key={friend.Url || index} margin={"10px"} align={"center"}>
                  <Image
                    alt="Friend avatar"
                    key={friend.Url} // Add a unique key for each image
                    src={friend.Url ? friend.Url : 'alien.png'} 
                    boxSize={"100%"}
                    border={" 3px solid"}
                    _hover={{ border: "yellow 3px solid" }}
                    borderRadius={"full"}
                    background={"white"}
                  />
                  <Box marginLeft={"50px"}>
                    <Text fontWeight={"bold"}>User Name:</Text>
                    <Text borderBottom={"solid"} borderBottomWidth={"2px"}>
                      {friend.userName}
                    </Text>
                    <Text fontWeight={"bold"}>User Email:</Text>
                    <Text borderBottom={"solid"} borderBottomWidth={"2px"}>
                      {friend.email}
                    </Text>
                  </Box>

                  <Box marginLeft={"30px"}>
                    <Button onClick={(e)=>{followButton(friend.id, friend.email)}}>
                      {alreadyFollow? "Following" : "Follow"}
                      </Button>
                  </Box>
                </Flex>
              ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <Button colorScheme="blue" mr={3} onClick={searchResult}>
            Search
          </Button>
          <Button onClick={closeFunctions} colorScheme="blue">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
