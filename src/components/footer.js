import React, { useState } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Link } from '@chakra-ui/react';

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    return (
        <Box textAlign="center" mt={4} mb={4} bg="black" p={4}>
            <Button colorScheme="blue" mt={4} onClick={() => setIsOpen(true)}>About Us</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">About Us</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={4}>
                            <Text fontSize="xl" mb={2}>Explore Our Website:</Text>
                            <Link href="/" color="blue.500" _hover={{ color: "blue.600" }} mb={2} display="block">Home</Link>
                            <Link href="/about" color="blue.500" _hover={{ color: "blue.600" }} mb={2} display="block">About</Link>
                            <Link href="/services" color="blue.500" _hover={{ color: "blue.600" }} mb={2} display="block">Services</Link>
                            <Link href="/team" color="blue.500" _hover={{ color: "blue.600" }} mb={2} display="block">Team</Link>
                            <Link href="/contact" color="blue.500" _hover={{ color: "blue.600" }} display="block">Contact</Link>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
