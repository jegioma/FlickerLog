import {
    Box, SimpleGrid, Grid, GridItem, VStack, HStack, Stack, Text, Heading, Image, Card,
} from '@chakra-ui/react'
import Head from 'next/head'

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
                  <Heading color='#000' marginBottom='3rem'>Your Watchlists</Heading>
                  <SimpleGrid columns={2} spacing={3}>
                    <Card border='solid orange 3px' width={80} height={200} borderRadius={20}>
                      
                    </Card>
                    <Card border='solid orange 3px' width={80} height={200} borderRadius={20}>

                    </Card>
                  </SimpleGrid>
                </VStack>
              </Box>
            </GridItem>
          </Grid>
            
        </Box>
    )
}