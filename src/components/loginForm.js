import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import {
  Flex,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import ShowAlert from './alert';

import { auth } from '../configure/firebase.js';
import {signInWithEmailAndPassword} from 'firebase/auth';


// components for the login
export const LoginForm = ({ showPassword, togglePasswordVisibility}) => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [showError, setShowError] = useState('no');
    const [errorMessage, setErrorMessage] = useState('');
    const [checkRememberMe, setCheckRememberMe] = useState(false);
    const router = useRouter();

    function Redirect () {
        if (signInSuccess){
         router.push('/profile');
      }
        return null;
    }
  
    const signIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in 
        const user = userCredential.user;

        setSignInSuccess(true);
        
        // ...
      } catch (error) {

        setErrorMessage(error.message);
        setShowError('yes');
        
      }
    };
    
    return (
      <Box>
        {showError==='yes' ? ShowAlert('error', 'Failed!', errorMessage):null}

        <form >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='📧 Enter your email' textAlign={'left'} 
            onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
  
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                onChange={(e) =>setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  background={'none'} color={"White"}
                  aria-label={showPassword ? 'Hide Password' : 'View Password'}
                  icon={showPassword ? <Icon icon={eyeOff} /> : <Icon icon={eye} />}
                  onClick={togglePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
  
          <Stack isInline justifyContent={'space-between'}>
            <Box>
          
              <Checkbox onChange={ (e) => e.target.checked} >Remember me</Checkbox>
            </Box>
            <Box>
              <Link href='/resetPassword'>Forgot password</Link>
            </Box>
          </Stack>
          <Button width='full' mt={4} onClick={() => { signIn(); Redirect(); }} _hover={{ backgroundColor: 'orange' }}>
            <Link href='/'></Link>
              Sign In
          </Button>
  
        </form>
      </Box>
    );
  };