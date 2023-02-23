import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import React from 'react';

interface Props extends React.ComponentProps<typeof Input> {
  id?: string;
  placeholder?: string;
}

function PhonenumberInput({ id, placeholder, ...props }: Props) {
  return (
    <InputGroup>
      <InputLeftAddon>+1</InputLeftAddon>
      <Input
        type="tel"
        id={id}
        placeholder={placeholder}
        variant="filled"
        size="md"
        _focus={{ backgroundColor: '#E2E8F0' }}
        {...props}
      />
    </InputGroup>
  );
}

export default PhonenumberInput;
