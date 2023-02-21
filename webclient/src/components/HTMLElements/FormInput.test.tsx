import { render, screen } from '@testing-library/react';
import { useField } from 'formik';
import { Mock, vi } from 'vitest';
import FormInput from './FormInput';

vi.mock('formik');
describe('Form Input', () => {
  it('Should have value of passed value', () => {
    (useField as Mock).mockReturnValue([
      { name: 'hello', value: 'myValue' },
      { error: '', touched: true },
    ]);
    render(<FormInput label="" name="hello" value="myValue" />);
    expect(screen.getByRole('textbox')).toHaveValue('myValue');
  });
});
