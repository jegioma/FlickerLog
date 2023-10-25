import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AvatarProfilePicture from './avatar'; // Correct import path for AvatarProfilePicture component
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../configure/firebase'; // Firebase import for fetching user data

const backgroundImageUrl =
  'https://d28htnjz2elwuj.cloudfront.net/wp-content/uploads/2019/03/11123440/Georgia-Gwinnett-College-221x221.jpg';

const UserInfo = ({ registeredUserName }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    async function fetchUserAvatar() {
      try {
        const userDocRef = doc(db, 'Users', registeredUserName);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.avatarUrl) {
            setSelectedAvatar(userData.avatarUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching user avatar: ', error);
      }
    }

    fetchUserAvatar();
  }, [registeredUserName]);

  function signOutUser() {
    router.push('/login');
  }

  const handleAvatarChange = async (avatarUrl) => {
    setIsModalOpen(false); // Close the modal first
    try {
      // Fetch user document reference
      const userDocRef = doc(db, 'Users', registeredUserName);

      // Update user document with new avatar URL
      await updateDoc(userDocRef, {
        avatarUrl: avatarUrl,
      });

      // Set new avatar URL in local state
      setSelectedAvatar(avatarUrl);
      console.log('Avatar saved successfully:', avatarUrl);
    } catch (error) {
      console.error('Error updating user avatar:', error);
    }
  };

  return (
    <Grid templateRows="1fr 6fr 1fr" templateColumns="1fr 6fr 1fr" gap={2} height="100vh">
      <GridItem colSpan={1} />
      <GridItem rowSpan={3} colSpan={1}>
        <Box border="seagreen 3px solid" width="30rem" height="30em" borderRadius="15px" position="relative">
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundImage={`url(${backgroundImageUrl})`}
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            zIndex="-1"
          />

          <VStack spacing="2rem" p="2rem" zIndex="1" marginTop="-2em">
            <Heading color="#000">{`User Name: ${registeredUserName}`}</Heading>
            <Box
              borderRadius="15px"
              overflow="hidden"
              borderColor="seagreen"
              borderWidth="5px"
              width="200px"
              height="200px"
              marginTop="-2em"
            >
              <Image src={selectedAvatar || '/alien.png'} alt="avatar image" objectFit="cover" width="100%" height="100%" />
            </Box>
            <Text color="seagreen" fontWeight="bold" fontSize="20px" marginTop="3.5em">
              Member Since: Member Since Date
            </Text>
            <Button onClick={() => setIsModalOpen(true)} colorScheme="orange" marginTop="-2rem">
              Edit Avatar
            </Button>
            <Button onClick={signOutUser} colorScheme="red" marginTop="-1.5rem">
              Log Out
            </Button>
          </VStack>
        </Box>
      </GridItem>
      <GridItem colSpan={1} />

      <AvatarProfilePicture isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAvatarChange} />
    </Grid>
  );
};

export default UserInfo;
