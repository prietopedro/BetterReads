import React, { useState, useEffect } from "react";
import { Navbar,SearchBooks, PageLayout, BookCard } from "../../common";
import { Flex, Button } from "@chakra-ui/core";
import { useSearchParams  } from "react-router-dom";
import { bookSearch } from "../../../api";

const SearchResultsList = () => {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [fetchMore, setFetchMore] = useState(false);
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [page,setPage] = useState(0)
  const initialSearch = async () => {
    setInitialLoading(true);
    const res = await bookSearch({searchQuery: params.get('name'), page:0})

    setResults(res.books);
    setTotal(res.books.length);
    setInitialLoading(false);
    setFetchMore(res.totalBooks > results.length + res.books.length);
  };

  useEffect(() => {
    try {
      setResults([]);
      setTotal(0);
      setFetchMore(false);
      setPage(0);
      setAdditionalLoading(false);
      initialSearch();
    } catch (error) {
      console.log(error);
    }
  }, [params.get('name')]);

  const fetchMoreData = async () => {
    try {
      setAdditionalLoading(true);
      const res = await bookSearch({searchQuery: params.get('name'), page: page+1})
      setPage(page+1);
      setResults([...results, ...res.books]);
      setFetchMore(res.totalBooks > total + res.books.length);
      setTotal(res.books.length);
      setAdditionalLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <SearchBooks />
      <PageLayout>
        <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
          {!initialLoading
            ? results.map((book) => (
                <BookCard
                  key={book._id}
                  id={book._id}
                  imageUrl={book.thumbnail || ""}
                  search={true}
                  title={book.title}
                  author={
                    book.authors.length
                      ? book.authors[0].name
                      : "Unknown"
                  }
                  rating={book.average_rating || 0}
                  ISBN10={book.ISBN10}
                />
              ))
            : "Loading..."}
          {total && fetchMore ? (
            <Button
              isLoading={additionalLoading}
              fontWeight={500}
              bg="transparent"
              width="100%"
              margin="1rem 0"
              fontSize="1rem"
              color="teal.400"
              border="1px solid #6d9a7f"
              lineHeight="1.375rem"
              cursor="pointer"
              _hover={{ backgroundColor: "teal.400", color: "white" }}
              onClick={() => fetchMoreData()}
            >
              Load More
            </Button>
          ) : null}
        </Flex>
      </PageLayout>
    </>
  );
};

export default SearchResultsList;
