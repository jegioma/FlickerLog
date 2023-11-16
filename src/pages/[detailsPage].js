import {
    Box, HStack, VStack, Text, Heading, useDisclosure, useToast,
    UnorderedList, ListItem, Button, Menu, MenuButton, MenuList, MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { auth } from '@/configure/firebase';
import AlertDialogBox from '@/components/alertDialogBox';
import { addItemToList } from './api/accountApi';
import { fetchMovieDetails, fetchShowDetails, formatDateString, formatGenreString } from './api/searchApi';
import { getLists } from './api/accountApi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function DetailsPage() {
    const router = useRouter();
    const { name, id, type } = router.query;
    const [ resultDetails, setResultsDetails ] = useState();
    const genreString = resultDetails?.Genre || ''; // Get the genre string, or use an empty string if it's undefined
    const genreNames = formatGenreString(genreString);
    const [ list, setList ] = useState([]);
    const user = auth.currentUser;
    const toast = useToast();
    const { onOpen, isOpen, onClose } = useDisclosure();
    const handleAddItem = async (item) => {
        const itemAdded = await addItemToList(resultDetails, item);
        toast({
            title: itemAdded.success ? 'Success' : 'Error',
            description: itemAdded.message,
            status: itemAdded.success ? 'success' : 'error',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
        })
    };

    useEffect(() => {
        if (type === 'movie') {
            fetchMovieDetails(name)
                .then((resultData) => {
                    setResultsDetails(resultData);
                    console.log(resultData);
                }).catch((error) => {
                    console.log(error);
                });
        }
        if (type === 'tv') {
            fetchShowDetails(name)
                .then((resultData) => {
                    setResultsDetails(resultData);
                }).catch((error) => {
                    console.log(error);
                });
        }
        if (user) {
            const fetchList = async () => {
                try {
                    const listData = await getLists();
                    setList(listData);
                } catch (error) {
                    console.log(error);
                }
            }
        fetchList();
    }
  }, [name, type, id, user]);

  return (
    <Box height='100vh' width='100vw' padding='3rem' >
      <Box backgroundColor='#d9d9d9' width='100%' height='100%' borderRadius={15}>
        <HStack  padding='1rem' align="flex-start" justify="flex-start">
        <Image
            src={resultDetails?.Poster ? resultDetails?.Poster : '/imageNA.jpg'}
            width={300}
            height={400}
            alt='Poster Image'
        />
            <VStack height={400} align='flex-start' padding='1rem' width='100%'>
                <Heading>{resultDetails?.Title}</Heading>
                <HStack spacing={10}>
                    <Text>{resultDetails?.Released ? 'Released: ' + formatDateString(resultDetails.Released) : 'Date not available'}</Text>
                    <Text>Runtime: {resultDetails?.runtime} minutes</Text>
                    <Text>Rated: {resultDetails?.Rated}</Text>
                    <Text>{resultDetails?.BoxOffice ? 'Box Office: ' + resultDetails?.BoxOffice : ''}</Text>
                </HStack>
                <Text>Director: {resultDetails?.Director}</Text>
                <Text>Writers: {resultDetails?.Writer}</Text>
                <Text>Actors: {resultDetails?.Actors}</Text>
                <Text marginBottom={-3}>Genres</Text>
                <UnorderedList margin={0} width='30rem' display='grid' gridTemplateColumns='repeat(3, 1fr)' styleType='none'>
                    {genreNames.map((name) =>
                    name ? (
                        <ListItem key={name} textAlign='center' border='3px solid green' borderRadius={5} margin={1} fontSize='sm'>
                        {name}
                        </ListItem>
                    ) : null
                    )}
                </UnorderedList>
                    <Text textDecor='underline'>Synopsis</Text>
                    <Text>{resultDetails?.Plot}</Text>
            </VStack>
        </HStack>
        <HStack justifyContent='space-between' padding='1rem' display='inline-flex' width='100%' >
        {resultDetails?.Ratings && resultDetails?.Ratings.length > 0 ? (
            <HStack>
            {resultDetails.Ratings.map((rating, index) =>
                rating ? (
                <Text fontWeight='bold' key={index} border='solid 1px black' borderRadius={10} padding={1}>
                    {index === 0
                    ? 'iMDB'
                    : index === 1
                    ? 'Rotten Tomatoes'
                    : index === 2
                    ? 'Metacritics'
                    : ''}: {rating.Value}
                </Text>
                ) : null
            )}
            </HStack>
        ) : (
            <Text>No ratings available</Text>
        )}
        {user ? (
            <Menu>
                <MenuButton colorScheme='yellow' alignSelf='end' as={Button} rightIcon={<HamburgerIcon />} >Add to Watchlist</MenuButton>
                <MenuList>
                    {list.map((item) => (
                        <MenuItem key={item.id}
                            onClick={() => handleAddItem(item)}
                        >{item.listName}</MenuItem>
                    ))

                    }

                </MenuList>
            </Menu>
            ) : (
                <Button colorScheme='yellow' onClick={onOpen} rightIcon={<HamburgerIcon />}>Add to WatchList</Button>
                )
        }
        </HStack>
        <AlertDialogBox isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
}
