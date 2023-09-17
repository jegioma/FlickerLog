import styles from '../styles/index.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  Box, Heading, HStack, VStack, Image, Wrap, WrapItem, Button, Select, Flex, Center
} from '@chakra-ui/react'
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import CSS for image effects


export default function Index() {

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        backgroundColor="#feb236" // Customize the background color
        color="Black" // Customize the text color
      >
      <Center>
        <Box>
            <Image src="https://i.pinimg.com/originals/dd/4e/c9/dd4ec99b9e73b0359f4f1dfcd61e39f2.gif" 
              alt="Animated GIF" 
              w="200px"
              h="150px"
              mr="1rem" // Add some right margin to create space between the image and text
            />
        </Box>
        <Box>
        <Heading fontSize="xl" color="#2E8B57">
          Hello, welcome to the Flicker-Log, We are film enthusiast!
        </Heading>
        </Box>
      </Center>
      <HStack spacing="1rem">
        
      <Select placeholder="Categories">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Select placeholder="Genres">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>

      <Button
      className="custom-button"
      _hover={{
        backgroundColor: '#153f00',
        color: 'Tomato',
      }}
    >Log-in</Button>
    <Button
      className="custom-button"
      _hover={{
        backgroundColor: '#153f00',
        color: 'Tomato',
      }}
    >Sign-up</Button>
    </HStack>
    </Flex>
      
      <Heading fontSize='5xl' color='#2E8B57' marginTop='3rem' textAlign='center'>
        Your Ultimate Movies and TV Show Hub 🎥📺
      </Heading>

      <Box className={styles.body} margin={0} padding={0}>
        <VStack marginTop='5rem'>
        <Carousel
            showArrows={true} // You can customize carousel settings here
            showThumbs={false}
          >
            <div>
              <LazyLoadImage
                src="/office.jpeg"
                alt="Office"
                width={200}
                height={300}
                effect="blur"
              />
            </div>
            <div>
              <LazyLoadImage
                src="/spiderverse.jpeg"
                alt="Spiderverse"
                width={200}
                height={300}
                effect="blur"
              />
            </div>
            <div>
              <LazyLoadImage
                src="/maverick.jpg"
                alt="Maverick"
                width={200}
                height={300}
                effect="blur"
              />
            </div>
            <div>
              <LazyLoadImage
                src="/bleach.jpg"
                alt="Bleach"
                width={200}
                height={300}
                effect="blur"
              />
            </div>
            <div>
              <LazyLoadImage
                src="/parasite.jpg"
                alt="Parasite"
                width={200}
                height={300}
                effect="blur"
              />
            </div>
          </Carousel>
          <Heading fontSize='2xl' color='#2E8B57' textAlign='center'>
            Discover, Watch, and Discuss Your Favorite Movies and TV Shows
          </Heading>

          
          
        </VStack>
      </Box>
    </>
  )
}
