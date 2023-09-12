import { Box, SimpleGrid } from '@chakra-ui/react';
import EventCard from '../components/EventCard';
import Layout from '../components/Layout';

function MainPage() {
  return (
    <Layout>
      <Box margin='16px'>
        <SimpleGrid minChildWidth='256px' spacing='36px'>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </SimpleGrid>
      </Box>
    </Layout>
  );
}

export default MainPage;
