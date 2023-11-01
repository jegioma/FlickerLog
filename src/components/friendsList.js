import React, { useState, useEffect, use } from "react"; // Correct import statement

import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  HStack,
  Stack,
  Text,
  Heading,
  Image,
  Card,
  IconButton,
  useDisclosure,
  Link,
  Flex,
  UnorderedList,
  ListItem,
  Avatar,
  Wrap,
    WrapItem,
    Button,
  AvatarGroup,
  Input
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import UserInfo from "@/components/userInfo";
import CreateWatchList from "@/components/createWatchList";
import {
  db,
  addDoc,
  collection,
  getDocs,
  auth,
  query,
  where,
} from "../configure/firebase.js";


 export const FriendList = () => {
    const images = [
        { name: "Dan Abrahmov", src: "https://bit.ly/dan-abramov" },
        { name: "Kola Tioluwani", src: "https://bit.ly/kent-c-dodds" },
        { name: "Kent Dodds", src: "https://bit.ly/kent-c-dodds" },
        { name: "Ryan Florence", src: "https://bit.ly/ryan-florence" },
        { name: "Prosper Otemuyiwa", src: "https://bit.ly/prosper-baba" },
        { name: "Christian Nwamba", src: "https://bit.ly/code-beast" },
        { name: "Segun Adebayo", src: "https://bit.ly/sage-adebayo" },
      ];
      

      return (
        <SimpleGrid columns={5} spacing={0} backgroundColor="#d9d9d9" borderRadius={15}>
           
          {images.map((image, index) => (
            <Box key={image.name}>
              <Flex direction="column" alignItems="center">
                <Image
                  key={image.name}
                  src={image.src}
                  alt={image.name}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="full"
                  margin="3px"
                />
                <Text align="center" mt={1} fontSize="sm">
                  {image.name}
                </Text>
              </Flex>
            </Box>
          ))}
           
          
        </SimpleGrid>
      );
    };
    
