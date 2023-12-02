import {
    Heading, Text, VStack, HStack, Image, UnorderedList, ListItem, Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { formatDate } from '@/pages/api/searchApi';

export default function ResultItem({ results, genreMap }) {
    const genreNames = results.genre_ids ? results.genre_ids.map(id => genreMap.get(id)) : [];
    const router = useRouter();

    return (
        <HStack margin={0} spacing={3} padding={0} height={200}>
            <Image
                src={results.poster_path ? `https://image.tmdb.org/t/p/w780${results.poster_path}` : '/imageNA.jpg'}
                alt={results.title}
                width={150}
                height={200}
                float='left'
                border='solid black 3px'
            />
            <VStack spacing={4} padding='0 1rem 0 0' align='flex-start' width='100%'>
                <Heading fontStyle='oblique' marginBlock={-4} marginTop={1} fontSize='xl'>{results.title || results.name}</Heading> 
                <Text>{results.release_date ? 'Released: ' + formatDate(results.release_date) : (results.first_air_date ? 'First Aired: ' + formatDate(results.first_air_date) : 'Date Not Available')}</Text>
                <Text marginBottom={-3} marginTop={-5} >Genres</Text>
                <UnorderedList margin={0} width='100%' display='grid' gridTemplateColumns='repeat(3, 1fr)' styleType='none'>
                    {genreNames.map(name => 
                    name ? <ListItem 
                                key={name} 
                                textAlign='center' 
                                color='black' 
                                bg='green.200' 
                                border='1px solid black' 
                                borderRadius={5} 
                                margin={1} 
                                fontSize='xs'
                            >{name}</ListItem> : null
                    )}
                </UnorderedList>
                { (results.release_date || results.first_air_date) &&(
                    <Button
                        position='0 100'
                        size='sm'
                        alignSelf='flex-end'
                        colorScheme='green'
                        onClick={() => {
                            router.push({
                                pathname: '/detailsPage', // Replace with the actual pathname of your DetailsPage
                                query: {
                                    name: results.title || results.name,
                                    id: results.id,
                                    type: results.media_type,
                                },
                            });
                        }}
                    >More Info</Button>
                )}
            </VStack>
        </HStack>
    )
}