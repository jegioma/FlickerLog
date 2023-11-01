import {
  Box, SimpleGrid, Grid, GridItem, VStack, HStack, Stack, Text, Heading, Image, Card, IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import UserInfo from '@/components/userInfo';
import CreateWatchList from '@/components/createWatchList';
import {DisplayList} from '@/components/displayWatchlist';
import { FriendList } from '@/components/friendsList';
export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box height='100vh' width='90vw' padding='3rem'>
      <Grid templateColumns='repeat(2, 1fr)' gap={5} height='90%'>
        <GridItem>
        <UserInfo />
        </GridItem>
        <GridItem>
          <DisplayList/>
        </GridItem>

        <GridItem>
          <FriendList/>
        </GridItem>
      </Grid>
      
    </Box>
  );
}
