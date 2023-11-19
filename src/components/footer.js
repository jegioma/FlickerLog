import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';

export default function Footer() {
    const forestGreen = "#228B22"; // Forest Green color

    return (
        <Box textAlign="center" mt={4} mb={4} bg="black" p={4} color="white">
            <Flex justify="space-between">
                {/* First Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>FlickerLog</Text>
                    <a href="/" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Home</a>
                    <a href="/about" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>About Us</a>
                    <a href="/settings" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Settings</a>
                    <a href="/profile" style={{ display: "block", color: "#2E8B57" }}>Profile</a>
                </Box>

                {/* Second Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>Follow Us</Text>
                    <a href="/jeancarlo" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>JeanCarlo</a>
                    <a href="/nick" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Nick</a>
                    <a href="/kelan" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Kelan</a>
                    <a href="/bradley" style={{ display: "block", color: "#2E8B57" }}>Bradley</a>
                </Box>

                {/* Third Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>Connect</Text>
                    <a href="https://github.com/jegioma/FlickerLog.git" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Github</a>
                    <a href="https://www.ggc.edu/" style={{ display: "block", color: "#2E8B57" }}>Institution</a>
                </Box>

                {/* Fourth Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>Powered By</Text>
                    <a href="https://nodejs.org/en" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Node.JS</a>
                    <a href="https://react.dev/" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>React</a>
                    <a href="https://firebase.google.com/" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Firebase</a>
                    <a href="https://chakra-ui.com/" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>ChakraUI</a>
                    <a href="https://code.visualstudio.com/Docs/languages/javascript" style={{ display: "block", color: "#2E8B57" }}>JavaScript</a>
                    <a href="https://developer.themoviedb.org/docs" style={{ display: "block", color: "#2E8B57" }}>TMDB api</a>
                </Box>

                {/* Fifth Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>Attrition Logo</Text>
                    <Image src="/Attrition logo.PNG" alt="Attrition Logo" />
                </Box>
            </Flex>

            {/* Copyright Text */}
            <Text mt={4}>
                <a href="/terms" style={{ color: "#2E8B57" }}>Terms</a> | 
                <a href="/privacy" style={{ color: "#2E8B57" }}> Privacy</a> | 
                <a href="/contact-us" style={{ color: "#2E8B57" }}> Contact Us</a>
            </Text>
        </Box>
    );
}
