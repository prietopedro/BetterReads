import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import CreateBookshelfModal from './CreateBookshelfModal';

vi.mock('../../hooks/useAddUsershelfData', () => {
  return {
    default: () => ({ addBook: vi.fn() }),
  };
});
describe('CreateBookshelfModal', () => {
  it('Is rendered', () => {
    render(
      <BrowserRouter>
        <CreateBookshelfModal isOpen setIsOpen={() => vi.fn} />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Create Shelf')).toBeInTheDocument();
  });
  it('Is not rendered', () => {
    render(
      <BrowserRouter>
        <CreateBookshelfModal isOpen={false} setIsOpen={() => vi.fn} />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Create Shelf')).not.toBeInTheDocument();
  });
  it('You can type the shelf name', async () => {
    render(
      <BrowserRouter>
        <CreateBookshelfModal isOpen setIsOpen={() => vi.fn} />
      </BrowserRouter>,
    );
    const input = screen.getByDisplayValue('');
    await userEvent.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
    expect(input).not.toHaveValue('s');
  });
});
