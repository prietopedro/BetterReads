import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
// import { toErrorMap } from "../utils/toErrorMap";
import { useLocation, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import { useAppDispatch } from '../state/store/store';
import { addShelf } from '../state/store/features/userShelfSlice';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateBookshelfModal({ isOpen, setIsOpen }: Props) {
  const router = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new shelf</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values) => {
              dispatch(addShelf(values.name));
              setIsOpen(false);
              if (location.pathname !== '/shelves') router('/shelves');
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormInput
                  name="name"
                  placeholder="Enter shelf name"
                  label=""
                />
                <Button
                  mt="1rem"
                  type="submit"
                  isLoading={isSubmitting}
                  width="100%"
                  fontWeight={500}
                  bg="teal.400"
                  fontSize="1rem"
                  color="white"
                  border="1px solid #6d9a7f"
                  lineHeight="1.375rem"
                  cursor="pointer"
                  _hover={{ background: 'none', color: 'teal.400' }}
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
}

export default CreateBookshelfModal;
