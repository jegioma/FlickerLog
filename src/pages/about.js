import { Text, Box, Heading, Divider, HStack, Spacer, Image } from '@chakra-ui/react';

const AboutUs = () => {
  const timesNewRoman = 'Times New Roman, serif';

  return (
    <Box height='100vh' width='100vw' padding='3rem'>
        <Box backgroundColor='#d9d9d9' width='100%' borderRadius={15} padding='3rem'>
          <Heading color="black" fontSize="3xl" textDecoration='underline' marginBottom={5}>About the team</Heading>
          <Text color="black" fontSize="lg">
            We are a dedicated team working on an exciting project called FlickerLog. FlickerLog became a challenging project as we worked tirelessly to achieve our desired blueprint. Our developers were passionate and excited to take on this challenge, producing a movie database application that provides a comfortable and safe website to archive and explore the film industry&rsquo;s greatest collection to ever exist! We hope our users enjoy a great time experiencing FickerLog as we are devoted to offering simple and diverse technology. Happy Searching!
          </Text>
          <HStack justify='center' marginTop='3rem'>
            <Heading fontSize='lg'>Powered By:</Heading>
            <Image
              src='/attritions.png'
              width={400}
              height={200}
              border='ridge 3px black'
              bg='yellow.500'
              alt='Tech Stack'
            />
          </HStack>
      </Box>
    </Box>
  );
};

export default AboutUs;
