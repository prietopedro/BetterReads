import React, { useContext, useRef } from "react";
import { AppContext } from "../../state/context";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/core";
import { deleteShelf } from "../../api";
import useBookToast from "../../utils/useToast"


const DeleteShelfModal = ({
  isOpen,
  setIsOpen,
  id,
}) => {
  const cancelRef = useRef(null);
  const { bookshelves, setMyBookshelves, refetch, setRefetch} = useContext(AppContext)
  const {toastSuccessful} = useBookToast();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Bookshelf
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variantColor="red"
            onClick={async () => {
              try {
                await deleteShelf(id);
                setMyBookshelves(bookshelves.filter(x => x._id !== id))
                setRefetch(refetch + 1)
                toastSuccessful("Successfully deleted shelf")
                setIsOpen(false);
              } catch (error) {
                toastSuccessful(error.response?.data?.message || "Something went wrong try again!")
              }
            }}
            ml={3}
            fontWeight={500}
                  bg="teal.400"
                  fontSize="1rem"
                  color="white"
                  border="1px solid #6d9a7f"
                  lineHeight="1.375rem"
                  cursor="pointer"
                  _hover={{ background: "none", color: "teal.400" }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteShelfModal;