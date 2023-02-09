import { useNavigate } from 'react-router-dom';
import { Flex, Text, Button, Box } from '@chakra-ui/react';
import { GiBookshelf } from 'react-icons/gi';
import { AiFillExperiment } from 'react-icons/ai';
import { FaBookReader } from 'react-icons/fa';

import reading from '../assets/reading.svg';
import book from '../assets/book.svg';

function Homepage() {
  const router = useNavigate();
  return (
    <>
      <Flex
        align="center"
        justify="space-evenly"
        m="3rem"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex m="4rem" direction="column">
          <Text fontSize="4rem" m="1rem" fontWeight="bold" lineHeight="5rem">
            The Platform <br />
            For Readers
          </Text>
          <Button
            fontSize="1.3rem"
            bg="white"
            width="12rem"
            height="3rem"
            m="0 1rem"
            fontWeight="normal"
            cursor="pointer"
            border="2px solid #6d9a7f"
            _hover={{ bg: '#6d9a7f', color: 'white' }}
            onClick={() => router('/search')}
          >
            Search Books
          </Button>
        </Flex>
        <img
          src={book}
          alt="illustration of someone reading on top of a pile of books with a plant in the corner"
          width="500rem"
          style={{ margin: '3rem' }}
        />
      </Flex>
      <Flex
        justify="center"
        align="center"
        direction="column"
        bg="#d9d9d9"
        p="6rem"
        fontSize="1.2rem"
        textAlign="center"
      >
        <Text width="40rem" maxWidth="100%" color="black" fontWeight="bold">
          Whether you are looking to further your reading habits, or build upon
          an existing habit, the right technolgy can make all the difference.
        </Text>
        <Text width="40rem" maxWidth="100%" color="black" fontWeight="bold">
          At Readrr, we combine in-depth data science with a friendly, easy to
          navigate application to provide a robust, never before seen
          experience!
        </Text>
      </Flex>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="center"
        align="center"
        m="5rem"
        textAlign="center"
        color="whitesmoke"
      >
        <Flex
          bg="#6d9a7f"
          direction="column"
          m="2rem"
          p="1.5rem"
          borderRadius=".5rem"
          width={{ base: '95%', xl: '33%' }}
          align="center"
          height="300px"
          justifyContent="center"
        >
          <Box mb="1rem">
            <GiBookshelf size={40} />
          </Box>
          <Text fontWeight="bold" fontSize="1.2rem" m="0">
            Endless Library
          </Text>
          <Text lineHeight="1.2rem">
            With our library of over 100,000 books, we are confident you will be
            able to find books just for you! Future updates will aim to provide
            an even more diverse selection of books!
          </Text>
        </Flex>
        <Flex
          bg="#6d9a7f"
          direction="column"
          m="2rem"
          p="1.5rem"
          borderRadius=".5rem"
          width={{ base: '95%', xl: '33%' }}
          align="center"
          height="300px"
          justifyContent="center"
        >
          <Box>
            <AiFillExperiment size={40} />
          </Box>
          <Text fontWeight="bold" fontSize="1.2rem" m="0">
            Tailored Recommendations
          </Text>
          <Text lineHeight="1.2rem">
            Our recommendation engine is the heart of our application. Our main
            goal is to assist you in expanding your libraries by providing
            useful and insightful recommendations tailored to your interests.
          </Text>
        </Flex>
        <Flex
          bg="#6d9a7f"
          direction="column"
          m="2rem"
          p="1.5rem"
          borderRadius=".5rem"
          width={{ base: '95%', xl: '33%' }}
          align="center"
          height="300px"
          justifyContent="center"
        >
          <Box>
            <FaBookReader size={40} />
          </Box>
          <Text fontWeight="bold" fontSize="1.2rem" m="0">
            Custom Libraries
          </Text>
          <Text lineHeight="1.2rem">
            With custom shelves and user libraries, you have the power to curate
            your personalized selection of books in a way you feel relevant
            while also receiving custom recommendations.
          </Text>
        </Flex>
      </Flex>
      <Flex
        mt="8rem"
        justify="center"
        align="center"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex direction="column" marginBottom={{ base: '2rem' }}>
          <Text fontSize="2rem" m="1rem">
            Start your journey with Readrr today!
          </Text>
          <Button
            fontSize="1.3rem"
            bg="white"
            width="12rem"
            height="3rem"
            m="0 auto"
            fontWeight="normal"
            cursor="pointer"
            border="2px solid #6d9a7f"
            _hover={{ bg: '#6d9a7f', color: 'white' }}
            onClick={() => router('/login')}
          >
            Try For Free
          </Button>
        </Flex>
        <img
          src={reading}
          alt="illustration of someone reading a book under a lamp"
          width="600"
        />
      </Flex>
      <Flex justify="center" bg="#d9d9d9" m="0" p="1rem">
        <Text> c Readrr 2020</Text>
      </Flex>
    </>
  );
}

export default Homepage;
