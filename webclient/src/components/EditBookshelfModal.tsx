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
import { editShelf } from '../state/store/features/userShelfSlice';
import { useAppDispatch } from '../state/store/store';
import FormInput from './FormInput';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  name: string;
};

function EditBookshelfModal({ isOpen, setIsOpen, id, name }: Props) {
  const dispatch = useAppDispatch();
  return (
    <Modal isOpen={isOpen} isCentered onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit shelf name</ModalHeader>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <ModalBody>
          <Formik
            initialValues={{ name }}
            onSubmit={async (values) => {
              dispatch(editShelf({ ...values, id }));
              setIsOpen(false);
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
}
export default EditBookshelfModal;
