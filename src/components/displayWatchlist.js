import React, { useState, useEffect, use } from 'react'; // Correct import statement

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
  ListItem
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import UserInfo from '@/components/userInfo';
import CreateWatchList from '@/components/createWatchList';
import { db, addDoc, collection, getDocs, auth, query, where } from '../configure/firebase.js';

export const DisplayList = () => {
  const [watchlists, setWatchlists] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [movieDetail, setMovieDetail] = useState([]);
  const [listID, setListID] = useState('');
  const handleMouseEnter = (movieTitle) => {
    setHoveredMovie(movieTitle);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

//    // use useEffect to make sure the page automatically show the user info
//    useEffect(() => {
//     const getUserInfo = async () => {
      
//       // setup query to get specific user info
//       try {
//         const ListRef = collection(db, "WatchList");
//         // const q = query(ListRef, where("email", "==",auth?.currentUser?.email));
//          const q = query(ListRef, where("email", "==",'fwen@ggc.edu'));

//         const querySnapshot = await getDocs(q);
//         const dataArray = [];
//         // get the data array from the querySnapshot only
//         querySnapshot.docs.map((doc) => {
          
//           const data = doc.data();
//           const dataId = doc.id;
//           dataArray.push({...data, id : dataId});
 
//         });
//         setWatchlists(dataArray); // assign the data to a usestate
//       } catch (error) {
//         console.log("Error getting documents: ", error);
//       }
     
//     }
//     getUserInfo()

// }, [watchlists]
// )



//  async function readMovieList  (listID){
//     console.log('listID',listID);
//     const movieRef = collection(db, "WatchList", listID, "MovieDetail");
//     const querySnapshot = await getDocs(movieRef);

//     querySnapshot.forEach((doc, inedx) => {
//       const data = doc.data();
//       const docID = doc.id;
//       movieDetail.push({ ...data, id: docID });
//     });
//     setMovieDetail(movieDetail);
//   }

useEffect(() => {
  const getUserInfo = async () => {
    try {
      const ListRef = collection(db, "WatchList");
      const q = query(ListRef, where("email", "==", auth?.currentUser?.email)); // Replace with your actual email
      const querySnapshot = await getDocs(q);
      const dataArray = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const dataId = doc.id;
        dataArray.push({ ...data, id: dataId });
      }

      // Initialize a 2D array
      const watchlistsWithMovieDetail = await Promise.all(
        dataArray.map(async (watchlist) => {
          const listID = watchlist.id;
          const movieRef = collection(db, "WatchList", listID, "MovieDetail");
          const querySnapshot = await getDocs(movieRef);
          const movieDetail = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const docID = doc.id;
            movieDetail.push({ ...data, id: docID });
          });

          return { ...watchlist, movieDetail };
        })
      );

      setWatchlists(watchlistsWithMovieDetail);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  getUserInfo();
}, []);


return (
  <Box
    border="black 3px solid"
    borderRadius={15}
    width="45rem"
    backgroundColor="#d9d9d9"
  >
    <VStack>
      <Heading color="#000">Your Watchlists</Heading>
      <SimpleGrid columns={3} spacing={10} padding="2rem">
        <Card
          border="solid black 3px"
          width={40}
          height={100}
          borderRadius={20}
          padding={2}
          _hover={{
            backgroundColor: "pink",
            fontSize: "1.5em",
  
          }}
          onClick={onOpen}
        >
          <Stack align="center">
            <Heading fontSize="lg" color="#000">
              Create List
            </Heading>
            <AddIcon />
          </Stack>
        </Card>

        {watchlists.map((list,index) => (
          <Card
            border="solid black 3px"
            width={40}
            height={100}
            borderRadius={10}
            align="left"
            key={list.listName}
          >
            <Box
              overflowY="auto"
              height="100%"
              css={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "black",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: "1",
                  paddingLeft: "5px",
                }}
              >
                <Text align={"center"} color={"Green"} fontWeight={"bold"}>
                  {list.listName}
                </Text>
                <UnorderedList>
                {list.movieDetail.map((movie, index) => (
                  <ListItem>
                  <div key={movie.Title}>
                    <Link
                      _hover={{ color: hoveredMovie === movie.Title ? "green" : "initial", backgroundColor: hoveredMovie === movie.Title ? "pink" : "initial", borderRadius: "5px"}}
                      onMouseEnter={() => handleMouseEnter(movie.Title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {movie.Title}
                    </Link>
                    
                    {hoveredMovie === movie.Title && (
                      <Flex
                        border="solid black 3px"
                        p={2}
                        borderRadius="md"
                        bgColor="gray.200"
                        position="absolute"
                        left="100%"
                        top="0"
                        transition="opacity 0.2s"
                        zIndex={1}
                        width={"100%"}
                        height={"250%"}
                      
                      >
                        <Box margin={"1em"} align={'center'}>
                          <Text fontWeight={"bold"} >{movie.Title}</Text>
                          <Image
                          src={movie.image}
                          width={"200px"}
                          height={"180px"}
                        />
                        </Box>
                       
                      </Flex>
                    )}
                  </div>
                  </ListItem>
                ))}
                
                </UnorderedList>
                
              </div>
            </Box>
          </Card>
        ))}
        
      </SimpleGrid>
    </VStack>
    <CreateWatchList isOpen={isOpen} onClose={onClose} />
  </Box>
);
}