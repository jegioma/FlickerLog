import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Flex, Text, HStack } from '@chakra-ui/react';
import styles from '../styles/index.module.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function CarouselWithHover({ images, imdbIds }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchMovieInfo = async (index) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbIds[index]}&apikey=9dce2383`);
      setMovieInfo(response.data);
    } catch (error) {
      console.error('Error fetching movie info:', error);
    }
  };

  useEffect(() => {
    if (isHovered) {
      fetchMovieInfo(currentIndex);
    } else {
      setMovieInfo(null);
    }
  }, [isHovered, currentIndex, imdbIds]);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
    setMovieInfo(null); // Clear movie info when changing slides
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        showArrows={true}
        showThumbs={false}
        width="100%"
        selectedItem={currentIndex}
        onChange={handleSlideChange}
      >
        {images.map((image, index) => (
          <div key={index}>
            <LazyLoadImage
              src={image}
              alt={`Image ${index}`}
              width="100%"
              height="auto"
              effect="blur"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>

      {isHovered && movieInfo && (
        <Box
          backgroundColor="rgba(0, 0, 0, 0.8)"
          color="#ffffff"
          padding="8px"
          fontSize="14px"
          textAlign="center"
        >
          <Text fontSize="20px" fontWeight="bold">
            {movieInfo.Title}
          </Text>
          <Text>{movieInfo.Plot}</Text>
          <div style={{ border: '1px solid #ffffff', margin: '8px 0' }}></div> {/* Add this div for the border */}
          <Text>
            <strong>Box Office:</strong> {movieInfo.BoxOffice}
          </Text>
          <Text>
            <strong>Year:</strong> {movieInfo.Year}
          </Text>
          <Text>
            <strong>Rated:</strong> {movieInfo.Rated}
          </Text>
          <Text>
            <strong>Released:</strong> {movieInfo.Released}
          </Text>
          <Text>
            <strong>Runtime:</strong> {movieInfo.Runtime}
          </Text>
          <Text>
            <strong>Genre:</strong> {movieInfo.Genre}
          </Text>
          <Text>
            <strong>Director:</strong> {movieInfo.Director}
          </Text>
          <Text>
            <strong>Writer:</strong> {movieInfo.Writer}
          </Text>
          <Text>
            <strong>Actors:</strong> {movieInfo.Actors}
          </Text>
        </Box>
      )}
    </div>
  );
}

export default function Index() {
  const imdbIds1 = [
    'tt4682562',
    'tt9362722',
    'tt1745960',
  ];
  const imdbIds2 = [
    'tt14986406',
    'tt6751668',
  ];
  const imdbIds3 = [
    'tt15398776',
    'tt1630029',
    'tt1517268',
  ];

  const images1 = [
    '/office.jpeg',
    '/spiderverse.jpeg',
    '/maverick.jpg',
  ];
  const images2 = [
    '/bleach.jpg',
    '/parasite.jpg',
  ];
  const images3 = [
    'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
  ];

  return (
    <>
      <Heading fontSize="5xl" color="#f2f2f2" marginTop="3rem" textAlign="center">
        🎥 Your Ultimate Movies and TV Show Hub 📺
      </Heading>

      <Box className={styles.body} margin={0} padding={0} marginTop="1rem">

        <Flex justifyContent="center">
          <HStack spacing="2rem">
            
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text fontSize="xl" color="blue" fontWeight="bold" marginBottom="1rem">
                Category 1
              </Text>
              <Box
                backgroundColor="blue"
                padding="0.5rem"
                borderRadius="10px"
                width="100%"
                maxWidth="400px"
              >
                <CarouselWithHover images={images1} imdbIds={imdbIds1} />
              </Box>
            </Flex>

            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text fontSize="xl" color="green" fontWeight="bold" marginBottom="1rem">
                Category 2
              </Text>
              <Box
                backgroundColor="green"
                padding="0.5rem"
                borderRadius="10px"
                width="100%"
                maxWidth="400px"
              >
                <CarouselWithHover images={images2} imdbIds={imdbIds2} />
              </Box>
            </Flex>

            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text fontSize="xl" color="red" fontWeight="bold" marginBottom="1rem">
                Category 3
              </Text>
              <Box
                backgroundColor="red"
                padding="0.5rem"
                borderRadius="10px"
                width="100%"
                maxWidth="400px"
              >
                <CarouselWithHover images={images3} imdbIds={imdbIds3} />
              </Box>
            </Flex>
          </HStack>
        </Flex>

        <Heading fontSize="2xl" color="#f2f2f2" textAlign="center" marginTop="2rem">
          ⭐️ Discover, Watch, and Discuss Your Favorite Movies and TV Shows ⭐️
        </Heading>
      </Box>
    </>
  );
}
