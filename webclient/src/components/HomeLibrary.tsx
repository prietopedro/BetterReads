import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import BookCard from './Bookcard';

// import { EditShelfModal } from "./EditShelfModal";
// import { ManageBookshelfModal } from "./ManageBookshelfModal";

type Book = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  userbookID: string;
};

type Props = {
  library: string;
  books: Book[];
  onlyImage?: boolean;
};

function HomeLibrary({ library, books, onlyImage = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  return (
    <Box mt={2} borderBottom="1px solid rgb(217,217,217)">
      {/* <DeleteShelfModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} /> */}
      {/* <EditShelfModal
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        id={id}
        name={library}
      /> */}
      {/* <ManageBookshelfModal
        isOpen={addOpen}
        setIsOpen={setAddOpen}
        id={id}
        name={library}
      /> */}
      <Flex justifyContent="space-between">
        <Flex w="90%" alignItems="center">
          <Text
            m="0 0"
            color="#4e4c4a"
            fontSize="1.25rem"
            fontWeight="bold"
            lineHeight="1.875rem"
            pb="1rem"
            mr="0.4rem"
          >
            {library} ({books?.length || 0})
          </Text>
          {false && (
            <Menu>
              <MenuButton>
                <Text
                  m="0 0"
                  color="#4e4c4a"
                  fontSize="1.25rem"
                  fontWeight="bold"
                  lineHeight="1.875rem"
                >
                  ...
                </Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setAddOpen(true)}>
                  Manage Books
                </MenuItem>
                {/* <MenuItem onClick={() => setEditOpen(true)}>Update</MenuItem> */}
                <MenuItem onClick={() => setIsOpen(true)}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
      <Flex
        justifyContent={onlyImage ? 'flex-start' : 'space-between'}
        flexWrap="wrap"
      >
        {books &&
          books?.map((book: Book, i: number) => {
            return (
              <BookCard
                id={book.id}
                key={book.id + i.toString()}
                imageUrl={book.thumbnail || ''}
                onlyImage={false}
                title={book.title}
                author={book.authors?.length ? book.authors[0] : 'Unknown'}
                rating={book.average_rating || 0}
                ISBN10={book.ISBN10}
                status={book.status}
                favorited={book.favorited}
                userBookID={book.userbookID}
              />
            );
          })}
      </Flex>
    </Box>
  );
}

export default HomeLibrary;
