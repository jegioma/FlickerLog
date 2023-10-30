import React, { useEffect, useState, } from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import {
  Flex,
  Box,
  Stack,
  Button,
} from '@chakra-ui/react';

// import custom make components
import { LoginForm } from '@/components/loginForm.js';
import { RegisterForm } from '@/components/registerForm.js';



// The main box of the login page 
export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [signInClicked, setSignInClicked] = useState(true);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Toggle between sign in and register forms
  const toggleForm = (isSignIn) => {
    setShowLoginForm(true);
    if (isSignIn) {
      setSignInClicked(true);
      setRegisterClicked(false);
    } else {
      setSignInClicked(false);
      setRegisterClicked(true);
    }
  };

  // Toggle for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  // the main box of the login page
  return (


    <Flex align={'center'} justifyContent={'center'} minHeight={'70vh'}>
  
      <Box
        border={'solid'}
        width={'full'}
        maxWidth={'500px'}
        padding={'2em'}
        borderColor={'pink'}
        borderWidth={'3px'}
        color={'white'}
        borderRadius={'2em'}
        backgroundColor= {'rgba(255, 255, 255, 0.2)'}>
        
        <Stack isInline justifyContent={'space-around'}>
          <Box>
            <Button
              fontSize={'1.2em'}
              background={signInClicked ? 'Green' : 'none'}
              color={'White'}
              paddingLeft={'3em'}
              paddingRight={'3em'}
              _hover={{ backgroundColor: 'Green' }}
              onClick={() => toggleForm(true)}
            >
              Sign in
            </Button>
          </Box>

          <Box>
            <Button
              fontSize={'1.2em'}
              background={registerClicked ? 'Green' : 'none'}
              color={'White'}
              paddingLeft={'3em'}
              paddingRight={'3em'}
              _hover={{ backgroundColor: 'Green' }}
              onClick={() => {
                toggleForm(false);
                setShowLoginForm(false);
              }}
            >
              Register
            </Button>
          
          </Box>
        </Stack>
        {showLoginForm === true ? <LoginForm showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} /> : <RegisterForm />}
      </Box>
    </Flex>

  );
}

