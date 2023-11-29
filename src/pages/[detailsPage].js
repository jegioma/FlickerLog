import {
    Box, HStack, VStack, Text, Heading, useDisclosure, useToast, Link,
    UnorderedList, ListItem, Button, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { auth } from '@/configure/firebase';
import AlertDialogBox from '@/components/alertDialogBox';
import { addItemToList } from './api/accountApi';
import { fetchShowDetails, fetchRatings, fetchMovieDetails, formatNumberWithCommas, formatDateString, formatGenreString } from './api/searchApi';
import { getLists } from './api/accountApi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DetailsPage() {
    const router = useRouter();
    const { id, type } = router.query;
    const [ genreString, setGenreString ] = useState(''); // Get the genre string, or use an empty string if it's undefined
    const [ genreNames, setGenreNames ] = useState([]);
    const [ list, setList ] = useState([]);
    const [ movieLayout, setMovieLayout ] = useState(false);
    const [ results, setResults ] = useState();
    const [ ratings, setRatings ] = useState();
    const user = auth.currentUser;
    const toast = useToast();
    const { onOpen, isOpen, onClose } = useDisclosure();
    const handleAddItem = async (item) => {
        const itemAdded = await addItemToList(ratings, item);
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
            setMovieLayout(true);
            fetchMovieDetails(id)
                .then((movieData) => {
                    setResults(movieData);
                    fetchRatings(movieData?.imdb_id)
                        .then((ratingData) => {
                            setRatings(ratingData);
                            console.log(ratingData)
                            setGenreString(ratingData.Genre);
                        }).catch((error) => {
                            console.log(error);
                        });
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            setMovieLayout(false);
            fetchShowDetails(id)
                .then((tvData) => {
                    setRatings(tvData);
                    setGenreString(tvData?.Genre);
                    console.log(results)
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
    }, [type, id, user, results]);

    useEffect(() => {
        setGenreNames(formatGenreString(genreString) || []);
    }, [genreString]);
    
    return (
        <Box height='100vh' width='100vw' padding='3rem'>
            {movieLayout ? (
                <Box backgroundColor='#d9d9d9' width='100%' height='100%' borderRadius={15}>
                    <HStack  padding='1rem' align="flex-start" justify="flex-start">
                        <VStack>
                            {ratings?.Poster !== 'N/A' ? (
                                <Image src={ratings?.Poster} width={300} height={400} alt='Poster Image'/>
                                ) : (
                                    <Image src='/imageNA.jpg' width={300} height={400} alt='Poster Image'/>  
                                )
                            }
                            <Link 
                                fontSize='xs' 
                                href={results?.homepage} 
                                color='teal' 
                                isExternal
                            >{results?.homepage ? 'Go to website ': ''} {results?.homepage && <ExternalLinkIcon />}</Link>
                        </VStack>
                        <VStack height={400} align='flex-start' padding='1rem' width='100%'>
                            <Heading fontStyle='oblique'>{ratings?.Title}</Heading>
                            <Text fontSize='md' fontStyle='italic' marginTop={-2}>- {results?.tagline} -</Text>
                            <HStack spacing={5}>
                                <Text>{ratings?.Released ? 'Released: ' + formatDateString(ratings.Released) : 'Date not available'}</Text>
                                <Text>Runtime: {results?.runtime} minutes</Text>
                                <Text>Rated: {ratings?.Rated}</Text>
                                <Text>{results?.budget ? 'Budget: $' + formatNumberWithCommas(results?.budget) : ''}</Text>
                                <Text>{results?.revenue ? 'Revenue: $' + formatNumberWithCommas(results?.revenue) : ''}</Text>
                            </HStack>
                            <Text>Director: {ratings?.Director}</Text>
                            <Text>Writers: {ratings?.Writer}</Text>
                            <Text>Actors: {ratings?.Actors}</Text>
                            <Text marginBottom={-3}>Genres</Text>
                            <UnorderedList margin={0} width='30rem' display='grid' gridTemplateColumns='repeat(3, 1fr)' styleType='none'>
                                {genreNames.map((name) =>
                                    name ? (
                                        <ListItem 
                                            key={name} 
                                            textAlign='center' 
                                            color='black' 
                                            border='solid 1px black' 
                                            bg='green.200' 
                                            borderRadius={5} 
                                            margin={1} 
                                            fontSize='sm'
                                        >{name}</ListItem>
                                        ) : null
                                    )
                                }
                            </UnorderedList>
                                <Text textDecor='underline'>Synopsis</Text>
                                <Text>{results?.overview}</Text>
                        </VStack>
                    </HStack>
                    <HStack justifyContent='space-between' padding='1rem' display='inline-flex' width='100%' >
                        {ratings?.Ratings && ratings?.Ratings.length > 0 ? (
                            <HStack>
                                {ratings.Ratings.map((rating, index) =>
                                    rating ? (
                                    <Text fontWeight='bold' key={index} color='black' border='solid 1px black' bg='green.200' borderRadius={10} padding={1}>
                                        {index === 0
                                        ? 'iMDB'
                                        : index === 1
                                        ? 'Rotten Tomatoes'
                                        : index === 2
                                        ? 'Metacritics'
                                        : ''}: {rating.Value}
                                    </Text>
                                    ) : null
                                    )
                                }
                        </HStack>
                            ) : (
                            <Text>No ratings available</Text>
                            )
                        }
                        {user ? (
                            <Menu>
                                <MenuButton colorScheme='green' alignSelf='end' as={Button} rightIcon={<HamburgerIcon />} >Add to Watchlist</MenuButton>
                                <MenuList>
                                    {list.map((item) => (                        
                                        <MenuItem 
                                            key={item.id}
                                            onClick={() => handleAddItem(item)}
                                            _hover={{bg: 'green.100'}}
                                        >{item.listName}</MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                                ) : (
                                <Button colorScheme='green' onClick={onOpen} rightIcon={<HamburgerIcon />}>Add to WatchList</Button>
                            )
                        }
                    </HStack>
                    <AlertDialogBox isOpen={isOpen} onClose={onClose} />
                </Box>
                ) : (
                <Box backgroundColor='#d9d9d9' width='100%' height='100%' borderRadius={15}>
                    <HStack  padding='1rem' align="flex-start" justify="flex-start">
                        {ratings?.Poster !== 'N/A' ? (
                            <Image src={ratings?.Poster} width={300} height={400} alt='Poster Image'/>
                            ) : (
                                <Image src='/imageNA.jpg' width={300} height={400} alt='Poster Image'/>  
                            )
                        }
                        <VStack height={400} align='flex-start' padding='1rem' width='100%'>
                            <Heading fontStyle='oblique'>{ratings?.Title}</Heading>
                            <HStack spacing={5}>
                                <Text>{ratings?.Released ? 'Aired: ' + formatDateString(ratings.Released) : 'Date not available'}</Text>
                                <Text>Years Running: {ratings?.Year}</Text>
                                <Text>Seasons: {ratings?.totalSeasons}</Text>
                                <Text>TV Rating: {ratings?.Rated}</Text>
                            </HStack>
                            <Text>Writers: {ratings?.Writer}</Text>
                            <Text>Actors: {ratings?.Actors}</Text>
                            <Text>Awards: {ratings?.Awards}</Text>
                            <Text>Aired In: {ratings?.Country}</Text>
                            <Text marginBottom={-3}>Genres</Text>
                            <UnorderedList margin={0} width='30rem' display='grid' gridTemplateColumns='repeat(3, 1fr)' styleType='none'>
                                {genreNames.map((name) =>
                                name ? (
                                    <ListItem key={name} textAlign='center' color='black' border='solid 1px black' bg='green.200' borderRadius={5} margin={1} fontSize='sm'>
                                    {name}
                                    </ListItem>
                                ) : null
                                    )
                                }
                            </UnorderedList>
                            <Text textDecor='underline'>Synopsis</Text>
                            <Text>{ratings?.Plot}</Text>
                        </VStack>
                    </HStack>
                    <HStack justifyContent='space-between' padding='1rem' display='inline-flex' width='100%' >
                        {ratings?.Ratings && ratings?.Ratings.length > 0 ? (
                            <HStack>
                                {ratings.Ratings.map((rating, index) =>
                                    rating ? (
                                        <Text fontWeight='bold' key={index} color='black' border='solid 1px black' bg='green.200' borderRadius={10} padding={1}>
                                            {index === 0
                                            ? 'iMDB'
                                            : index === 1
                                            ? 'Rotten Tomatoes'
                                            : index === 2
                                            ? 'Metacritics'
                                            : ''}: {rating.Value}
                                        </Text>
                                        ) : null
                                    )
                                }
                            </HStack>
                            ) : (
                                <Text>No ratings available</Text>
                            )
                        }
                        {user ? (
                            <Menu>
                                <MenuButton colorScheme='green' alignSelf='end' as={Button} rightIcon={<HamburgerIcon />} >Add to Watchlist</MenuButton>
                                <MenuList>
                                    {list.map((item) => (                       
                                        <MenuItem 
                                            key={item.id}
                                            onClick={() => handleAddItem(item)}
                                            _hover={{bg: 'green.100'}}
                                        >{item.listName}</MenuItem>
                                    ))

                                    }

                                </MenuList>
                            </Menu>
                            ) : (
                                <Button colorScheme='green' onClick={onOpen} rightIcon={<HamburgerIcon />}>Add to WatchList</Button>
                            )
                        }
                    </HStack>
                    <AlertDialogBox isOpen={isOpen} onClose={onClose} />
                </Box>
                )
            }
        </Box>         
    );
}
