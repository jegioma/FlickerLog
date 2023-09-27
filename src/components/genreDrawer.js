import {
    Text, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, Input, DrawerFooter, Button
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import fetchGenre from '@/pages/api/genreApi';

export default function GenreDrawer({isOpen, onClose}) {

    const [ genreResults, setGenreResults ] = useState([]);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2NjZTQ3Y2VkMTg3MDY4NWRhNmJlNzdlMWYxZjI3OSIsInN1YiI6IjY1MDkxMTNkZmEyN2Y0MDBlYjE4YzMxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AH9Z2Y80vLc7xyStcMFLgb1b0nCJzkCvfLnfs-EfI6I'
        }
      };
      
      fetch('https://api.themoviedb.org/3/authentication', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    // useEffect(() => {
    //     if (isOpen && genreResults.length === 0) {
    //         fetchGenre().then(genreResults => setGenreResults(genreResults));
    //     }
    // }, [isOpen, genreResults]);
    useEffect(() => {
        if (isOpen && genreResults.length === 0) {
            fetchGenre().then(genres => {
                setGenreResults(genres);
            });
        }
    }, [isOpen]);
    
    
    // const handleGenreClick = index => {
    //     const url = 'https://streaming-availability.p.rapidapi.com/search/filters';
    //     fetch(`${url}?genres=${index}`)
    // }

    return (
        <Drawer size='xs' isOpen={isOpen} onClose={onClose} placement='right'>
            <DrawerContent backgroundColor='#222323' padding='1rem'>
                <DrawerCloseButton color='#21DAE3' size='lg' />
                <DrawerHeader color='#fffeee' fontSize='3xl'>Select a genre</DrawerHeader>
                <DrawerBody>
                    {genreResults.map((genre, index) => (
                        <Text 
                            color='#fffeee' 
                            fontSize='xl' 
                            key={index}
                            id={genre.id}
                            // onClick={() => handleGenreClick(index)}
                            _hover={{bg: '#21DAE3', color: '#000000'}}
                        >{genre.name}</Text>
                    ))}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}
