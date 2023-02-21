import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import EditBookshelfModal from './EditBookshelfModal';

const editFN = vi.fn();
vi.mock('../../hooks/useEditUsershelfData', () => {
  return {
    default: () => ({ editShelf: editFN }),
  };
});
describe('Edit bookshelf modal', () => {
  it('Is rendered', () => {
    render(
      <BrowserRouter>
        <EditBookshelfModal
          isOpen
          setIsOpen={() => vi.fn}
          id="1"
          name="Hello"
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Edit shelf name')).toBeInTheDocument();
  });
  it('Is not rendered', () => {
    render(
      <BrowserRouter>
        <EditBookshelfModal
          isOpen={false}
          setIsOpen={() => vi.fn}
          id="1"
          name="Hello"
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Edit shelf name')).not.toBeInTheDocument();
  });
  it('input value is the name', () => {
    render(
      <BrowserRouter>
        <EditBookshelfModal
          isOpen
          setIsOpen={() => vi.fn}
          id="1"
          name="Hello"
        />
      </BrowserRouter>,
    );
    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });
  it('should change values', async () => {
    render(
      <BrowserRouter>
        <EditBookshelfModal
          isOpen
          setIsOpen={() => vi.fn}
          id="1"
          name="Hello"
        />
      </BrowserRouter>,
    );
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Typed Value');
    expect(input).toHaveValue('Typed Value');
  });
  it('should submit with values', async () => {
    render(
      <BrowserRouter>
        <EditBookshelfModal
          isOpen
          setIsOpen={() => vi.fn}
          id="1"
          name="Hello"
        />
      </BrowserRouter>,
    );
    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Typed Value');
    const submit = screen.queryByText('Edit Shelf') as HTMLElement;
    await userEvent.click(submit);
    expect(editFN).toHaveBeenCalledWith({ id: '1', name: 'Typed Value' });
  });
});
