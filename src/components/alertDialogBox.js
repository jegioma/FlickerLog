import {
   AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';

export default function AlertDialogBox({ isOpen, onClose }) {
    
    const cancelRef = useRef();

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Account Required</AlertDialogHeader>
                    
                    <AlertDialogBody>You must log in or create an account to have access this feature.</AlertDialogBody>
                    <AlertDialogFooter gap={5}>
                        <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                        <Link href='/login'>
                            <Button colorScheme='yellow'>Login</Button>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}