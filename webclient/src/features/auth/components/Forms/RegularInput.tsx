import { Input } from '@chakra-ui/react';
import React from 'react';

interface Props extends React.ComponentProps<typeof Input> {
  placeholder?: string;
  id?: string;
}

function RegularInput({ placeholder, id, ...props }: Props) {
  console.log(props);
  return (
    <Input
      placeholder={placeholder}
      variant="filled"
      size="md"
      _focus={{ backgroundColor: '#E2E8F0' }}
      {...props}
    />
  );
}

export default RegularInput;
