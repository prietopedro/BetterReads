import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Text,
  Box,
  Checkbox,
  ModalFooter,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../state/store/store';
import { editShelf } from '../state/store/features/userShelfSlice';

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
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  books: Book[];
};

function ManageBookshelfModal({
  isOpen,
  setIsOpen,
  id,
  books: currentBooks,
}: Props) {
  const { books } = useAppSelector((state) => state.userBooks);
  const dispatch = useAppDispatch();
  const [booksChecked, setBooksChecked] = useState(new Map<string, boolean>());

  useEffect(() => {
    const map = new Map<string, boolean>();
    currentBooks.forEach((x) => {
      map.set(x.userbookID, true);
    });
    setBooksChecked(map);
  }, [currentBooks]);
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update shelf books</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Box>
            {books.length ? (
              books.map((x) => {
                return (
                  <Flex key={x.id}>
                    <Checkbox
                      name={x.userbookID}
                      size="md"
                      colorScheme="green"
                      color="green"
                      isChecked={booksChecked.get(x.userbookID)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBooksChecked(
                            new Map<string, boolean>(
                              booksChecked.set(e.target.name, true),
                            ),
                          );
                        } else {
                          booksChecked.delete(e.target.name);
                          setBooksChecked(
                            new Map<string, boolean>(booksChecked),
                          );
                        }
                      }}
                    />
                    <Text ml="0.3rem">{x.title}</Text>
                  </Flex>
                );
              })
            ) : (
              <Text>No books to add</Text>
            )}
          </Box>
          <ModalFooter>
            <Button
              onClick={async () => {
                dispatch(editShelf({ id, books: [...booksChecked.keys()] }));
                setIsOpen(false);
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ManageBookshelfModal;
