import Link from 'next/link';
import { Text, Flex, VStack } from '@chakra-ui/react';

export default function Footer() {

  return (
      <Flex justify="space-between" textAlign='center' bg='black' padding='10px 100px'>
          <VStack gap={0}>
            <Text fontSize="md" color='green.400' textDecoration='underline'>FlickerLog</Text>
            <Link href='/'>
              <Text color='green.400' fontSize='sm'>Home</Text>
            </Link>
            <Link href='/about'>
              <Text color='green.400' fontSize='sm'>About</Text>
            </Link>
          </VStack>

          <VStack gap={0}>
            <Text fontSize="md" color='green.400' textDecoration='underline'>Meet The Team</Text>
            <Link href='https://github.com/jegioma' target="_blank">
              <Text color='green.400' fontSize='sm'>Jeancarlo</Text>
            </Link>
            <Link href='https://github.com/FahaoWen' target="_blank">
              <Text color='green.400' fontSize='sm'>Nick</Text>
            </Link>
            <Link href='https://github.com/kelandesu11' target="_blank">
              <Text color='green.400' fontSize='sm'>Kelan</Text>
            </Link>
            <Link href='https://github.com/GrandBradster98' target="_blank">
              <Text color='green.400' fontSize='sm'>Bradley</Text>
            </Link>
          </VStack>

          <VStack gap={0}>
            <Text fontSize="md" color='green.400' textDecoration='underline'>Connect</Text>
            <Link href='https://github.com/jegioma/FlickerLog.git' target="_blank">
              <Text color='green.400' fontSize='sm'>Github</Text>
            </Link>
            <Link href='https://www.ggc.edu/' target="_blank">
              <Text color='green.400' fontSize='sm'>Institution</Text>
            </Link>
          </VStack>

          <VStack gap={0}>
            <Text fontSize="md" color='green.400' textDecoration='underline'>Powered By</Text>
            <Link href='https://nextjs.org' target="_blank">
              <Text color='green.400' fontSize='sm'>NextJS</Text>
            </Link>
            <Link href='https://firebase.google.com/' target="_blank">
              <Text color='green.400' fontSize='sm'>Firebase</Text>
            </Link>
            <Link href='https://chakra-ui.com' target="_blank">
              <Text color='green.400' fontSize='sm'>ChakraUI</Text>
            </Link>
            <Link href='https://developer.themoviedb.org/docs' target="_blank">
              <Text color='green.400' fontSize='sm'>TMDB API</Text>
            </Link>
            <Link href='http://www.omdbapi.com' target="_blank">
              <Text color='green.400' fontSize='sm'>OMDB API</Text>
            </Link>
          </VStack>
      </Flex>
  );
}
