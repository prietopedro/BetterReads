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
import useUserbooksData from '../../hooks/useUserbooksData';
import { Book } from '../../types';
import useEditUsershelfData from '../../hooks/useEditUsershelfData';

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
  const { data: books } = useUserbooksData();
  const [booksChecked, setBooksChecked] = useState(new Map<string, boolean>());
  const { editShelf } = useEditUsershelfData();
  useEffect(() => {
    const map = new Map<string, boolean>();
    currentBooks.forEach((x) => {
      map.set(x.id, true);
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
            {books?.length ? (
              books?.map((x) => {
                return (
                  <Flex key={x.googleID}>
                    <Checkbox
                      name={x.id}
                      size="md"
                      colorScheme="green"
                      color="green"
                      isChecked={booksChecked.get(x.id)}
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
                editShelf({ id, books: [...booksChecked.keys()] });
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
