import React from 'react';
import Link from 'next/link';
import { Box, Text, Flex, Image, Divider, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, VStack, Center, HStack, } from '@chakra-ui/react';

export default function Footer() {
  const forestGreen = "#228B22"; // Forest Green color

  return (
    
    <Box textAlign="center" mt={4} mb={4} bg="black" p={4} color="white">
      <Divider my={4} borderColor="#2E8B57" />
      <Flex justify="space-between">
        {/* First Column */}
        <Box>
          <Text fontSize="xl" mb={2} color={forestGreen}>
            FlickerLog
          </Text>
          <div>
          <Link href="/home" passHref>
            <div style={{ display: 'block', marginBottom: '2px', color: '#2E8B57' }}>
             Home
            </div>
          </Link>
          </div>
          <div>
            <Link href="/aboutus" passHref>
              <div style={{ display: 'block', marginBottom: '2px', color: '#2E8B57' }}>
                About Us
              </div>
            </Link>
          </div>

          {/* Using Popover for "Settings" link */}
          <Popover>
            <PopoverTrigger>
              <div>
                <Text style={{ display: 'block', marginBottom: '2px', color: '#2E8B57', cursor: 'pointer' }}>
                  Settings
                </Text>
              </div>
            </PopoverTrigger>
            <PopoverContent border="0" borderRadius="0">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader marginTop="0">Login Profile</PopoverHeader>
              <PopoverBody>
                <div>
                  <Link href="/login" passHref>
                    <div style={{ display: 'block', color: '#2E8B57' }}>
                      Login
                    </div>
                  </Link>
                </div>
                <div>
                  <Link href="/profile" passHref>
                    <div style={{ display: 'block', color: '#2E8B57' }}>
                      Profile
                    </div>
                  </Link>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

        {/* Second Column */}
        <Box>
          <Text fontSize="xl" mb={2} color={forestGreen}>
            Follow Us
          </Text>
          <div>
            <Link href="/jeancarlo" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                JeanCarlo
              </div>
            </Link>
          </div>
          <div>
            <Link href="/nick" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                Nick
              </div>
            </Link>
          </div>
          <div>
            <Link href="/kelan" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                Kelan
              </div>
            </Link>
          </div>
          <div>
            <Link href="/bradley" passHref>
              <div style={{ display: "block", color: "#2E8B57" }}>
                Bradley
              </div>
            </Link>
          </div>
        </Box>

        {/* Third Column */}
        <Box>
          <Text fontSize="xl" mb={2} color={forestGreen}>
            Connect
          </Text>
          <div>
            <Link href="https://github.com/jegioma/FlickerLog.git" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                Github
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://www.ggc.edu/" passHref>
              <div style={{ display: "block", color: "#2E8B57" }}>
                Institution
              </div>
            </Link>
          </div>
        </Box>

        {/* Fourth Column */}
        <Box>
          <Text fontSize="xl" mb={2} color={forestGreen}>
            Powered By
          </Text>
          <div>
            <Link href="https://nodejs.org/en" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                Node.JS
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://react.dev/" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                React
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://firebase.google.com/" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                Firebase
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://chakra-ui.com/" passHref>
              <div style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>
                ChakraUI
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://code.visualstudio.com/Docs/languages/javascript" passHref>
              <div style={{ display: "block", color: "#2E8B57" }}>
                JavaScript
              </div>
            </Link>
          </div>
          <div>
            <Link href="https://developer.themoviedb.org/docs" passHref>
              <div style={{ display: "block", color: "#2E8B57" }}>
                TMDB api
              </div>
            </Link>
          </div>
        </Box>

        {/* Fifth Column */}
        <Box>
          {/* Center the header text */}
          <VStack spacing={2} align="center">
            {/* Display the image from Firebase Storage */}
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Attrition%2FAttritionLogo.PNG?alt=media&token=d506776a-038b-4ad7-81e3-fe9b67825001"
              alt="Attrition Logo"
              maxH="70%" // Set the maximum height to 40% of its container
              maxW="65%" // Set the maximum width to 80% of its container
            />
          </VStack>
        </Box>
      </Flex>

      {/* Divider between columns and "Copyright Text" */}
      <Divider my={4} borderColor="#2E8B57" />
      

      
    </Box> 
  );
}
