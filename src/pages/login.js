import React, { useEffect, useState, } from 'react';
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
  IconButton
} from '@chakra-ui/react';


// firebase imports
import {auth} from '../configure/firebase.js';
import { createUserWithEmailAndPassword, 
  signInWithEmailAndPassword } from 'firebase/auth';
import db from '../configure/firebase.js';

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
        borderColor={'White'}
        borderWidth={'3px'}
        color={'White'}
      >
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


// components for the login
const LoginForm = ({ showPassword, togglePasswordVisibility}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("yes, yes, yes");
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("No no no");
    }
  };
  

  return (
    <Box>
      <form>
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
            <Checkbox>Remember me</Checkbox>
          </Box>
          <Box>
            <Link href='/'>Forgot password</Link>
          </Box>
        </Stack>
        <Button width='full' mt={4} onClick={signIn}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

//components for the Register
const RegisterForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [userName, setUserName] = useState('');
  const [vertifyPassword, setVertifyPassword] = useState(false);


  const Register = async () => {
   try{
    const user  = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
   }
   catch(error){
     console.log(error);
   }
  }

  useEffect(() => {
    async function checkPassword() {
      if (password !== confirmPassword) {
        setVertifyPassword(false);
        console.log("Password do not match");
        console.log(vertifyPassword);
      } else {
        setVertifyPassword(true);
        console.log("Password match");
        console.log(vertifyPassword);
      }
    }
    
    checkPassword();
  }, [password, confirmPassword]);
  
  return (
    <Box>
      <form>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='Enter your email' textAlign={'left'}
            onChange={(e) => {setEmail(e.target.value)}} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input type='text' placeholder='Enter your password' 
          onChange={(e) => {setPassword(e.target.value)}}/>

          <InputRightElement>
          </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input type='text' placeholder='Confirm your password' 
          onChange = {(e) => {setConfirmPassword(e.target.value)}}
          />
        </FormControl>

        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input type='text' placeholder='Enter your user name' />
        </FormControl>
        
        <Button
          width={'full'}
          mt={4}
          onClick={() => {
             // Call checkPassword function
            if (vertifyPassword) {
              Register(); // Call Register function if vertifyPassword is true
            } else {
              alert("Passwords do not match, please check");
            }
          }}
        >
          Sign up
        </Button>

      </form>
    </Box>
  );
};
