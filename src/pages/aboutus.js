// pages/AboutUs.js
import React from 'react';
import { Text, Box } from '@chakra-ui/react';

const AboutUs = () => {
  const timesNewRoman = 'Times New Roman, serif';

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <div style={{ textAlign: 'center', flex: '1' }}>
        <Text color="#228B22" fontSize="2xl" fontWeight="bold" fontFamily={timesNewRoman} mb={4}>
          Welcome to Our Team&rsquo;s About Us Page!
        </Text>
        <Text color="#228B22" fontSize="lg" fontFamily={timesNewRoman} mb={8}>
          We are a dedicated team working on an exciting project called FlickerLog. FlickerLog became a challenging project as we worked tirelessly to achieve our desired blueprint. Our developers were passionate and excited to take on this challenge, producing a movie database application that provides a comfortable and safe website to archive and explore the film industry&rsquo;s greatest collection to ever exist! We hope our users enjoy a great time experiencing FickerLog as we are devoted to offering simple and diverse technology. Happy Searching!
        </Text>
        <Text color="#228B22" fontSize="lg" fontFamily={timesNewRoman} mb={16}>
          Feel free to learn more about each team member and our project. If you have any questions or suggestions, you can contact us through the provided links.
        </Text>
      </div>
    </Box>
  );
};

export default AboutUs;
