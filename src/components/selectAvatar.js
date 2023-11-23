import { React, useState, useEffect } from 'react';
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
  Image,
  SimpleGrid,
  Flex,
  Text
} from '@chakra-ui/react';

import { db, collection, getDocs, auth, doc, where, query, updateDocRef } from '../configure/firebase.js';

export default function SelectAvatar({ isOpen, onClose }) {
  const listRef = collection(db, 'Avatar');
  const [avatarList, setAvatarList] = useState([]);
  const [pickedAvatar, setPickedAvatar] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const fetchID = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const email = currentUser.email;
        console.log("email", email);
        const q = query(collection(db, "Users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc, index) => {
          setUserID(doc.id);
        });
        console.log("userID", userID);
      }
    };
    fetchID();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(listRef);
      setAvatarList(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id })));
      console.log(avatarList);
    };
    fetchData();
  }, [avatarList, listRef]);

  function setURL(url) {
    setPickedAvatar(url);
  }

  const saveAvatar = async () => {
    const userRef = doc(db, 'Users', userID);

    await updateDocRef(userRef, {
      Url: pickedAvatar,
    });

    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'white'} maxW="2xl">
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
                  height={'200px'}
                  width={'200px'}
                  border={'black 3px solid'}
                  borderRadius={'15px'}
                  _hover={{ border: 'yellow 3px solid' }}
                  onClick={() => setURL(avatar.Url)}
                />
              ))}
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          {pickedAvatar ? (
            <Flex>
              <Text align={'center'} color={'red'} fontWeight={'bold'}>
                You selected:
              </Text>
              <Image src={pickedAvatar} width={'50px'} height={'50px'} alt="" />
            </Flex>
          ) : null}
          <Button colorScheme="yellow" mr={3} onClick={() => { saveAvatar(); onClose(); }}>
            Save
          </Button>

          <Button onClick={onClose} colorScheme="yellow">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
