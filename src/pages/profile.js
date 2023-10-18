import {
  Box, SimpleGrid, Grid, GridItem, VStack, HStack, Stack, Text, Heading, Image, Card, IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import UserInfo from '@/components/userInfo';
import CreateWatchList from '@/components/createWatchList';
import {DisplayList} from '@/components/displayWatchlist';
export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box height='100vh' width='100vw' padding='3rem' border='solid red 3px'>
      <Grid templateColumns='repeat(2, 1fr)' gap={5} height='90%'>
        <UserInfo />
        <GridItem>
          <DisplayList/>
        </GridItem>
      </Grid>
      
    </Box>
  );
}
