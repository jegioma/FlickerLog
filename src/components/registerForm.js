import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { db, doc, setDoc, collection, auth } from '../configure/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import ShowAlert from './alert.js';
import validator from 'validator';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [verifyPassword, setVerifyPassword] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const [showGoodAlert, setShowGoodAlert] = useState('no');
  const [showBadAlert, setShowBadAlert] = useState('no');
  const [errorMessage, setErrorMessage] = useState('');

  const userRef = collection(db, 'Users');

  const Register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      setShowGoodAlert('yes');
      setShowBadAlert('no');
    } catch (error) {
      setShowBadAlert('yes');
      setShowGoodAlert('no');
      setErrorMessage(error.message);
    }
  };

  const saveUser = async () => {
    try {
      // Save user data to Firebase
      const userDocRef = doc(db, 'Users', userName.toLowerCase()); // Assuming userName is the document ID of the user
      await setDoc(userDocRef, {
        userName: userName.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
        memberSince: formattedDate,
      });
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  };

  useEffect(() => {
    async function checkPassword() {
      if (password !== confirmPassword) {
        setVerifyPassword(false);
      } else {
        setVerifyPassword(true);
      }
    }
    checkPassword();
  }, [password, confirmPassword]);

  function ValidateEmail(email) {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box>
      {showGoodAlert === 'yes' ? ShowAlert('success', 'Success!', 'You successfully registered') : null}
      {showBadAlert === 'yes' ? ShowAlert('error', 'Failed!', errorMessage) : null}

      <form>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" textAlign={'left'} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input type="text" placeholder="Enter your user name" onChange={(e) => setUserName(e.target.value)} />
        </FormControl>

        <Button
          width={'full'}
          mt={4}
          _hover={{ backgroundColor: 'orange' }}
          onClick={() => {
            if (!ValidateEmail(email)) {
              setShowGoodAlert('no');
              setShowBadAlert('yes');
              setErrorMessage('Please enter a valid email address');
            } else if (verifyPassword) {
              Register();
              if (showGoodAlert === 'yes') {
                saveUser();
                setShowGoodAlert('yes');
                setShowBadAlert('no');
              }
            } else {
              setShowGoodAlert('no');
              setShowBadAlert('yes');
              setErrorMessage('Passwords do not match');
            }
          }}
        >
          Sign up
        </Button>
      </form>
    </Box>
  );
};
