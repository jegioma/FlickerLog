import { ChakraProvider } from '@chakra-ui/react'
import Header from '@/components/header'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
