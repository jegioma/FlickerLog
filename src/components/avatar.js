import React, { useState, useEffect } from 'react';
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

import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const AvatarProfilePicture = ({ isOpen, onClose, onSave }) => {
  const [imageSets, setImageSets] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storage = getStorage();
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
        setError('Error fetching images. Please try again later.');
      });
  }, []);

  const handleAvatarSelection = (avatarUrl) => {
    console.log('Selected Avatar:', avatarUrl);
    setSelectedAvatar(avatarUrl);
  };

  const saveSelection = async () => {
    if (selectedAvatar) {
      setIsLoading(true);
      try {
        onSave(selectedAvatar); // Ensure onSave is called with the selectedAvatar
        onClose(); // Close the modal after saving the avatar
        console.log('Avatar saved successfully:', selectedAvatar);
      } catch (error) {
        console.error('Error saving avatar:', error);
        setError('Error saving avatar. Please try again later.');
      } finally {
        setIsLoading(false);
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
          {error ? (
            <Box color="red.500">{error}</Box>
          ) : (
            imageSets.map((imageSet, setIndex) => (
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
            ))
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="yellow"
            mr={3}
            _hover={{
              backgroundColor: 'green.500',
            }}
            onClick={saveSelection}
            isDisabled={!selectedAvatar || isLoading || error}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={onClose}
            colorScheme="yellow"
            _hover={{
              backgroundColor: 'red.500',
            }}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarProfilePicture;
