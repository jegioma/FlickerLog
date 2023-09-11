import styles from '../styles/index.module.css'
import {
  Box, Heading, HStack, VStack, Image, Wrap, WrapItem, Button
} from '@chakra-ui/react'

export default function Index() {

  return (
    <>
      <Box className={styles.body} margin={0} padding={0}>
        <VStack marginTop='5rem'>
          <Wrap spacing={10} border='solid blue 3px' justify='center'>
            <WrapItem>
              <Image src='/office.jpeg' width={200} height={300} />            
            </WrapItem>
            <WrapItem>
              <Image src='/spiderverse.jpeg' width={200} height={300} />            
            </WrapItem>
            <WrapItem>
              <Image src='/maverick.jpg' width={200} height={300} />            
            </WrapItem>
            <WrapItem>
              <Image src='/bleach.jpg' width={200} height={300} />            
            </WrapItem>
            <WrapItem>
              <Image src='/parasite.jpg' width={200} height={300} />            
            </WrapItem>
          </Wrap>

          <Heading fontSize='5xl' marginTop='3rem'>Your Ultimate Movie and TV Show Hub</Heading>
          <Heading fontSize='2xl'>Discover, Watch, and Discuss Your Favorite Movies and TV Shows</Heading>

          <HStack marginTop='3rem'>
            <Button className={styles.btn}>Get Started</Button>
            <Button className={styles.btn}>Sign Up</Button>
          </HStack>
        </VStack>
      </Box>
    </>
  )
}
