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
} from '@chakra-ui/react';

import {db, addDoc, collection,getDocs,auth} from '../configure/firebase.js';



export default function CreateWatchList({ isOpen, onClose }) {
    const [listName, setListName] = useState('');
    const listRef = collection(db, "WatchList");
    const email = auth?.currentUser?.email;


  // Save list information to firebase firestore
  const saveList = async () => {
   if (listName != ''){
    try{
       await addDoc(listRef, 
         {
           email: email.toLowerCase(),
           listName: listName
         });
        
    }catch(error){
      console.log(error);
     
    }
  }
  onClose
 }


 const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    saveList();
  }
};


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'white'} >
        <ModalHeader>Create your watchlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form >
            <FormControl>
              <FormLabel>Watchlist name:</FormLabel>
              <Input placeholder="Enter the watchlist name" onChange={(e) =>{ setListName(e.target.value)}}
               onKeyDown={handleKeyDown}  // Listen for Enter key press
              
              />
            </FormControl>
          </form>
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
