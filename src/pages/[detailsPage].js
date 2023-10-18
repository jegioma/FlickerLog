import {
    Box, HStack, VStack, Container, Image, Card, Text, Heading, SimpleGrid, UnorderedList, ListItem
} from '@chakra-ui/react';
import { fetchMovieDetails, fetchShowDetails, formatDateString, formatGenreString } from './api/searchApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailsPage() {
    const router = useRouter();
    const { name, id, type } = router.query;
    const [ resultDetails, setResultsDetails ] = useState();
    const genreString = resultDetails?.Genre || ''; // Get the genre string, or use an empty string if it's undefined
    const genreNames = formatGenreString(genreString);
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: process.env.NEXT_PUBLIC_TMDB_TOKEN
    //     }
    //   };

  useEffect(() => {
    if (type === 'movie') {
        fetchMovieDetails(name)
            .then((resultData) => {
                setResultsDetails(resultData);
                // setGenreNames(resultDetails?.Genre);
            }).catch((error) => {
                console.log(error);
            });
    }
    if (type === 'tv') {
        fetchShowDetails(name)
            .then((resultData) => {
                setResultsDetails(resultData);
                // setGenreNames(resultDetails?.Genre);
            }).catch((error) => {
                console.log(error);
            });
    }
  }, [name, type, id]);

  return (
    <Box height='100vh' width='100vw' padding='3rem' >
      <Box backgroundColor='#d9d9d9' width='100%' height='100%' borderRadius={15}>
        <HStack  padding='1rem' align="flex-start" justify="flex-start">
            <Image
                src={resultDetails?.poster_path ? `http://image.tmdb.org/t/p/w780${results.poster_path}` : '/imageNA.jpg'}
                width={300}
                height={400}
                alt={resultDetails?.title}
                fallbackSrc='/imageNA.jpg'
                border='ridge 5px #000'
            />
            <VStack height={400} align='flex-start' padding='1rem' width='100%'>
                <Heading>{resultDetails?.Title}</Heading>
                <HStack spacing={10}>
                    <Text>{resultDetails?.Released ? 'Released: ' + formatDateString(resultDetails.Released) : 'Date not available'}</Text>
                    <Text>Runtime: {resultDetails?.Runtime}</Text>
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
                <VStack border='solid 1px #000' align='flex-start' marginTop={3} padding={3} borderRadius={10}>
                    <Text textDecor='underline'>Synopsis</Text>
                    <Text>{resultDetails?.Plot}</Text>
                </VStack>
            </VStack>
        </HStack>
        <HStack padding='1rem' align="flex-start" justify="flex-start">
            <HStack>
                {/* {
                    resultDetails?.Ratings.map((rating, index) => 
                        rating ? <Text key={index} border='solid green 3px' borderRadius={10} padding={3}>{rating.Source}: {rating.Value}</Text> : null
                    )
                } */}
            </HStack>
        </HStack>
      </Box>
    </Box>
  );
}
