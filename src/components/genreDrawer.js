import {
    Text, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, Input, DrawerFooter, Button
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import fetchGenre from '@/pages/api/genreApi';

export default function GenreDrawer({isOpen, onClose}) {

    const [ genreResults, setGenreResults ] = useState([]);

    useEffect(() => {
        if (isOpen && genreResults.length === 0) {
            fetchGenre().then(genreResults => setGenreResults(genreResults));
        }
    }, [isOpen, genreResults]);
    
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
                            _hover={{bg: '#21DAE3', color: '#000000'}}
                        >{genre}</Text>
                    ))}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}
