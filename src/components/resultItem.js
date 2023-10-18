import {
    Heading, Text, VStack, Image, HStack,
    UnorderedList, ListItem, Button
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { formateDate } from '@/pages/api/searchApi';
import { useState, useEffect, memo } from 'react'

export default function ResultItem({results, genreMap}) {
    const MemoizedImage = memo(Image);
    const genreNames = results.genre_ids ? results.genre_ids.map(id => genreMap.get(id)) : [];
    const router = useRouter();

    return (
        <HStack margin={0} spacing={3} padding={0} height={200}>
            <MemoizedImage
                src={results.poster_path ? `http://image.tmdb.org/t/p/w780${results.poster_path}` : '/imageNA.jpg'}
                alt={results.title}
                width={150}
                height='100%'
                float='left'
                fallbackSrc='/imageNA.jpg'
                border='solid black 3px'
            />
            <VStack spacing={4} padding='0 1rem 0 0' align='flex-start' width='100%'>
                <Heading marginBlock={-4} marginTop={1} fontSize='xl'>{results.title || results.name}</Heading> 
                <Text>{results.release_date ? 'Released: ' + formateDate(results.release_date) : (results.first_air_date ? 'First Aired: ' + formateDate(results.first_air_date) : 'Date Not Available')}</Text>
                <Text marginBottom={-3} marginTop={-5} >Genres</Text>
                <UnorderedList margin={0} width='100%' display='grid' gridTemplateColumns='repeat(3, 1fr)' styleType='none'>
                    {
                    genreNames.map(name => 
                    name ? <ListItem key={name} textAlign='center' border='2px solid green' borderRadius={5} margin={1} fontSize='2xs'>{name}</ListItem> : null
                    )}
                </UnorderedList>
                {results.original_language === "en" && (
                    <Button
                        position='0 100'
                        size='sm'
                        rightIcon={<ChevronRightIcon />}
                        alignSelf='flex-end'
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
                    >More Details</Button>
                )}
            </VStack>
        </HStack>
    )
}