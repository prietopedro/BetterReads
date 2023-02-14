import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FavoriteIcon from './FavoriteIcon';

describe('Bookcard Favorite Icon', () => {
  it('Icon should be red when favorited', () => {
    render(<FavoriteIcon favorited onClickHandler={vi.fn} />);
    expect(screen.getByRole('button')).toHaveStyle(`color: #EA7258`);
  });
  it('Icon should not be red favorited', () => {
    render(<FavoriteIcon favorited={false} onClickHandler={vi.fn} />);
    expect(screen.getByRole('button')).toHaveStyle(`color: grey`);
  });
  it('onClick Handler should be called when clicked', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(<FavoriteIcon favorited={false} onClickHandler={onClickHandler} />);
    const favoriteButton = screen.getByRole('button');
    await userEvent.click(favoriteButton);
    expect(onClickHandler).toHaveBeenCalled();
  });
  it('onClick Handler should be called when clicked with right params', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(<FavoriteIcon favorited={false} onClickHandler={onClickHandler} />);
    const favoriteButton = screen.getByRole('button');
    await userEvent.click(favoriteButton);
    expect(onClickHandler).toHaveBeenCalledWith({ favorited: true });
  });
});
