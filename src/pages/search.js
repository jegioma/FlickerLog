import {
    Box, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Button, Wrap, Flex
} from '@chakra-ui/react'
import {
    SearchIcon, HamburgerIcon
} from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import GenreDrawer from '@/components/genreDrawer'

export default function Search() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box height='100vh' paddingTop='5rem'>
            <Flex justify='center'>
                <InputGroup size='lg' width='50rem' gap={5}>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon size='lg'/>
                    </InputLeftElement>
                    <Input bg='#fffeee' placeholder='Search for movies or tv shows' />
                    <InputRightElement>
                        <IconButton onClick={onOpen} size='lg' bg='#53DAE3' _hover={{backgroundColor: '#232B2B', border: 'solid 5px #53DAE3', color: '#53DAE3'}} icon={<HamburgerIcon  />}  />                  
                    </InputRightElement>
                </InputGroup>
            </Flex>
            <GenreDrawer isOpen={isOpen} onClose={onClose} />

                {

                }
            <Box padding='5rem'>
                <Wrap border='solid pink 3px'>
                    
                </Wrap>
                <Button bg='#53DAE3' _hover={{backgroundColor: '#53DAE3aa'}} marginTop='3rem'>Load More</Button>
            </Box>
        </Box>
    )
}