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
  import { Router } from 'react-router-dom';
  import { auth } from '../configure/firebase.js';
  import { useState, useEffect } from 'react';
export default function Header() {
  const [user, setUser] = useState(""); // Initialize user state

  // check if user is logged in, if not then route to login page instead of an empty profile page
  useEffect(() => {
      const checkLogin = () => {
          auth.onAuthStateChanged(user => {
              if (user) {
                  setUser(user);
              } else {
                  setUser("");
              }
          })

      }
  checkLogin()
  }, []);


    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding="1rem"
            backgroundColor="#0f0e0c" // Customize the background color
            color="black" // Customize the text color
        >
    <Center>
    <Heading className={styles.title} fontSize="5xl" color="#2E8B57">
        FlickerLog
    </Heading>
    <Image
      src="https://i.pinimg.com/originals/dd/4e/c9/dd4ec99b9e73b0359f4f1dfcd61e39f2.gif"
      alt="New Animated GIF"
      w="100px"
      h="80px"
      ml="2rem"
      style={{ backgroundColor: '#090b07' }} // Set the background color of the GIF
    />
  </Center>

  <HStack spacing="1rem">
    <Breadcrumb fontSize="xl">
      <BreadcrumbItem color='#fff'_hover={{color: '#2E8B57' }}>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem color='#fff'_hover={{color: '#2E8B57' }}>
      {user ? (
              <Link href="/profile">Profile</Link>
            ) : (
              <Link href="/login">Profile</Link>
            )}
      </BreadcrumbItem>
      <BreadcrumbItem color='#fff'_hover={{color: '#2E8B57' }}>
        <Link href="/search">Search</Link>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
    </Breadcrumb>
    </HStack>
      
      <HStack spacing="1rem">
      <Breadcrumb fontSize='xl'>
                <BreadcrumbItem _hover={{backgroundColor: '#153f00',color: 'Tomato',}}>
                    <Link href='/'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem _hover={{ backgroundColor: '#153f00', color: 'Tomato' }}>
      
          </BreadcrumbItem>
                <BreadcrumbItem _hover={{backgroundColor: '#153f00',color: 'Tomato',}}>
                    <Link href='/search'>Search</Link>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>

      <Button
       as ={Link}
        href='/login'
      className="custom-button"
      _hover={{
        backgroundColor: '#153f00',
        color: 'tomato',
      }}
    >
      Log-in
    </Button>
  </HStack>
</Flex>
    )
}