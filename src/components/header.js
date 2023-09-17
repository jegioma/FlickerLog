import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/header.module.css'
import {
    Heading, Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, Button
} from '@chakra-ui/react'

export default function Header() {
    return (
        <header className={styles.header}>
            <Heading className={styles.title} fontSize='5xl'>FlickerLog</Heading>

            <Breadcrumb fontSize='xl'>
                <BreadcrumbItem className={styles.links}>
                    <Link href='/index'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className={styles.links}>
                    <Link href='/profile'>Profile</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className={styles.links}>
                    <Link href='/search'>Search</Link>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>

            <Link href='/index'>
                <Button bg='#ffd60a' color='#000407' _hover={{ color: '#ffd60a', backgroundColor: '#000814', border: 'solid #ffd60a 3px', transition: 'all 0.3s ease 0s'}} fontSize='lg' margin='1rem'>Login</Button>
            </Link>
        </header>
    )
}