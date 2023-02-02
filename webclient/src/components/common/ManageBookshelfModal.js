import React, { useState, useEffect, useContext } from "react";
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
} from "@chakra-ui/core";
import { AppContext } from "../../state/context";
import { getUserShelf,addBookToShelf,removeBookFromShelf } from "../../api";
import useBookToast from "../../utils/useToast";


const ManageBookshelfModal = ({
  isOpen,
  setIsOpen,
  id
}) => {

    const {books: contextBooks, refetch, setRefetch} = useContext(AppContext)
  const [newBooks, setNewBooks] = useState({});
  const [toRemove, setToRemove] = useState({});
  const [toAdd, setToAdd] = useState({});
  const {toastSuccessful} = useBookToast()
    const fetchData = async() => {
        const books = {};
        contextBooks.forEach((x) => {
        books[x.book._id] = { ...x.book,userBookId: x._id };
        books[x.book._id].inBookshelf = false;
        });
        const res = await getUserShelf(id);
        
        res.shelf && res.shelf.length && res.shelf[0].books.forEach((y) => {
        if (books[y.book._id]) {
            books[y.book._id].inBookshelf = true;
        }
        });
    setNewBooks(books);
    setToRemove({});
    setToAdd({});
    }
  useEffect(() => {
    fetchData()
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update shelf books</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Box>
            {Object.values(newBooks).length ? (
              Object.values(newBooks).map((x) => (
                <Flex key={x.id}>
                  <Checkbox
                    isChecked={x.inBookshelf}
                    name={x._id}
                    size="md"
                    variantColor={x.inBookshelf ? "green" : "orange"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (toRemove[e.target.name]) {
                          const remove = { ...toRemove };
                          delete remove[e.target.name];
                          setToRemove(remove);
                        } else {
                          const toAddNew = { ...toAdd };
                          toAddNew[e.target.name] = {
                            ...newBooks[e.target.name],
                          };
                          setToAdd(toAddNew);
                        }
                      } else {
                        if (toAdd[e.target.name]) {
                          const add = { ...toAdd };
                          delete add[e.target.name];
                          setToAdd(add);
                        } else {
                          const toRemoveNew = { ...toRemove };
                          toRemoveNew[e.target.name] = {
                            ...newBooks[e.target.name],
                          };
                          setToRemove(toRemoveNew);
                        }
                      }
                      setNewBooks({
                        ...newBooks,
                        [e.target.name]: {
                          ...newBooks[e.target.name],
                          inBookshelf: e.target.checked,
                        },
                      });
                    }}
                  />
                  <Text ml="0.3rem">{x.title}</Text>
                </Flex>
              ))
            ) : (
              <Text>No books to add</Text>
            )}
          </Box>
          <ModalFooter>
            <Button
              onClick={async () => {
                try {
                  if (Object.keys(toAdd).length) {
                    await addBookToShelf({books: Object.values(toAdd).map((x) => x.userBookId)}, id);
                  }
                  if (Object.keys(toRemove).length) {
                    await removeBookFromShelf({books: Object.values(toRemove).map((x) => x.userBookId)}, id);
                  }
                  toastSuccessful("Books updated")
                  setRefetch(refetch+1)
                  setIsOpen(false);
                } catch (error) {
                  toastSuccessful(error.response?.data?.message || "Something went wrong try again!")
                }
                // TOAST
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManageBookshelfModal;