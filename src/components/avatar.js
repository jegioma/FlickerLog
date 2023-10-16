import React, { useState } from 'react';
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

const imageSets = [
  [
    'https://i.pinimg.com/564x/87/a8/a3/87a8a378128df67cc09df6eda20be10f.jpg',
    'https://i.pinimg.com/564x/ca/75/3f/ca753f2cd3e13792e5a409d71557d41c.jpg',
    'https://i.pinimg.com/564x/6b/7a/ff/6b7aff1e229346bd29bdb554b704df65.jpg',
  ],
  [
    'https://i.pinimg.com/236x/3f/78/58/3f7858c2bbd696891cddf7b871378c40.jpg',
    'https://i.pinimg.com/564x/5f/5f/3a/5f5f3a8937b4d6353688295a023c47be.jpg',
    'https://i.pinimg.com/564x/bf/73/74/bf7374fdb3b37ed225196ce185c3edb0.jpg',
  ],
];

const AvatarProfilePicture = ({ isOpen, onClose, onSave }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarSelection = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
  };

  const saveSelection = () => {
    console.log('Saving selected avatar:', selectedAvatar);
    onSave(selectedAvatar);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={'white'}>
        <ModalHeader>Choose your profile picture</ModalHeader>
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
          <Button colorScheme="yellow" mr={3} onClick={saveSelection} isDisabled={!selectedAvatar}>
            Save
          </Button>
          <Button onClick={onClose} colorScheme="yellow">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarProfilePicture;
