import {
    Box, SimpleGrid, Grid, GridItem, VStack, HStack, Stack, Text, Heading, Image, Card, IconButton
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function Profile() {

    return (
        <Box height='100vh' width='100vw' padding='3rem' border='solid red 3px'>
          <Grid templateColumns='repeat(2, 1fr)' gap={5}  height='90%'>
            <GridItem height='100%'>
              <Box border='blue 3px solid' width='20rem' borderRadius={15} backgroundColor='#d9d9d9'>
                <VStack>
                  <Heading color='#000' marginBottom='1rem'>Username</Heading>
                  <Image 
                    borderRadius='full'
                    src='/alien.png'
                    border='dashed cyan 5px'
                    alt='avatar image'
                    boxSize='150px'
                />
                <Text>Edit Avatar</Text>
                <Text>Member Since:</Text>
                <Text>October 6, 2022</Text>
                </VStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box border='green 3px solid' borderRadius={15} width='45rem' backgroundColor='#d9d9d9'>
                <VStack>
                  <Heading color='#000'>Your Watchlists</Heading>
                  <SimpleGrid columns={3} spacing={10} padding='2rem'>
                    <Card border='solid orange 3px' width={40} height={100} borderRadius={20} padding={5}>
                      <Stack align='center'>
                        <Heading  fontSize='lg' color='#000'>New List</Heading>
                        <AddIcon  />
                      </Stack>
                    </Card>
                    <Card border='solid orange 3px' width={40} height={100} borderRadius={20}>

                    </Card>
                    <Card border='solid orange 3px' width={40} height={100} borderRadius={20}>

                    </Card>
                    <Card border='solid orange 3px' width={40} height={100} borderRadius={20}>

                    </Card>
                    <Card border='solid orange 3px' width={40} height={100} borderRadius={20}>

                    </Card>
                  </SimpleGrid>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
            


        </Box>
    )
}
