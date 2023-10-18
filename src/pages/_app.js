import { 
  ChakraProvider, CSSReset, Box
} from '@chakra-ui/react'
import theme from '@/pages/service/themeConfig'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box as='main' minHeight='100vh' minWidth='100wh'>
        <Header /> 
        <Component {...pageProps} />
        <Footer/>
      </Box>
    </ChakraProvider>
  )
}
