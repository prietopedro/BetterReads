import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookcardHeading from './BookcardHeading';

describe('Bookcard Ratings', () => {
  it('Should display the correct title if less than 70 characters', () => {
    const title = "Hello I'm a title";
    render(
      <BrowserRouter>
        <BookcardHeading title={title} author="a" googleID="a" />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });
  it('Should display the correct title if more than 70 characters', () => {
    const title = 'H'.repeat(100);
    render(
      <BrowserRouter>
        <BookcardHeading title={title} author="a" googleID="a" />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading')).toHaveTextContent('H'.repeat(70));
    expect(screen.getByRole('heading')).not.toHaveTextContent(title);
  });
  it('Should display the correct author', () => {
    const author = 'Hey im the author';
    render(
      <BrowserRouter>
        <BookcardHeading title="a" author={author} googleID="a" />
      </BrowserRouter>,
    );
    expect(screen.getByText(author)).toBeInTheDocument();
  });
  it('Should have a link to the book page', () => {
    const googleID = '1231231223';
    render(
      <BrowserRouter>
        <BookcardHeading title="a" author="a" googleID={googleID} />
      </BrowserRouter>,
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/book/${googleID}`,
    );
  });
});
