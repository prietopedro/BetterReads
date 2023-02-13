import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import BookCard from './Bookcard';
import useAuth from '../hooks/useAuth';
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
vi.mock('../hooks/useAuth', () => {
  return {
    default: vi.fn(),
  };
});
vi.mock('../hooks/useDeleteUserbookData', () => {
  return {
    default: () => ({ deleteBook: vi.fn() }),
  };
});
vi.mock('../hooks/useEditUserbookData', () => {
  return {
    default: () => ({ editBook: vi.fn() }),
  };
});
vi.mock('../hooks/useAddUserbookData', () => {
  return {
    default: () => ({ addBook: vi.fn() }),
  };
});
describe('Bookcard', () => {
  it('Has Correct Info When Logged Out', () => {
    (useAuth as Mock).mockReturnValue({
      isLoggedIn: false,
    });
    render(
      <BrowserRouter>
        <BookCard
          id={book.id}
          key={book.googleID}
          imageUrl={book.imageUrl || ''}
          onlyImage={false}
          title={book.title}
          author={book.author}
          rating={book.rating}
          ISBN10={book.ISBN10}
          status={book.status}
          favorited={book.favorited}
          googleID={book.googleID}
          userRating={book.rating}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByTestId('BookCard-Current-Status')).toHaveTextContent(
      'Track This',
    );
    expect(screen.queryByTestId('BookCard-Title')).toHaveTextContent(
      book.title,
    );
    expect(screen.queryByTestId('BookCard-Author')).toHaveTextContent(
      book.author,
    );
  });
  it('Has Correct Info When Logged In But Not Have the book in userbooks', () => {
    (useAuth as Mock).mockReturnValue({
      isLoggedIn: true,
    });
    render(
      <BrowserRouter>
        <BookCard
          id={book.id}
          key={book.googleID}
          imageUrl={book.imageUrl || ''}
          onlyImage={false}
          title={book.title}
          author={book.author}
          rating={book.rating}
          ISBN10={book.ISBN10}
          status={book.status}
          favorited={book.favorited}
          googleID={book.googleID}
          userRating={book.rating}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByTestId('BookCard-Current-Status')).toHaveTextContent(
      'Track This',
    );
    expect(screen.queryByTestId('BookCard-Title')).toHaveTextContent(
      book.title,
    );
    expect(screen.queryByTestId('BookCard-Author')).toHaveTextContent(
      book.author,
    );
  });
  it('Has Correct Info When Logged In and Have the book in userbooks', () => {
    (useAuth as Mock).mockReturnValue({
      isLoggedIn: true,
    });
    render(
      <BrowserRouter>
        <BookCard
          id={book.id}
          key={book.googleID}
          imageUrl={book.imageUrl || ''}
          onlyImage={false}
          title={book.title}
          author={book.author}
          rating={book.rating}
          ISBN10={book.ISBN10}
          status="planned"
          favorited={book.favorited}
          googleID={book.googleID}
          userRating={book.rating}
        />
      </BrowserRouter>,
    );
    expect(screen.queryByTestId('BookCard-Current-Status')).toHaveTextContent(
      'Planned',
    );
    expect(screen.queryByTestId('BookCard-Title')).toHaveTextContent(
      book.title,
    );
    expect(screen.queryByTestId('BookCard-Author')).toHaveTextContent(
      book.author,
    );
  });
});
