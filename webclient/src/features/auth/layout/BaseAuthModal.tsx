import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { ComponentToRender } from '../components/types';
import LoginMain from './LoginMain';
import LoginWithEmail from './LoginWithEmail';

function BaseAuthModal() {
  const [modalNum, setModalNum] = useState(ComponentToRender.LoginMainModal);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getComponent(num: ComponentToRender) {
    switch (num) {
      case ComponentToRender.LoginMainModal:
        return <LoginMain setModal={setModalNum} />;
      case ComponentToRender.LoginWithEmailModal:
        return <LoginWithEmail setModal={setModalNum} />;
      default:
        return <h1>HI</h1>;
    }
  }

  return (
    <>
      <Button onClick={onOpen}>OPEN</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setModalNum(ComponentToRender.LoginMainModal);
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent minH="600px">
          <ModalHeader>
            <ModalCloseButton rounded="lg" mt="1rem" />
          </ModalHeader>
          {getComponent(modalNum)}
        </ModalContent>
      </Modal>
    </>
  );
}
export default BaseAuthModal;
