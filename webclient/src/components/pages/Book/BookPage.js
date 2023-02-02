import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { SearchBooks, BookCard, PageLayout, Navbar } from "../../common";
import { Box, Text, Heading, Flex, Tag } from "@chakra-ui/core";
import { bookSearchOne } from "../../../api";
import { AppContext } from "../../../state/context";


const BookPage = ({}) => {
  const router = useNavigate();
  const {id} = useParams();
  const [book, setBook] = useState({});
  const {books, refetch} = useContext(AppContext)
  const initialSearch = async () => {
    const res = await bookSearchOne({id});
    if (!res.book) {
      router("/home");
    } else {
      setBook(res.book);
      const userBook = books.find((x) => x.book.ISBN10 === id)
      if(userBook) setBook({...res.book, status: userBook.status, userBookId: userBook._id})
    }
  };
  useEffect(() => {
    initialSearch();
  }, [id,refetch]);
  return (
    <>
      <Navbar />
      <SearchBooks />
      <PageLayout>
        {Object.keys(book).length > 0 && (
          <Box>
            <BookCard
            // key={x.book._id}
            // onlyImage={onlyImage}
            // ISBN10={x.book.ISBN10}
            // imageUrl={x.book.thumbnail}
            // status={x.status}
            // favorited={x.favorited}
            // title={x.book.title}
            // author={x.book.authors.length && x.book.authors[0].name}
            // rating={x.book.average_rating}
            // changeStatus={changeStatus}
              key={book._id}
              id={book._id}
              onlyImage={false}
              ISBN10={book.ISBN10}
              imageUrl={book.thumbnail || ""}
              status={book.status}
              title={book.title}
              author={
                book.authors?.length
                  ? book.authors[0].name
                  : "Unknown"
              }
              rating={book.average_rating || 0}
              userBookId={book.userBookId}
            />
            <Box borderBottom="1px solid rgb(217,217,217)" pb="1rem">
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
              >
                Description
              </Heading>
              <Box
                dangerouslySetInnerHTML={{
                  __html: book.description,
                }}
              ></Box>
            </Box>
             <Box borderBottom="1px solid rgb(217,217,217)" pb="1rem">
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
                pt="1rem"
              >
                Information
              </Heading>
               <Box w={["50%", "75%", "75%", "100%"]}>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Title:
                  </Text>
                  <Text>{book.title}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Author(s):
                  </Text>
                  <Box>
                    {book.authors?.length
                      ? book.authors?.map((x) => (
                          <>
                            <Text>{x.name}</Text>
                          </>
                        ))
                      : "Unknown"}
                  </Box>
                </Flex>
                <Flex flexWrap="wrap">
                  <Text
                    as="i"
                    fontWeight="bold"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Publisher:
                  </Text>
                  <Text>{book.publisher?.name || "Unknown"}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    as="i"
                    fontWeight="bold"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    ISBN:
                  </Text>
                  <Text>
                    {book.ISBN10 || book.ISBN13 || "Unknown"}
                  </Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    textDecor="bold"
                    as="i"
                    w={["100%", "20%", "20%", "20%"]}
                  >
                    Length:
                  </Text>
                  <Text>{book.num_pages || "Unknown"}</Text>
                </Flex>
              </Box>  
            </Box> 
            {/* <Box>
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
                pt="1rem"
              >
                Genres
              </Heading>
              <Flex wrap="wrap">
                {categoriesAlgo(book.categories).map(
                  (x) => {
                    return (
                      <Tag
                        mr="0.7rem"
                        mb="0.7rem"
                        backgroundColor="teal.400"
                        color="white"
                      >
                        {x}
                      </Tag>
                    );
                  }
                )}
              </Flex>
            </Box> */}
          </Box>
        )}
      </PageLayout>
    </>
  );
};

export default BookPage;
