import { useState, useEffect, useMemo } from 'react'; // <-- Include useMemo
import axios from 'axios';
import { Box, Heading, Flex, Text, HStack, Container, VStack, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function CarouselWithHover({ images, imdbIds, currentIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    const fetchMovieInfo = async (index) => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${imdbIds[index]}&apikey=9dce2383`);
        setMovieInfo(response.data);
      } catch (error) {
        console.error('Error fetching movie info:', error);
      }
    };

    if (isHovered) {
      fetchMovieInfo(currentIndex);
    } else {
      setMovieInfo(null);
    }
  }, [isHovered, currentIndex, imdbIds]);

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
        onChange={() => {}} // Keep this empty to avoid unwanted behavior
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
          <div style={{ border: '1px solid #ffffff', margin: '8px 0' }}></div>
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
  const imdbIds1 = useMemo(() => [
    'tt3291150',
    'tt0439572',
    'tt1745960',
    'tt5433140',
    'tt15398776',
    'tt12343534'
  ], []);
  const imdbIds2 = useMemo(() => [
    'tt8005118',
    'tt1981558',
    'tt4682562',
    'tt14209916',
    'tt6791350',
    'tt2861424',
  ], []);
  const imdbIds3 = useMemo(() => [
    'tt6751668',
    'tt1630029',
    'tt1517268',
    'tt9764362',
    'tt13833688',
    'tt3704428'
  ], []);

  const images1 = useMemo(() => shuffleArray([
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel1%2Fdownload.jpg?alt=media&token=80ed5e18-c304-41f7-aded-b0aca9531e67&_gl=1*2ccg42*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1Njg2NS4yNi4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel1%2Fdownload%20(1).jpg?alt=media&token=5c8d4164-ddbd-4579-8e9e-6206c73594ef&_gl=1*1gk28m9*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1Njk4OC41OC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel1%2Fdownload%20(2).jpg?alt=media&token=c8098756-dd1c-4a38-848d-6fbe4eb8721c&_gl=1*lbgmdm*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzAwNi40MC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel1%2Fdownload%20(3).jpg?alt=media&token=10ecc42b-0256-4eb9-8991-e43c73298195&_gl=1*j5oh2w*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzA0Ni42MC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel1%2FMV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY%40._V1_SX300.jpg?alt=media&token=be07007f-e82c-4454-848b-a4c128d22c68&_gl=1*rwwmgq*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzA3Mi4zNC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel1%2F818DUzqnwES._AC_SL1500_.jpg?alt=media&token=c6d27507-8b1b-47ba-9e82-863686b38097&_gl=1*1bujrch*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzEyNy42MC4wLjA.'
  ]), []);
  const images2 = useMemo(() => shuffleArray([
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel2%2Fdownload%20(4).jpg?alt=media&token=edc4e12d-fe1a-48a8-9241-03acefe04656&_gl=1*9me9xc*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzE5Mi41Ni4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel2%2Fdownload.jpg?alt=media&token=993d161b-3029-438c-99bb-fe2da5a12cb1&_gl=1*ut4fgy*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzIwOS4zOS4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel2%2Fdownload%20(1).jpg?alt=media&token=a15270ce-8963-4a30-9c96-477d49c2716f&_gl=1*amjaqq*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzIzMy4xNS4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel2%2Fdownload%20(2).jpg?alt=media&token=375f235a-5a27-469c-a571-cf7be76082f5&_gl=1*1b5dars*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzI2MC42MC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel2%2Fdownload%20(3).jpg?alt=media&token=ce689122-4134-42db-9de9-a90048d6cf8c&_gl=1*o605ty*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzI4MC40MC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel2%2Fdownload%20(5).jpg?alt=media&token=05497db5-c8e5-4ab4-a902-2b2793d4f5ac&_gl=1*rpojnk*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzMwMy4xNy4wLjA.',

  ]), []);
  const images3 = useMemo(() => shuffleArray([
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel3%2Fdownload%20(6).jpg?alt=media&token=bf03036c-4695-451d-80b8-ec0df4a2959d&_gl=1*184ljh2*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzQyMi41Ni4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel3%2FMV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA%40._V1_SX300.jpg?alt=media&token=70c8ab33-3e40-4bbe-baba-aa98434c060f&_gl=1*mrwwpc*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzQ3Ni4yLjAuMA..',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel3%2FMV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg?alt=media&token=095c4d6c-486e-481a-88ec-60d5360e13d9&_gl=1*1k28ai8*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzQ5MS42MC4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel3%2Fdownload.jpg?alt=media&token=5ef1e957-9d9c-4b82-8db5-6d38dc7eb60c&_gl=1*10lmmiq*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzUyOS4yMi4wLjA.',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel3%2Fdownload%20(1).jpg?alt=media&token=f59d33e9-114e-4ad7-b639-340272c5e993&_gl=1*11g9ry4*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzU0Ny40LjAuMA..',
    'https://firebasestorage.googleapis.com/v0/b/flicklog-980df.appspot.com/o/Carousel3%2Fdownload%20(2).jpg?alt=media&token=2f65da58-bb4d-4854-aba9-e146be5247f0&_gl=1*3on7ig*_ga*NjQzNzkyNjQ1LjE2OTcwNzI3ODU.*_ga_CW55HF8NVT*MTY5NzY1NDI3My41LjEuMTY5NzY1NzU2Ny41OS4wLjA.'
  ]), []);

  const [currentCategoryIndex1, setCurrentCategoryIndex1] = useState(0);
  const [currentCategoryIndex2, setCurrentCategoryIndex2] = useState(0);
  const [currentCategoryIndex3, setCurrentCategoryIndex3] = useState(0);

  useEffect(() => {
    const intervalId1 = setInterval(() => {
      setCurrentCategoryIndex1((prevIndex) => (prevIndex + 1) % imdbIds1.length);
    }, 5000);

    const intervalId2 = setInterval(() => {
      setCurrentCategoryIndex2((prevIndex) => (prevIndex + 1) % imdbIds2.length);
    }, 5000);

    const intervalId3 = setInterval(() => {
      setCurrentCategoryIndex3((prevIndex) => (prevIndex + 1) % imdbIds3.length);
    }, 5000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, [imdbIds1, imdbIds2, imdbIds3]);

  return (

      <Box margin={0} padding={0} marginTop="1rem">
        <Heading fontSize="5xl" color="#f2f2f2" marginTop="3rem" textAlign="center">
          🎥 Your Ultimate Movies and TV Show Hub 📺
        </Heading>
        <Heading fontSize="2xl" color="#f2f2f2" textAlign="center" marginTop="2rem" marginBottom='3rem'>
          ⭐️ Discover, Watch, and Discuss Your Favorite Movies and TV Shows ⭐️
        </Heading>
        <Flex justifyContent="center">
          <HStack spacing="2rem">
            
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text fontSize="xl" color="white" fontWeight="bold" marginBottom="1rem">
                Action
              </Text>
              <Box
                backgroundColor="#2E8B57"
                padding="0.5rem"
                borderRadius="10px"
                width="100%"
                maxWidth="400px"
              >
                <CarouselWithHover images={images1} imdbIds={imdbIds1} currentIndex={currentCategoryIndex1} />
              </Box>
            </Flex>

            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text fontSize="xl" color="white" fontWeight="bold" marginBottom="1rem">
                Comedy
              </Text>
              <Box
                backgroundColor="#2E8B57"
                padding="0.5rem"
                borderRadius="10px"
                width="100%"
                maxWidth="400px"
              >
                <CarouselWithHover images={images2} imdbIds={imdbIds2} currentIndex={currentCategoryIndex2} />
              </Box>
            </Flex>

            <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <Text fontSize="xl" color="white" fontWeight="bold" marginBottom="1rem">
                Drama
              </Text>
              <Box
                backgroundColor="#2E8B57"
                padding="0.5rem"
                borderRadius="10px"
                width="100%"
                maxWidth="400px"
              >
                <CarouselWithHover images={images3} imdbIds={imdbIds3} currentIndex={currentCategoryIndex3} />
              </Box>
            </Flex>
          </HStack>
        </Flex>
        <VStack>

          <HStack width='90vw' gap={10} marginTop='10rem'>
            <Image
              src='/search.png'
              width={600}
              height={600}
              alt='Search Page Image'
            />
            <Container>
              <Heading fontSize='4xl' textAlign='start' color='#fffeee'>
                Search though thousands of movies and tv-shows. Stay up-to-date with what&apos;s new 
              </Heading>
            </Container>
          </HStack>

          <Divider marginTop='10rem' borderWidth={5} width='90%'/>

          <HStack width='90vw' gap={10} marginTop='10rem'>
            <Container>
              <Heading fontSize='4xl' textAlign='start' color='#fffeee'>
                See all the information of your search and add them to your WatchLists
              </Heading>
            </Container>
            <Image
              src='/details.png'
              width={600}
              height={600}
              alt='Details Page Image'
            />
          </HStack>

          <Divider marginTop='10rem' borderWidth={5} width='90%'/>

          <HStack width='90vw' gap={10} marginTop='10rem' marginBottom='5rem'>
            <Image
              src='/profile.png'
              width={600}
              height={600}
              alt='Profile Page Image'
            />
            <Container>
              <Heading fontSize='4xl' textAlign='start' color='#fffeee' marginBottom={3}>
                Create and manage all of your WatchLists. 
              </Heading>
              <Heading fontSize='4xl' textAlign='start' color='#fffeee' marginTop={3}>
                Find and follow your friends so you can view each other&apos;s WatchLists.
              </Heading>
            </Container>
          </HStack>
        </VStack>
      </Box>
  );
}
