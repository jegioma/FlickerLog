// import {
//     Box
// } from '@chakra-ui/react'

// export default function Profile() {

//     return (
//         <Box>
            
//         </Box>
//     )
// }

import { Box, Button, Image } from "@chakra-ui/react";
import { useState } from 'react';

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((current) => (current + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <Box>
      <Button onClick={prevImage}>Previous</Button>
      <Image src={images[index]} alt="" />
      <Button onClick={nextImage}>Next</Button>
    </Box>
  );
};

export default Carousel;
