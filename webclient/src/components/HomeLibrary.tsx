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
import ManageBookshelfModal from './ManageBookshelfModal';
import { useAppDispatch } from '../state/store/store';
import { deleteShelf } from '../state/store/features/userShelfSlice';
import EditBookshelfModal from './EditBookshelfModal';
import { Book } from '../api/userbooks';

// import { EditShelfModal } from "./EditShelfModal";
// import { ManageBookshelfModal } from "./ManageBookshelfModal";

type Props = {
  id?: string;
  library: string;
  books: Book[];
  onlyImage?: boolean;
};

function HomeLibrary({ library, books, onlyImage = false, id = '' }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <Box mt={2} borderBottom="1px solid rgb(217,217,217)">
      <EditBookshelfModal
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        id={id}
        name={library}
      />
      {/* <ManageBookshelfModal
        isOpen={addOpen}
        setIsOpen={setAddOpen}
        id={id}
        books={books}
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
          {id && (
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
                <MenuItem onClick={() => setEditOpen(true)}>Update</MenuItem>
                <MenuItem onClick={() => dispatch(deleteShelf(id))}>
                  Delete
                </MenuItem>
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
                onlyImage={onlyImage}
                title={book.title}
                author={book.authors}
                rating={book.average_rating || 0}
                ISBN10={book.ISBN10}
                status={book.status}
                favorited={book.favorited}
                googleID={book.googleID}
                userRating={book.rating}
              />
            );
          })}
      </Flex>
    </Box>
  );
}

export default HomeLibrary;
