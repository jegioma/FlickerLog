import {
    Box, Heading, HStack, VStack, Image, Wrap, WrapItem, Button, Select, Flex, Center, Breadcrumb, BreadcrumbItem, BreadcrumbSeparator
  } from '@chakra-ui/react'
  import styles from '../styles/index.module.css'
  import 'react-responsive-carousel/lib/styles/carousel.min.css';
  import { Carousel } from 'react-responsive-carousel'
  import { LazyLoadImage } from 'react-lazy-load-image-component';
  import 'react-lazy-load-image-component/src/effects/blur.css'; // Import CSS for image effects
  import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'; // Import Bootstrap components
  import Link from 'next/link';
  


export default function Header() {
    return (
        <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        backgroundColor="#feb236" // Customize the background color
        color="Black" // Customize the text color
      >
      <Center>
      <Image
          src="https://i.pinimg.com/originals/dd/4e/c9/dd4ec99b9e73b0359f4f1dfcd61e39f2.gif"
          alt="Animated GIF"
          w="100px"
          h="80px"         
          mr="2rem"
        />
      <Heading className={styles.title} fontSize='5xl' color="#2E8B57">FlickerLog</Heading>
        

            {/* <Link href='/index'>
                <Button bg='#ffd60a' color='#000407' _hover={{ color: '#ffd60a', backgroundColor: '#000814', border: 'solid #ffd60a 3px', transition: 'all 0.3s ease 0s'}} fontSize='lg' margin='1rem'>Login</Button>
            </Link> */}
      </Center>

      
      <HStack spacing="1rem">
      <Breadcrumb fontSize='xl'>
                <BreadcrumbItem _hover={{backgroundColor: '#153f00',color: 'Tomato',}}>
                    <Link href='/'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem _hover={{backgroundColor: '#153f00',color: 'Tomato',}}>
                    <Link href='/profile'>Profile</Link>
                </BreadcrumbItem>
                <BreadcrumbItem _hover={{backgroundColor: '#153f00',color: 'Tomato',}}>
                    <Link href='/search'>Search</Link>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>

      <Button
      className="custom-button"
      _hover={{
        backgroundColor: '#153f00',
        color: 'Tomato',
      }}
    >Log-in</Button>
    </HStack>
    </Flex>
    )
}