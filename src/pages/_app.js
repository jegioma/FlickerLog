import { 
  ChakraProvider, CSSReset, Box
} from '@chakra-ui/react'
import theme from '@/components/themes/themeConfig'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box as='main' minHeight='100vh' display='flex' flexDirection='column'>
        <Header /> 
        <Box flexGrow={1}>
          <Component {...pageProps} />
       </Box>
       <Footer/>
      </Box>
    </ChakraProvider>
  )
}
