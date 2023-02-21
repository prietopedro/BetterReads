import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import BookCard from './Bookcard';
import useAuth from '../../hooks/useAuth';
// import useDeleteUserbookData from '../hooks/useDeleteUserbookData';

const book = {
  id: '',
  onlyImage: false,
  ISBN10: '5324255',
  imageUrl: 'imageURL',
  status: '',
  favorited: false,
  title: 'This is the title',
  author: 'This is the author',
  rating: 4.3,
  googleID: 'googleID',
  userRating: null,
};
vi.mock('../../hooks/useAuth', () => {
  return {
    default: () => ({ isLoggedIn: true }),
  };
});
vi.mock('../../hooks/useDeleteUserbookData', () => {
  return {
    default: () => ({ deleteBook: vi.fn() }),
  };
});
vi.mock('../../hooks/useEditUserbookData', () => {
  return {
    default: () => ({ editBook: vi.fn() }),
  };
});
vi.mock('../../hooks/useAddUserbookData', () => {
  return {
    default: () => ({ addBook: vi.fn() }),
  };
});
describe('Bookcard', () => {
  it('temp', () => {
    expect(true).toBe(true);
  });
  it('Display The Correct author when only one', () => {
    const author1 = 'AUTHOR1';
    render(
      <BrowserRouter>
        <BookCard
          onlyImage={false}
          book={{
            id: '1',
            thumbnail: 'a',
            title: 'title',
            authors: [author1],
            average_rating: 3,
            ISBN10: '2',
            favorited: false,
            status: 's',
            googleID: 'sdasd',
            rating: 3,
          }}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText('and More')).toBeNull();
    expect(screen.getByText(author1)).toBeInTheDocument();
  });
  it('Display The Correct author when more than one', () => {
    const author1 = 'AUTHOR1';
    const author2 = 'Author2';
    render(
      <BrowserRouter>
        <BookCard
          onlyImage={false}
          book={{
            id: '1',
            thumbnail: 'a',
            title: 'title',
            authors: [author1, author2],
            average_rating: 3,
            ISBN10: '2',
            favorited: false,
            status: 's',
            googleID: 'sdasd',
            rating: 3,
          }}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByText(author2)).toBeNull();
    expect(screen.getByText(`${author1} and More`)).toBeInTheDocument();
    // expect(screen.getByText(author1)).toBeInTheDocument();
  });
});
