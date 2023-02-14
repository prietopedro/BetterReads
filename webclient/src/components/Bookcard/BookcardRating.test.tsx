import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import BookcardRating from './BookcardRating';

describe('Bookcard Ratings', () => {
  it('Should render all 5 stars', () => {
    render(<BookcardRating onClickHandler={vi.fn} rating={4} isUserRating />);
    const stars = screen.getAllByRole('button');
    expect(stars.length).toBe(5);
    expect(stars.length).not.toBe(4);
  });
  it('Should render the correct color for each star depending on the rating', () => {
    const isUserRating = true;
    render(
      <BookcardRating
        onClickHandler={vi.fn}
        rating={4}
        isUserRating={isUserRating}
      />,
    );
    const stars = screen.getAllByRole('button');
    for (let i = 0; i < stars.length; i += 1) {
      const color = i + 1 <= 4 ? '#b59919' : '#E8E8E8';
      expect(stars[i]).toHaveStyle(`color: ${color}`);
    }
  });
});
