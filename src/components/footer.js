import React from 'react';
import { Box, Text, Flex, Divider, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, VStack, Image } from '@chakra-ui/react';
import Link from 'next/link';

export default function Footer() {
  const forestGreen = "#228B22"; // Forest Green color
  
  return (
    <Box textAlign="center" mt={4} mb={4} bg="black" p={4} color="white">
      <Flex justify="space-between">
        {/* First Column */}
        <Box>
          <Text fontSize="xl" mb={2} color={forestGreen}>
            FlickerLog
          </Text>
          <Link href="/home">
            <div>
            <a style={{ display: 'block', marginBottom: '2px', color: '#2E8B57' }}>
              Home
            </a>
            </div>
          </Link>
          <Link href="/aboutus">
            <div>
            <a style={{ display: 'block', marginBottom: '2px', color: '#2E8B57' }}>
              About Us
            </a>
            </div>
          </Link>

          {/* Using Popover for "Settings" link */}
          <Popover>
            <PopoverTrigger>
              <Link href="#">
                <div>
                <a style={{ display: 'block', marginBottom: '2px', color: '#2E8B57' }}>
                  Settings
                </a>
                </div>
              </Link>
            </PopoverTrigger>
            <PopoverContent border="0" borderRadius="0">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader marginTop="0">Login Profile</PopoverHeader>
              <PopoverBody>
                <Link href="/login">
                  <div>
                  <a style={{ display: 'block', color: '#2E8B57' }}>
                    Login
                  </a>
                  </div>
                </Link>
                <Link href="/profile">
                  <div>
                  <a style={{ display: 'block', color: '#2E8B57' }}>
                    Profile
                  </a>
                  </div>
                </Link>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

        {/* ... (similar changes for other columns) */}

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

      {/* Copyright Text */}
      <Text mt={4}>
        <Link href="/terms">
          <div>
          <a style={{ color: "#2E8B57" }}>
            Terms
          </a>
          </div>
        </Link>{" "}
        |{" "}
        <Link href="/privacy">
          <div>
          <a style={{ color: "#2E8B57" }}>
            Privacy
          </a>
          </div>
        </Link>{" "}
        |{" "}
        <Link href="/contact-us">
          <div>
          <a style={{ color: "#2E8B57" }}>
            Contact Us
          </a>
          </div>
        </Link>
      </Text>
    </Box>
  );
}
