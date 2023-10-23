import {
    Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Button, 
    Wrap, Flex, Alert, AlertIcon, WrapItem, Center, Image, Card, HStack, Container, Heading, Text, VStack, SimpleGrid
} from '@chakra-ui/react'
import {
    SearchIcon, HamburgerIcon
} from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
// import GenreDrawer from '@/components/genreDrawer'
import { useState, useEffect, memo, useMemo } from 'react'
import ResultItem from '@/components/resultItem'

export default function Search() {

  const MemoCard = memo(Card);
  const [showButtons, setShowButtons] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ searchName, setSearchName ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ hasNoResults, setHasNoResults ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ totalResults, setTotalResults ] = useState(0);
  const [genreMap, setGenreMap] = useState(new Map());
  const [ dataLoaded, setDataLoaded ] = useState(false);
  // const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN
  //     }
  //   };
  const options = useMemo(() => {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN,
      },
    };
  }, []); // Empty dependency array means it's only created once

    useEffect(() => {
        if (!dataLoaded) {
          // Fetch the movie genre list
          fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then((response) => response.json())
            .then((data) => {
              const movieGenres = data.genres;
              // Fetch the TV genre list
              fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
                .then((response) => response.json())
                .then((data) => {
                  // Combine movie and TV genres and remove duplicates
                  const combinedGenres = [...movieGenres, ...data.genres];
                  const genreMap = new Map();
                  combinedGenres.forEach((genre) => {
                    genreMap.set(genre.id, genre.name);
                  });
                  setGenreMap(genreMap);
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
      
          fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
            .then((response2) => response2.json())
            .then((data2) => {
              console.log(data2);
              setSearchResults(data2.results);
              setHasNoResults(false);
              setTotalPages(data2.total_pages);
              setTotalResults(data2.total_results);
              setCurrentPage(1);
              setDataLoaded(true);
            })
            .catch((error) => console.log(error));
        }
      }, [currentPage, dataLoaded, searchName, options]);
      

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
          if (searchName !== '') {
            const searchTerm = searchName.trim().replace(/[\s]+/g, '%');
            fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                if (data.total_results === 0) {
                  alert('No results, try again');
                  setHasNoResults(true); // Set a flag to indicate no results
                } else {
                  setSearchResults(data.results);
                  setHasNoResults(false); // Clear the flag
                  setTotalPages(data.total_pages);
                  setTotalResults(data.total_results);
                  setCurrentPage(1);
                  setShowButtons(true)
                }
              })
              .catch(error => console.log(error));
          } else {
            alert('Enter a search input');
          }
        }
      };

    const handlePageChange = async (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          await fetchPageResults(newPage); // Use await to wait for the results to be fetched
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
    const fetchPageResults = async (page) => {
        const searchTerm = searchName.trim().replace(/[\s]+/g, '%');
        try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`, options);
        const data = await response.json();
        console.log(data)
        if (data.total_results === 0) {
          setHasNoResults(true);
        } else {
          setHasNoResults(false);
          setSearchResults(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
          setCurrentPage(page); // Set the current page to the new page
        }
      } catch (error) {
        console.log(error);
        }
    }

    return (
        <Box height='100vh' paddingTop='5rem'>
            <Flex justify='center'>
                <InputGroup size='lg' width='50rem' gap={5}>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon size='lg'/>
                    </InputLeftElement>
                    <Input 
                        bg='#fffeee' 
                        placeholder='Search for movies or tv shows'
                        type='text'
                        id='searchName'
                        value={searchName}
                        onKeyDown={handleSearch}
                        onChange={(event) => setSearchName(event.target.value)}
                    />
                    <InputRightElement>
                        <IconButton onClick={onOpen} size='lg' bg='#53DAE3' _hover={{backgroundColor: '#232B2B', border: 'solid 5px #53DAE3', color: '#53DAE3'}} icon={<HamburgerIcon  />}  />                  
                    </InputRightElement>
                </InputGroup>
            </Flex>
            {/* <GenreDrawer isOpen={isOpen} onClose={onClose} /> */}
            <Center padding='3rem'>
                <VStack width='80rem'>
                    <SimpleGrid columns={2} gap={10}>
                    {
                        searchResults.length > 0 && searchResults
                        .filter((result) => result && result.media_type !== "person")
                        .map(results => (
                            results && genreMap && <MemoCard
                                key={results.id}
                                width='100%'
                                padding={1}
                                margin={0}
                            >
                                <ResultItem results={results} genreMap={genreMap}/>
                            </MemoCard>
                        ))
                    } 
                    </SimpleGrid>
                    {showButtons && (
                      <HStack marginTop='2rem'>
                        <Button onClick={() => handlePageChange(currentPage - 1)}>Prev</Button>
                        <Text>Page: {currentPage}</Text>
                        <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                      </HStack>
                    )}
                </VStack>
            </Center>
        </Box>
    )
}