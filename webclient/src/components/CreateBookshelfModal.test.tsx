import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, Mock } from 'vitest';
import CreateBookshelfModal from './CreateBookshelfModal';

vi.mock('../hooks/useAddUserbookData', () => {
  return {
    default: () => ({ addBook: vi.fn() }),
  };
});
describe('CreateBookshelfModal', () => {
  it('Does something', () => {
    render(
      <BrowserRouter>
        {/* <CreateBookshelfModal isOpen={false} setIsOpen={() => }/> */}
      </BrowserRouter>,
    );
  });
});
