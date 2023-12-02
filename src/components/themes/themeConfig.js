import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            'body': {
                height: '100vh',
                width: '100wh', 
                backgroundSize: '400% 400%',
                backgroundImage: 'linear-gradient(#222323, #2E8B57)', 
                animation: 'gradient linear infinite'
            }
            
        }
    }
})

export default theme;