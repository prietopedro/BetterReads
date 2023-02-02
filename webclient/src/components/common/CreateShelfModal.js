import React, {useContext} from "react";
import { AppContext } from "../../state/context";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { FormInput } from "./";
// import { toErrorMap } from "../utils/toErrorMap";
import { useNavigate } from "react-router-dom";
import { addShelf } from "../../api";
import useBookToast from "../../utils/useToast"


const CreateShelfModal = ({
  isOpen,
  setIsOpen,
}) => {
    const { bookshelves, setMyBookshelves,refetch,setRefetch} = useContext(AppContext)
    const router = useNavigate();
    const {toastSuccessful} = useBookToast();
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new shelf</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={async (values, { setErrors }) => {
              try{
                const bookshelf = await addShelf({
                  name: values.name 
                });
                if (bookshelf.shelf) {
                  setIsOpen(false);
                  setMyBookshelves([...bookshelves, bookshelf.shelf])
                  setRefetch(refetch+1)
                  toastSuccessful("Successfully Created Shelf")
                  router("/shelves");
                } else {
                  toastSuccessful("Something went wrong, try again!")
                  // setErrors(toErrorMap(bookshelf.data.createBookshelf.errors));
                }
              }catch(e){
                console.log(e.response)
                toastSuccessful(e.response?.data?.message || "Something went wrong try again!")
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormInput name="name" placeholder="Enter shelf name" />
                <Button
                  mt={"1rem"}
                  type="submit"
                  isLoading={isSubmitting}
                  isFullWidth
                  fontWeight={500}
                  bg="teal.400"
                  fontSize="1rem"
                  color="white"
                  border="1px solid #6d9a7f"
                  lineHeight="1.375rem"
                  cursor="pointer"
                  _hover={{ background: "none", color: "teal.400" }}
                >
                  Create Shelf
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateShelfModal;