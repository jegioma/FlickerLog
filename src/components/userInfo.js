import {
  Box,
  SimpleGrid,
  GridItem,
  VStack,
  Text,
  Heading,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { db, auth, query, where, getDocs, collection, signOut } from "../configure/firebase.js";
import { useRouter } from "next/router";
import SelectAvatar from "./selectAvatar.js";

export default function UserInfo({ userID, email }) {
  const [userInfo, setUserInfo] = useState([]);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getUserInfo = async () => {
      // setup query to get specific user info
      try {
        const UserRef = collection(db, "Users");
        const q = query(UserRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        // get the data array from the querySnapshot only
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          setUserInfo(data); // assign the data to a usestate
        });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    getUserInfo(); // Call the function directly inside useEffect

  }, [email]); // Add 'email' to the dependency array

  // sign out user and redirect to the login page
  function signOutUser() {
    console.log("sign out");
    signOut(auth);
    router.push("/login");
  }

  return (
    <GridItem height="100%">
      <Box
        border="white 3px solid"
        width="20rem"
        borderRadius={15}
        backgroundColor="#d9d9d9"
      >
        <VStack>
          <Heading color="#000" marginBottom="1rem">
            {userInfo.userName}
          </Heading>
          <Image
            borderRadius="full"
            src={userInfo.Url ? userInfo.Url : "/alien.png"}
            border="dashed cyan 5px"
            alt="avatar image"
            boxSize="150px"
          />
          <Button onClick={onOpen}>Edit Avatar</Button>
          <Text fontWeight={"semibold"}>Member Since:</Text>
          <Text>{userInfo.memberSince}</Text>
          <Button
            onClick={() => {
              signOutUser();
            }}
            colorScheme="yellow"
          >
            Log Out
          </Button>
        </VStack>
      </Box>

      <SelectAvatar
        isOpen={isOpen}
        onClose={() => {
          onClose();
          getUserInfo();
        }}
        userID={userID}
      />
    </GridItem>
  );
}
