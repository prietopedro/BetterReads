import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BookCardThumbnail from './BookcardThumbnail';

describe('Bookcard Thumbnail', () => {
  it('Link should redirect to book page', () => {
    const googleID = 'googleID';
    const thumbnail = 'thumbnail';
    render(
      <BrowserRouter>
        <BookCardThumbnail googleID={googleID} thumbnail={thumbnail} />
      </BrowserRouter>,
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/book/${googleID}`,
    );
  });
  it('Image should show the thumbnail', () => {
    const googleID = 'googleID';
    const thumbnail = 'thumbnail';
    render(
      <BrowserRouter>
        <BookCardThumbnail googleID={googleID} thumbnail={thumbnail} />
      </BrowserRouter>,
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', thumbnail);
  });
  it('Image should bre wrapped in the anchor', async () => {
    const googleID = 'googleID';
    const thumbnail = 'thumbnail';
    render(
      <BrowserRouter>
        <BookCardThumbnail googleID={googleID} thumbnail={thumbnail} />
      </BrowserRouter>,
    );
    const img = screen.getByRole('img');
    await userEvent.click(img);
    expect(window.location.href).toBe(`http://localhost:3000/book/${googleID}`);
  });
});
