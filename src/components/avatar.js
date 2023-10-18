import {React, useState, useRef, useEffect} from 'react';
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
  Card
} from '@chakra-ui/react';

import {db, addDoc, collection,getDocs,auth} from '../configure/firebase.js';



export default function AvatarProfilePicture({ isOpen, onClose }) {
    const [listName, setListName] = useState('');
    const listRef = collection(db, "WatchList");
    const email = auth?.currentUser?.email;


  // Save list information to firebase firestore

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'white'} >
        <ModalHeader>Choose your profile picture</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Card>
            
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='yellow' mr={3} onClick={() => {saveList(); onClose()}}>
            Save
          </Button>
          <Button onClick={onClose} colorScheme='yellow'>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
