import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';

const AvatarProfilePicture = ({ isOpen, onClose, onSave }) => {
  const [imageSets, setImageSets] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const storageRef = ref(storage, 'images1');
    listAll(storageRef)
      .then((result) => {
        const promises = result.items.map((item) => getDownloadURL(item));
        return Promise.all(promises);
      })
      .then((urls) => {
        const sets = [];
        while (urls.length) {
          sets.push(urls.splice(0, 3));
        }
        setImageSets(sets);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, [storage]);

  const handleAvatarSelection = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
  };

  const saveSelection = async () => {
    if (selectedAvatar) {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        try {
          await updateDoc(userDocRef, {
            avatarUrl: selectedAvatar,
          });
          setSelectedAvatar(null);
          onSave(selectedAvatar);
          onClose(); // Close the modal after saving the avatar
          console.log('Avatar saved successfully:', selectedAvatar);
        } catch (error) {
          console.error('Error saving avatar:', error);
          if (error.code === 'permission-denied') {
            console.error('User does not have permission to update avatar.');
          } else {
            console.error('Unknown error occurred while saving avatar.');
          }
        }
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'black'}>
      <ModalHeader color="seagreen">Choose your profile avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {imageSets.map((imageSet, setIndex) => (
            <Grid key={setIndex} templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
              {imageSet.map((avatarUrl, index) => (
                <GridItem key={index}>
                  <Box
                    borderWidth={selectedAvatar === avatarUrl ? '2px' : '0px'}
                    borderColor={selectedAvatar === avatarUrl ? 'green.500' : 'transparent'}
                    cursor="pointer"
                    _hover={{
                      borderColor: 'green.500',
                    }}
                    onClick={() => handleAvatarSelection(avatarUrl)}
                  >
                    <Image
                      src={avatarUrl}
                      alt={`Avatar ${setIndex + 1}-${index + 1}`}
                      boxSize="150px"
                      objectFit="cover"
                    />
                  </Box>
                </GridItem>
              ))}
            </Grid>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="yellow"
            mr={3}
            _hover={{
              backgroundColor: 'green.500', // Change the background color to green when hovered
            }}
            onClick={saveSelection}
            isDisabled={!selectedAvatar}
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            colorScheme="yellow"
            _hover={{
              backgroundColor: 'red.500', // Change the background color to red when hovered
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarProfilePicture;
