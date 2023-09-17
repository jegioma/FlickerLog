import {
  Box, Heading, HStack, VStack, Image, Wrap, WrapItem, Button, Select, Flex, Center
} from '@chakra-ui/react'
import styles from '../styles/index.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import CSS for image effects
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'; // Import Bootstrap components


export default function Index() {
  const images = [
    '/office.jpeg',
    '/spiderverse.jpeg',
    '/maverick.jpg',
    '/bleach.jpg'
]

  return (
    <>
      
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
        <div>
            <Carousel images={images} />
        </div>
      </Box>
    </>
  )
}
