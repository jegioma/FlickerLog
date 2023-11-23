import React, { useState, useEffect, use } from 'react'; // Correct import statement

import {
  Box,
  SimpleGrid,
  VStack,
  Stack,
  Text,
  Heading,
  Image,
  Card,
  useDisclosure,
  Link,
  Flex,
  UnorderedList,
  ListItem,
  Button,
  HStack,
  Icon,

} from '@chakra-ui/react';
import { AddIcon,DeleteIcon  } from '@chakra-ui/icons';
import UserInfo from '@/components/userInfo';
import CreateWatchList from '@/components/createWatchList';
import { db, addDoc, collection, getDocs, auth, query, where,deleteDoc,doc } from '../configure/firebase.js';
import { useRouter } from 'next/router.js';

export const DisplayList = ({email}) => {
  const [watchlists, setWatchlists] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const router = useRouter();


  // handle the mouse enter and leave event for the pop out movie detail
  const handleMouseEnter = (movieTitle) => {
    setHoveredMovie(movieTitle);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };



useEffect(() => {
  getWatchInfo();
}, []);


// get the movie detail from database and store it into a array
const getWatchInfo = async () => {
  try {
    const ListRef = collection(db, "WatchList");
    const q = query(ListRef, where("email", "==", auth?.currentUser?.email)); 
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


  // function to delete the watchlist from the database
  const deleteList = async (listID) => {
    try{
    await deleteDoc(doc(db, "WatchList", listID));

      console.log("List successfully deleted!");
      getWatchInfo();
    } catch (error) {
      console.log("Error deleting documents: ", error);
    }

  }


  // function to delete movie from the list when click trashcan icon
  const deleteMovie = async (listID,movieID) => {
    console.log('watch list',watchlists)
    try{
    await deleteDoc(doc(db, "WatchList", listID, "MovieDetail", movieID));

      console.log("Movie successfully deleted!");
      getWatchInfo();
    } catch (error) {
      console.log("Error deleting documents: ", error);
    }
  }

return (
  <Box
    border="white 3px solid"
    borderRadius={15}
    width="45rem"
    background={'#e8e8e8'}
    
    
  >
    <VStack>
      <Heading color="#000">Your Watchlists</Heading>
      <SimpleGrid columns={2} spacing={18} padding="2rem">
        <Card
          border="solid black 3px"
          width={'280px'}
          height={'150px'}
          borderRadius={10}
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
            width={'280px'}
            height={'150px'}
            borderRadius={10}
            
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
                <Box align={'center'}>
                
                <Text color={"Black"} fontWeight={"bold"}  align={'center'} fontSize={'1.2em'}>
                  {list.listName}
                </Text>
                
                <Button color='Black' backgroundColor={'white'} borderRadius={'5px'} _hover={{color:'red', backgroundColor:'#fffc96'}} onClick={(e)=>{deleteList(list.id)}} height={'15px'} >Remove List</Button>
                </Box>
                <UnorderedList>
                {list.movieDetail.map((movie, index) => (
                  <ListItem key={movie.id}>
                  <div >
                    <HStack justifyContent={'space-between'}>
                    <Link
                      _hover={{ color: hoveredMovie === movie.id ? "green" : "initial", backgroundColor: hoveredMovie === movie.id ? "#fada91" : "initial", borderRadius: "5px"}}
                      onMouseEnter={() => handleMouseEnter(movie.id)}
                      onMouseLeave={handleMouseLeave}
                      onClick={(e) => {
                        router.push({
                          pathname: "/detailsPage", 
                          query: {
                            name: movie.Title || movie.Name, 
                            id: movie.imbID, 
                            type: movie.Type, 
                          },
                        });
                      }
                    }
                    >
                      {movie.Title}
                    </Link>
                   
                    <DeleteIcon height={'15px'} backgroundColor={'white'} onClick={(e)=>{deleteMovie(list.id,movie.id)}} _hover={{boxSize:'20px'}} marginRight={'10px'}/>
                    </HStack>
                    {hoveredMovie === movie.id && (
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
                        width={"80%"}
                        height={"200%"}
                      
                      >
                        <Box margin={"1em"} align={'center'}>
                          <Text fontWeight={"bold"} >{movie.Title}</Text>
                          <Image
                          src={movie.image}
                          alt={movie.Title}
                          width={"200px"}
                          height={"200px"}
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
    <CreateWatchList isOpen={isOpen} onClose={(e)=>{onClose();getWatchInfo()}}  email ={email}/>
  </Box>
);
}