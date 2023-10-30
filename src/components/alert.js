import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react';

function ShowAlert (status, title, description) {
    return (
    <Alert status={status} borderRadius = {'7px'} color={'black'}>
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
   </Alert>
    )
  }

  export default ShowAlert;

