import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';

type Props = { label: string } & FieldHookConfig<string>;
function FormInput({ label, ...props }: Props) {
  const [field, { error }] = useField(props);
  return (
    <FormControl width="100%" isInvalid={!!error} mt="1rem">
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input {...field} id={field.name} type={props.type} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default FormInput;
