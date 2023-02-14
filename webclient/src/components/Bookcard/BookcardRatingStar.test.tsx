import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import BookcardRatingStar from './BookcardRatingStar';

const userColor = '#b59919';
const regularColor = '#EA7258';
const notCheckedColor = '#E8E8E8';
describe('Bookcard Rating Star', () => {
  it('Star should have the correct color when checked', () => {
    render(
      <BookcardRatingStar
        color={userColor}
        checked
        onClickHandler={vi.fn}
        placement={1}
      />,
    );
    expect(screen.getByRole('button')).toHaveStyle(`color: ${userColor}`);
    expect(screen.getByRole('button')).not.toHaveStyle(
      `color: ${regularColor}`,
    );
    expect(screen.getByRole('button')).not.toHaveStyle(
      `color: ${notCheckedColor}`,
    );
  });
  it('Star should have the correct color when checked', () => {
    render(
      <BookcardRatingStar
        color={regularColor}
        checked
        onClickHandler={vi.fn}
        placement={1}
      />,
    );
    expect(screen.getByRole('button')).toHaveStyle(`color: ${regularColor}`);
    expect(screen.getByRole('button')).not.toHaveStyle(`color: ${userColor}`);
    expect(screen.getByRole('button')).not.toHaveStyle(
      `color: ${notCheckedColor}`,
    );
  });
  it('Star should have the correct color when not checked', () => {
    render(
      <BookcardRatingStar
        color={notCheckedColor}
        checked={false}
        onClickHandler={vi.fn}
        placement={1}
      />,
    );
    expect(screen.getByRole('button')).toHaveStyle(`color: ${notCheckedColor}`);
    expect(screen.getByRole('button')).not.toHaveStyle(`color: ${userColor}`);
    expect(screen.getByRole('button')).not.toHaveStyle(
      `color: ${regularColor}`,
    );
  });
  it('onClick Handler should be called when clicked', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(
      <BookcardRatingStar
        color={notCheckedColor}
        checked={false}
        onClickHandler={onClickHandler}
        placement={1}
      />,
    );
    const star = screen.getByRole('button');
    await userEvent.click(star);
    expect(onClickHandler).toHaveBeenCalled();
  });
  it('onClick Handler should be called with right params', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    const placement = 1;
    render(
      <BookcardRatingStar
        color={notCheckedColor}
        checked={false}
        onClickHandler={onClickHandler}
        placement={placement}
      />,
    );
    const star = screen.getByRole('button');
    await userEvent.click(star);
    expect(onClickHandler).toHaveBeenCalledWith({ rating: placement });
  });
});
