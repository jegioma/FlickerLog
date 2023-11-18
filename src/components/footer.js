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
                    <a href="/github" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Github</a>
                    <a href="/institution" style={{ display: "block", color: "#2E8B57" }}>Institution</a>
                </Box>

                {/* Fourth Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>Powered By</Text>
                    <a href="/nodejs" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Node.JS</a>
                    <a href="/react" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>React</a>
                    <a href="/firebase" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>Firebase</a>
                    <a href="/ChakraUI" style={{ display: "block", marginBottom: "2px", color: "#2E8B57" }}>ChakraUI</a>
                    <a href="/javascript" style={{ display: "block", color: "#2E8B57" }}>JavaScript</a>
                    <a href="/TMDB api" style={{ display: "block", color: "#2E8B57" }}>TMDB api</a>
                </Box>

                {/* Fifth Column */}
                <Box>
                    <Text fontSize="xl" mb={2} color={forestGreen}>Attrition Logo</Text>
                    <Image src="/Attrition logo.PNG" alt="Attrition Logo" />
                </Box>
            </Flex>

            {/* Copyright Text */}
            <Text mt={4}>© 2023 FlickerLog. All Rights Reserved.</Text>
        </Box>
    );
}
