import styles from '../styles/index.module.css'
import {
  Box, Heading, HStack, VStack, Image, Wrap, WrapItem, Button
} from '@chakra-ui/react'
import Carousel from './profile'

export default function Index() {
  const images = [
    '/office.jpeg',
    '/spiderverse.jpeg',
    '/maverick.jpg',
    '/bleach.jpg'
]

  return (
    <>
      <Box className={styles.body} margin={0} padding={0}>
        <VStack marginTop='5rem'>
          

          <Heading fontSize='5xl' marginTop='3rem'>Your Ultimate Movie and TV Show Hub</Heading>
          <Heading fontSize='2xl'>Discover, Watch, and Discuss Your Favorite Movies and TV Shows</Heading>

          <HStack marginTop='3rem'>
            <Button className={styles.btn}>Get Started</Button>
            <Button className={styles.btn}>Sign Up</Button>
          </HStack>
        </VStack>
        <div>
            <Carousel images={images} />
        </div>
      </Box>
    </>
  )
}
