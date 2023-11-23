import {
    Heading, HStack, Image, Button, Flex, Center, Breadcrumb, BreadcrumbItem, BreadcrumbSeparator
  } from '@chakra-ui/react'
import styles from '../styles/index.module.css'
import Link from 'next/link';
import { auth } from '../configure/firebase.js';
import { useState, useEffect } from 'react';
import { signOutUser } from '@/pages/api/accountApi';

export default function Header() {
  const [user, setUser] = useState(""); // Initialize user state
  const userLogin = auth.currentUser;

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
      <Breadcrumb fontSize='xl'>
      <BreadcrumbItem color='#fff'_hover={{color: '#2E8B57' }}>
                    <Link href='/'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem color='#fff'_hover={{color: '#2E8B57' }}>
                {user ? (
              <Link href="/profile">Profile</Link>
            ) : (
              <Link href="/login">Profile</Link>
            )}
          </BreadcrumbItem>
          <BreadcrumbItem color='#fff'_hover={{color: '#2E8B57' }}>
                    <Link href='/search'>Search</Link>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>

    {userLogin ? (
      <Button 
        colorScheme='green'
        onClick={() => signOutUser()}
        as={Link}
        href='/login'
      >Logout</Button>
    ) : (
      <Button 
        colorScheme='green'
        as={Link}
        href='/login'
      >Login</Button>
    )}
  </HStack>
</Flex>
    )
}