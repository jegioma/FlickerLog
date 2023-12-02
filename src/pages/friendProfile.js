// Import necessary modules and components
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Text,
  Heading,
  Image,
  Button,
  UnorderedList,
  ListItem,
  Link,
  SimpleGrid,
  Flex,
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
  deleteDoc,
} from "../configure/firebase.js";

// Define unfollowFriend function
const unfollowFriend = async (userID, friendID, router) => {
  try {
    const friendRef = doc(db, "Users", userID, "Following", friendID);
    await deleteDoc(friendRef);
    router.push("/profile");
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
};

export default function FriendProfile() {
  const router = useRouter();
  const { userEmail, friendEmail, friendName, friendID, userID } = router.query;

  // Component to display friend info
  function FriendInfo({ email, userID, friendID }) {
    const [friendInfo, setFriendInfo] = useState([]);

    useEffect(() => {
      const getFriendInfo = async () => {
        try {
          const UserRef = collection(db, "Users");
          const q = query(UserRef, where("email", "==", email));
          const querySnapshot = await getDocs(q);

          querySnapshot.docs.map((doc) => {
            const data = doc.data();
            setFriendInfo(data);
          });
        } catch (error) {
          console.log("Error getting documents: ", error);
        }
      };

      getFriendInfo();

      // Clean up function if needed
      return () => {
        // Your cleanup code here
      };
    }, [friendID, email, userID]);

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
            <Button
              colorScheme="yellow"
              onClick={() => unfollowFriend(userID, friendID, router)}
            >
              Unfollow Friend
            </Button>
          </VStack>
        </Box>
      </GridItem>
    );
  }

  // Component to display friend's watchlist
  const DisplayFriendWatchList = ({ friendEmail, friendName }) => {
    const [watchlists, setWatchlists] = useState([]);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const router = useRouter();

    const handleMouseEnter = (movieID) => {
      setHoveredMovie(movieID);
    };

    const handleMouseLeave = () => {
      setHoveredMovie(null);
    };

    useEffect(() => {
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

          const watchlistsWithMovieDetail = await Promise.all(
            dataArray.map(async (watchlist) => {
              const listID = watchlist.id;
              const movieRef = collection(
                db,
                "WatchList",
                listID,
                "MovieDetail"
              );
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

      getWatchInfo();

      // Clean up function if needed
      return () => {
        // Your cleanup code here
      };

    }, [friendEmail, router]);

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
              <Box
                key={list.listName}
                border="solid black 3px"
                width={"280px"}
                height={"150px"}
                borderRadius={10}
                overflowY="auto"
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
                                hoveredMovie === movie.id ? "green" : "initial",
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
                                  id: movie.imdbID,
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
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    );
  };

  return (
    <Box height="100%" width="80%" padding="3rem">
      <Grid templateColumns="repeat(2, 1fr)" gap={"20%"} height="90%">
        <FriendInfo email={friendEmail} userID={userID} friendID={friendID} />
        <DisplayFriendWatchList
          friendEmail={friendEmail}
          friendName={friendName}
        />
      </Grid>
    </Box>
  );
}
