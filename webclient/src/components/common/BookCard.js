import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/core";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { editUserBook,addBookToUserBooks } from "../../api";
import { AppContext } from "../../state/context";



const BookCard = ({
  onlyImage = false,
  search=false,
  ...props
}) => {
  const toast = useToast();
  const {refetch,setRefetch} = useContext(AppContext)
  const [theStatus,setTheStatus] = useState(props.status || "")
  const [userBookId,setUserBookId] = useState(props.userBookId || "")
  const BookToast = (message) => {
    toast({
      title: `${message}`,
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box backgroundColor="teal.400">
          <Text color="white" padding="1rem 4rem">
            {message}
          </Text>
        </Box>
      ),
    });
  };
  useEffect(() => {
    if(!theStatus){
      setTheStatus(props.status)
    }
    if(!userBookId){
      setUserBookId(props.userBookId)
    }
  },[props.status, props.userBookId])
  console.log(props.ISBN10)

  const updateBookReadingStatus = async (status) => {
    try {
      if(status === theStatus) BookToast("Book Already Has A Status Of " + status.charAt(0).toUpperCase() + status.slice(1))
      else{
        let book;
        if(!userBookId){
          console.log(props.key)
          book = await addBookToUserBooks({status, book_id: props.id})
          setUserBookId(book.userBook._id)
        }else{
          book = await editUserBook({status, book_id: userBookId})
        }
          BookToast("Book Updated");
          setRefetch(refetch+1)
          setTheStatus(status)
      }
    } catch (error) {
      BookToast(error.response?.data?.message || "Something went wrong try again!")
    }
  };

  const router = useNavigate();
  return (
    <Flex
      w={onlyImage ? "86px" : ["100%", "100%", "100%", "47%"]}
      marginTop="1rem"
      paddingBottom="1rem"
      justifyContent="flex-start"
      mr="1rem"
    >
      <Box width="86px">
        <Box width="86px">
          <Box
            onClick={() => router(`/book/${props.ISBN10}`)}
            cursor="pointer"
            background={`url(${props.imageUrl}) no-repeat center /cover`}
            height="118px"
            width="86px"
          />
        </Box>
        <Menu>
          <MenuButton width="100%">
            {!search && <Button
              color="white"
              backgroundColor="teal.400"
              isFullWidth
              borderRadius="none"
              fontSize="0.8rem"
              height="30px"
              rightIcon="chevron-down"
            >
              {theStatus && theStatus.charAt(0).toUpperCase() + theStatus.slice(1) || "Track This"}
            </Button>}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => updateBookReadingStatus("planned")}>
              Planned
            </MenuItem>
            <MenuItem onClick={() => updateBookReadingStatus("reading")}>
              Reading
            </MenuItem>
            <MenuItem onClick={() => updateBookReadingStatus("finished")}>
              Finished
            </MenuItem>
            {props.favorited !== undefined && (
              <MenuItem
                onClick={async () => {

                }}
              >
                Remove
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
      {!onlyImage && (
        <Box ml="1rem">
          <Heading
            onClick={() => router(`/book/${props.ISBN10}`)}
            cursor="pointer"
            fontSize="1rem"
            fontFamily="Frank Ruhl Libre"
          >
            {props.title.length > 70
              ? props.title.substring(0, 70) + "..."
              : props.title}
          </Heading>
          <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
            {props.author}
          </Text>
          <Flex>
            {Array(5)
              .fill(0)
              .map((_, i) => {
                return (
                  <Box
                    as={FaStar}
                    size="1.25rem"
                    // cursor="pointer"
                    color={
                      props.rating && Math.round(props.rating) >= i + 1
                        ? "#EA7258"
                        : "#E8E8E8"
                    }
                    pr=".125rem"
                  />
                );
              })}
          </Flex>
        </Box>
      )}
      {props.favorited !== undefined && !onlyImage && (
        <Flex width="10%" ml="auto" justifyContent="flex-end">
          <Box
            as={FaHeart}
            size="1.5rem"
            fill={!props.favorited ? "grey" : "#EA7258"}
            cursor="pointer"
          />
        </Flex>
      )}
    </Flex>
  );
};
export default BookCard