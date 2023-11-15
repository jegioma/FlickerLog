import { React, useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  SimpleGrid,
  Flex,
  Text,
} from "@chakra-ui/react";

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

export default function SelectAvatar({ isOpen, onClose,userID,email}) {
  const listRef = collection(db, "Avatar");
  const [avatarList, setAvatarList] = useState([]);
  const [pickedAvatar, setPickedAvatar] = useState("");
  // const [userID, setUserID] = useState("");
  // const email = auth.currentUser.email;

  // save the avatar url to the user's profile
  const saveAvatar = async () => {
    // set the reference to the current user using the userID
    const userRef = doc(db, "Users", userID);
    // update the user's profile with the new avatar url
    await updateDocRef(userRef, {
      Url: pickedAvatar,
    });
    closeWindow(); // Close the modal
  };

  // get the user's ID of the current login
  // useEffect(() => {
  //   const fetchID = async () => {
  //     console.log("email", email);
  //     const q = query(collection(db, "Users"), where("email", "==", email));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc, index) => {
  //       setUserID(doc.id);
  //     });

  //     console.log("userID", userID);
  //   };
  //   fetchID();
  // }, []);

  // get the avatar list from firebase
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(listRef); // list Ref is the avatar collection

      setAvatarList(
        data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id }))
      );
      console.log(avatarList);
    };
    fetchData();
  }, []);

  // set the picked avatar url to the selected avatar
  function setURL(url) {
    setPickedAvatar(url);
  }

  // close the modal and clean up the picked avatar
  function closeWindow() {
    onClose();
    setPickedAvatar(null);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeWindow}>
      <ModalOverlay />
      <ModalContent backgroundColor={"white"} maxW="2xl">
        <ModalHeader>Select Your Avatar</ModalHeader>

        <ModalCloseButton />
        <ModalBody pb={6}>
          <SimpleGrid columns={3} spacing={2}>
            {avatarList &&
              avatarList.map((avatar, index) => (
                <Image
                  key={avatar.Url} // Add a unique key for each image
                  src={avatar.Url} // Assuming `url` is the property in your avatar data
                  alt="Avatar"
                  height={"200px"}
                  width={"200px"}
                  border={"black 3px solid"}
                  borderRadius={"15px"}
                  _hover={{ border: "yellow 3px solid" }}
                  onClick={() => setURL(avatar.Url)} // Use a function here
                />
              ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          {pickedAvatar ? ( // show a little message to indicate which avatar is selected
            <Flex>
              <Text align={"center"} color={"red"} fontWeight={"bold"}>
                You selected:
              </Text>
              <Image src={pickedAvatar}  alt= 'Avatar' width={"50px"} height={"50px"} />
            </Flex>
          ) : null}
          <Button
            colorScheme="yellow"
            mr={3}
            onClick={() => {
              saveAvatar();
              onClose();
            }}
          >
            Save
          </Button>

          <Button
            onClick={(e) => {
              closeWindow();
            }}
            colorScheme="yellow"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
