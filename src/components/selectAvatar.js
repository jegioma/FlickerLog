import { React, useState, useEffect } from "react";
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
  doc,
  updateDoc,
} from "../configure/firebase.js";

export default function SelectAvatar({ isOpen, onClose, userID }) {
  const listRef = collection(db, "Avatar");
  const [avatarList, setAvatarList] = useState([]);
  const [pickedAvatar, setPickedAvatar] = useState("");

  // get the avatar list from firebase
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(listRef);
      setAvatarList(
        data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchData();
  }, [listRef]);

  // set the picked avatar url to the selected avatar
  function setURL(url) {
    setPickedAvatar(url);
  }

  // close the modal and clean up the picked avatar
  function closeWindow() {
    onClose();
    setPickedAvatar(null);
  }

  // save the avatar url to the user's profile
  const saveAvatar = async () => {
    const userRef = doc(db, "Users", userID);
    await updateDoc(userRef, {
      Url: pickedAvatar,
    });
    closeWindow(); // Close the modal
  };

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
                  key={avatar.Url}
                  src={avatar.Url}
                  alt="" // <-- Add an empty string for decorative images
                  height={"200px"}
                  width={"200px"}
                  border={"black 3px solid"}
                  borderRadius={"15px"}
                  _hover={{ border: "yellow 3px solid" }}
                  onClick={() => setURL(avatar.Url)}
                />
              ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          {pickedAvatar ? (
            // show a little message to indicate which avatar is selected
            <Flex>
              <Text align={"center"} color={"red"} fontWeight={"bold"}>
                You selected:
              </Text>
              <Image
                src={pickedAvatar}
                alt="Avatar"
                width={"50px"}
                height={"50px"}
              />
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
            onClick={() => {
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
