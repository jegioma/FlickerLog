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
      <Flex as="nav" align='center' justify="space-between" padding="1rem" backgroundColor="#16110E" color="black">
        <Center>
          <Image
            src="https://i.pinimg.com/originals/dd/4e/c9/dd4ec99b9e73b0359f4f1dfcd61e39f2.gif"
            alt="New Animated GIF"
            width={75}
            height={75}
            bg='#16110E'
          />
          <Heading className={styles.title} fontSize="5xl" color="green.500">FlickerLog</Heading>
        </Center>
    <HStack spacing="1rem">
      <Breadcrumb fontSize='xl'>
        <BreadcrumbItem color='green.500'_hover={{bg: 'green.500', color: 'white', borderRadius: 10, padding: 1 }}>
            <Link href='/'>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem color='green.500'_hover={{bg: 'green.500', color: 'white', borderRadius: 10, padding: 1 }}>
          {user ? (
              <Link href="/profile">Profile</Link>
            ) : (
              <Link href="/login">Profile</Link>
            )}
        </BreadcrumbItem>
        <BreadcrumbItem color='green.500'_hover={{bg: 'green.500', color: 'white', borderRadius: 10, padding: 1 }}>
          <Link href='/search'>Search</Link>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      </Breadcrumb>

      {userLogin ? (
        <Button 
          colorScheme='yellow'
          onClick={() => signOutUser()}
          as={Link}
          href='/login'
        >Logout</Button>
      ) : (
        <Button 
          colorScheme='yellow'
          as={Link}
          href='/login'
        >Login</Button>
      )}
    </HStack>
  </Flex>
  )
}