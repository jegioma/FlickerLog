import {
    Box, Input, InputGroup, InputLeftElement, Button, Center, Card, 
    HStack, Text, VStack, SimpleGrid, Alert, AlertIcon, 
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState, useEffect, memo, useMemo, useRef } from 'react'
import ResultItem from '@/components/resultItem'

export default function Search() {
  const MemoCard = memo(Card);
  const [showButtons, setShowButtons] = useState(false);
  const [ searchName, setSearchName ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ hasNoResults, setHasNoResults ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ totalResults, setTotalResults ] = useState(0);
  const [genreMap, setGenreMap] = useState(new Map());
  const [ dataLoaded, setDataLoaded ] = useState(false);
  const topRef = useRef(null);
  const options = useMemo(() => {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN
      }
    };
  }, []);

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
            }).catch((error) => console.log(error));
        }).catch((error) => console.log(error));
    
      fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
        .then((response2) => response2.json())
        .then((data2) => {
          setSearchResults(data2.results);
          setHasNoResults(false);
          setTotalPages(data2.total_pages);
          setTotalResults(data2.total_results);
          setCurrentPage(1);
          setDataLoaded(true);
        }).catch((error) => console.log(error));
    }
  }, [currentPage, dataLoaded, searchName, options]);

  const handleSearch = (event) => {
      if (event.key === 'Enter') {
        if (searchName !== '') {
          const searchTerm = searchName.trim().replace(/[\s]+/g, '%');
          fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => {
              if (data.total_results === 0) {
                setHasNoResults(true);
              } else {
                setSearchResults(data.results);
                setHasNoResults(false);
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);
                setCurrentPage(1);
                setShowButtons(true)
              }
            }).catch(error => console.log(error));
        } 
      }
  };

  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      await fetchPageResults(newPage);
    }
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }
      
  const fetchPageResults = async (page) => {
    const searchTerm = searchName.trim().replace(/[\s]+/g, '%');
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`, options);
      const data = await response.json();
      console.log(data);
      if (data.total_results === 0) {
        setHasNoResults(true);
      } else {
        setHasNoResults(false);
        setSearchResults(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
        setCurrentPage(page);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box height='100vh' maxHeight='100vh' paddingTop='5rem' overflow='auto'>
      <VStack justify='center' ref={topRef}>
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
          </InputGroup>
        {hasNoResults && (
          <Alert status='error' variant='left-accent' width='50rem'>
            <AlertIcon />
            There were no results matching your search.
          </Alert>
          )
        }
      </VStack>
        <VStack width='80rem' padding='3rem' margin='auto'>
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
              <HStack marginTop='2rem' spacing={10}>
                <Button colorScheme='yellow' size='lg' onClick={() => handlePageChange(currentPage - 1)}>Prev</Button>
                <Text color='white' bg='black' padding='5px 20px 5px 20px' fontSize='lg'>Page: {currentPage} of {totalResults} results</Text>
                <Button colorScheme='yellow' size='lg' onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
              </HStack>
            )}
        </VStack>
    </Box>
  )
}