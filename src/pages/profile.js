import {
  Box, Grid, GridItem,
} from '@chakra-ui/react';
import UserInfo from '@/components/userInfo';
import {DisplayList} from '@/components/displayWatchlist';
import { FriendList } from '@/components/friendsList';
export default function Profile() {

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
