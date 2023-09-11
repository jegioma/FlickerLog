import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            'body': {
                height: '100vh',
                width: '100wh', 
                backgroundSize: '300% 300%',
                backgroundImage: 'linear-gradient(#222323, #21DAE3)', 
                animation: 'gradient linear infinite'
            }
        }
    }
})

export default theme;