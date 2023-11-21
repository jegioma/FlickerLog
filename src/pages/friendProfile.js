import {
  Box,
  Grid,
  GridItem,
  Flex,
  VStack,
  Text,
  Heading,
  Image,
  Card,
  Button,
  UnorderedList,
  ListItem,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  db,
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc
} from "../configure/firebase.js";

export default function useFriendProfile() {
  const router = useRouter();
  const { userEmail,friendEmail,friendName,friendID,userID} = router.query;
  return (
    <Box height="100%" width="80%" padding="3rem">
      <Grid templateColumns="repeat(2, 1fr)" gap={"20%"} height="90%">
        <GridItem>
          <Flex direction="column" height="100%">
            <Box marginBottom={"10%"}>
              <FriendInfo email={friendEmail} userID={userID} friendID={friendID} />
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <DisplayFirendWatchList friendEmail={friendEmail} friendName={friendName} />
        </GridItem>
      </Grid>
    </Box>
  );
}



// compinent to display friend info
function FriendInfo({ email,userID,friendID }) {
  const [friendInfo, setFriendInfo] = useState([]);
  const router = useRouter();
  // use useEffect to make sure the page automatically show the user info
  useEffect(() => {
    console.log("friendID", friendID);
    getFriendInfo();
  }, []);
  const getFriendInfo = async () => {
    // setup query to get specific user info
    try {
      const UserRef = collection(db, "Users");
      const q = query(UserRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      // get the data array from the querySnapshot only
      querySnapshot.docs.map((doc) => {
        const data = doc.data();
        setFriendInfo(data); // assign the data to a usestate
      });
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };


  const unfollowFriend = async () => {
    try {
      const friendRef = doc(db, "Users", userID, "Following",friendID);
      console.log('friendRef',friendRef)
       await deleteDoc(friendRef)
       console.log('unfollowed friend')
       router.push('/profile')
    } catch (error) {
        console.log("Error getting documents: ", error);
        }
}

  return (
    <GridItem height="100%">
      <Box
        border="black 3px solid"
        width="20rem"
        borderRadius={15}
        backgroundColor="#d9d9d9"
      >
        <VStack>
          <Heading color="#000" marginBottom="1rem">
            {friendInfo.userName}
          </Heading>
          <Image
            borderRadius="full"
            src={friendInfo.Url ? friendInfo.Url : "/alien.png"}
            border="dashed cyan 5px"
            alt="avatar image"
            boxSize="150px"
          />
          <Text>Member Since:</Text>
          <Text>{friendInfo.memberSince}</Text>
          <Button colorScheme="yellow" onClick={unfollowFriend}>Unfollow Friend</Button>
        </VStack>
      </Box>
    </GridItem>
  );
}


// component to display friends watchlist
const DisplayFirendWatchList = ({ friendEmail,friendName}) => {
  const router = useRouter();
  const [watchlists, setWatchlists] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const handleMouseEnter = (movieID) => {
    setHoveredMovie(movieID);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  useEffect(() => {
    console.log("1");

    getWatchInfo();
  }, []);

  const getWatchInfo = async () => {
    try {
      const ListRef = collection(db, "WatchList");
      const q = query(ListRef, where("email", "==", friendEmail));
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




  return (


    <Box
      border="black 3px solid"
      borderRadius={15}
      width="45rem"
      backgroundColor="#d9d9d9"
    >
      <VStack>
        <Heading color="#000">{friendName}&apos;s Watchlists</Heading>
        <SimpleGrid columns={2} spacing={18} padding="2rem">
          {watchlists.map((list, index) => (
            <Card
              border="solid black 3px"
              width={"280px"}
              height={"150px"}
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
                  <Box align={"center"}>
                    <Text
                      color={"Black"}
                      fontWeight={"bold"}
                      align={"center"}
                      fontSize={"1.2em"}
                    >
                      {list.listName}
                    </Text>
                  </Box>
                  <UnorderedList>
                    {list.movieDetail.map((movie, index) => (
                      <ListItem key={movie.Title}>
                        <div>
                          <Link
                            _hover={{
                              color:
                                hoveredMovie === movie.id
                                  ? "green"
                                  : "initial",
                              backgroundColor:
                                hoveredMovie === movie.id
                                  ? "pink"
                                  : "initial",
                              borderRadius: "5px",
                            }}
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
                            }}
                          >
                            {movie.Title}
                          </Link>

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
                              <Box margin={"1em"} align={"center"}>
                                <Text fontWeight={"bold"}>{movie.Title}</Text>
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
    </Box>
  );
};
