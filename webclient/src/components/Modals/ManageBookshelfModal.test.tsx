import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import useUserbooksData from '../../hooks/useUserbooksData';
import { Book } from '../../types';
import ManageBookshelfModal from './ManageBookshelfModal';

vi.mock('../../hooks/useEditUsershelfData', () => {
  return {
    default: () => ({ editBook: vi.fn() }),
  };
});
vi.mock('../../hooks/useUserbooksData', () => {
  return {
    default: vi.fn(),
  };
});
describe('Update BookshelfModal', () => {
  it('Is rendered', () => {
    (useUserbooksData as Mock).mockReturnValue({
      data: [],
    });
    render(
      <BrowserRouter>
        <ManageBookshelfModal
          isOpen
          setIsOpen={() => vi.fn}
          id="id1"
          books={[]}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Update shelf books')).toBeInTheDocument();
  });
  it('Is not rendered', () => {
    (useUserbooksData as Mock).mockReturnValue({
      data: [],
    });
    render(
      <BrowserRouter>
        <ManageBookshelfModal
          isOpen={false}
          setIsOpen={() => vi.fn}
          id="id1"
          books={[]}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Update shelf books')).not.toBeInTheDocument();
  });
  it('It shows all userbooks', () => {
    (useUserbooksData as Mock).mockReturnValue({
      data: [{ title: 'hello' }, { title: 'hello2' }],
    });
    render(
      <BrowserRouter>
        <ManageBookshelfModal
          isOpen
          setIsOpen={() => vi.fn}
          id="id1"
          books={[{ title: 'hello' } as Book]}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText('hello')).toBeInTheDocument();
    expect(screen.queryByText('hello2')).toBeInTheDocument();
    expect(screen.queryByText('hello3')).not.toBeInTheDocument();
  });
});
