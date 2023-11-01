import React, {useEffect, useState } from 'react';

import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import {db, addDoc, collection,getDocs,auth,where,query} from '../configure/firebase.js';
import { createUserWithEmailAndPassword} from 'firebase/auth';

import ShowAlert from './alert.js';
import validator from 'validator';

//components for the Register
export const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [userName, setUserName] = useState('');
    const [vertifyPassword, setVertifyPassword] = useState(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format as a string: "MM/DD/YYYY"

    const [showGoodAlert, setShowgoodAlert] = useState('no');
    const [showBadAlert, setShowBadAlert] = useState('no');
    const [errorMessage, setErrorMessage] = useState('');
    const [allName, setAllName] = useState([]);

    // define the collection from firebase
    const userRef = collection(db, "Users");
    

    // Create authentication user with email and password
    const Register = async () => {
     try{
      const user  = await createUserWithEmailAndPassword(auth, email, password);
      setShowgoodAlert('yes');
      setShowBadAlert('no');
     }
     catch(error){
      setShowBadAlert('yes');
      setShowgoodAlert('no');
      setErrorMessage(error.message);
     }
    }
   

    // Save user information to firebase firestore
    const saveUser = async () => {
  
     try{
        await addDoc(userRef, 
          {
            userName: userName.toLowerCase(),
            email: email.toLowerCase(),
            password: password,
            memberSince: formattedDate,
          });
         
     }catch(error){
       console.log(error);
      
     }
  }


    // Check if password and confirm password match
    useEffect(() => {
      async function checkPassword() {
        if (password !== confirmPassword) {
          setVertifyPassword(false);
         
        } else {
          setVertifyPassword(true);

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

    const getUserNames = async () => {
      
      // setup query to get specific user info
      try {
      
        const q = query(userRef, where("userName", "==",userName.toLowerCase()));
        const querySnapshot = await getDocs(q);
        const dataArray = [];
        // get the data array from the querySnapshot only
        querySnapshot.docs.map((doc) => {
          
          const data = doc.data();
          dataArray.push(data);
 
        });
        setAllName(dataArray); // assign the data to a usestate
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
   
    }

  function checkUserName(){
    
 
    getUserNames()

    if (allName.length === 0){
      console.log(allName);
      console.log('empty');
        return true;
    }
   
      return false;
  }
    

    return (
      <Box>
        {showGoodAlert ==='yes'? ShowAlert('success', 'Success!', 'You successfully register'): null}
        {showBadAlert==='yes' ? ShowAlert('error', 'Failed!', errorMessage):null}

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
            <Input type='text' placeholder='Enter your user name'
            onChange={(e) => {setUserName(e.target.value)}} />
          </FormControl>
          
          <Button
            width={'full'}
            mt={4}
            _hover={{ backgroundColor: 'orange' }}
            onClick={() => {
              if (!ValidateEmail(email)) {
                setShowgoodAlert('no');
                setShowBadAlert('yes');
                setErrorMessage('Please enter a valid email address');
              }

              else if (checkUserName()===false){
                setShowgoodAlert('no');
                setShowBadAlert('yes');
                setErrorMessage('User name already exist, please use a different user name');
              }
               // Call checkPassword function
              else if (vertifyPassword) {
                Register(); 
                saveUser()
                if (showGoodAlert ==='yes'){
                saveUser()// Call Register function if vertifyPassword is true
                setShowgoodAlert('yes');
                setShowBadAlert('no');
                };
                
                
              } else {
               setShowgoodAlert('no');
               setShowBadAlert('yes');
               setErrorMessage('Password do not match');
              }
          ;}}
          >
            Sign up
          </Button>
  
        </form>
      </Box>
    );
  };
