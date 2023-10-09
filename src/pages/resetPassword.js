import { useState } from 'react';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { auth } from '@/configure/firebase'; // Make sure this import is correct
import { sendPasswordResetEmail } from 'firebase/auth';
import ShowAlert from '@/components/alert';



export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [showGoodAlert, setShowgoodAlert] = useState('no');
  const [showBadAlert, setShowBadAlert] = useState('no');
  const [errorMessage, setErrorMessage] = useState('');

  const sendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth,email);
      setShowgoodAlert('yes')
      setShowBadAlert('no');
    } catch (error) {
     setErrorMessage(error.message);
     setShowBadAlert('yes');
     setShowgoodAlert('no');
    }
  }

  return (
    <div>
   
        {showGoodAlert ==='yes'? ShowAlert('success', 'Success!', 'Please check your email for the reset link'): null}
        {showBadAlert==='yes' ? ShowAlert('error', 'Failed!', errorMessage):null}
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
        
      <Stack
        color={'white'}
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={'rgba(255, 255, 255, 0.2)'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '2xl', md: '3xl' }}
          align={'center'}
        >
          Forgot your password?
        </Heading>
        <Text align={'center'} fontSize={{ base: 'sm', sm: 'md' }} color={'white'}>
          You'll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={sendResetEmail}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </div>
  );
}
