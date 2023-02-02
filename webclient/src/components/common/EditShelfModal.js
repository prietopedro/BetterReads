import React, { Dispatch, SetStateAction } from "react";
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
import { InputField } from "./InputField";
import {
  MyBookshelvesDocument,
  useUpdateBookshelfMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";


export const EditShelfModal = ({
  isOpen,
  setIsOpen,
  id,
  name,
}) => {
  const [editBookshelf] = useUpdateBookshelfMutation();
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit shelf name</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Formik
            initialValues={{ name: name }}
            onSubmit={async (values, { setErrors }) => {
              const bookshelf = await editBookshelf({
                variables: { id: id, name: values.name },
                refetchQueries: [{ query: MyBookshelvesDocument }],
              });
              if (bookshelf.data?.updateBookshelf?.bookshelf) {
                setIsOpen(false);
              } else {
                setErrors(toErrorMap(bookshelf.data.updateBookshelf.errors));
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="name" placeholder="Enter shelf name" />
                <Button
                  mt={"1rem"}
                  type="submit"
                  isLoading={isSubmitting}
                  isFullWidth
                  variantColor="blue"
                >
                  Edit Shelf
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
