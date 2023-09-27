import {
    Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Button, 
    Wrap, Flex, Alert, AlertIcon, WrapItem, Center, Image, Card, HStack, Container, Heading, Text, VStack
} from '@chakra-ui/react'
import {
    SearchIcon, HamburgerIcon
} from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
// import GenreDrawer from '@/components/genreDrawer'
import { useState, useEffect, memo } from 'react'
import ResultItem from '@/components/resultItem'

export default function Search() {

    const MemoizedImage = memo(Image);
    const MemoCard = memo(Card);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ searchName, setSearchName ] = useState('');
    const [ movieInfo, setMovieInfo ] = useState('');
    const [ searchList, setSearchList ] = useState([]);
    const [ numResults, setNumResults ] = useState(20);
    const [ hasNoResults, setHasNoResults ] = useState(false);


    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN
        }
      };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            try {
                // const searchTerm = searchName.trim().replace(/[\s]+/g, '%');
                // setMovieInfo(searchTerm);
                // fetch(`${searchUrl}?s=${searchTerm}&type=movie&apikey=${apiKey}`) // use apiKey variable here
                fetch('https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=2', options)

                    .then(response => response.json())
                    .then (data => {
                        console.log(data);
                        setSearchList(data.results.slice(0, 20));
                        setNumResults(20)
                        setHasNoResults(false);
                    })
            } catch (error) {
                console.log(error);
            }
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
            <Center padding='3rem' border='solid red 3px'>
                <VStack border='solid pink 3px' width='80rem' align='center'>
                {
                    searchList.length > 0 && searchList.map(results => (
                        <MemoCard
                            key={results.id}
                            width='100%'
                        >
                            <ResultItem results={results}/>
                        </MemoCard>
                    ))
                } 
                <Button bg='#53DAE3' _hover={{backgroundColor: '#53DAE3aa'}} marginTop='3rem'>Load More</Button>
                </VStack>
            </Center>
        </Box>
    )
}