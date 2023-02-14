import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import BookcardStatusMenu from './BookcardStatusMenu';

describe('Bookcard Status Menu', () => {
  it('Status onClick Handler should be called when planned is clicked', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(
      <BookcardStatusMenu
        statusOnClickHandler={onClickHandler}
        deleteOnClickHandler={vi.fn}
        status="a"
      />,
    );
    const button = screen.getByText('Planned');
    await userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalled();
    expect(onClickHandler).toHaveBeenCalledWith({ status: 'planned' });
  });
  it('Status onClick Handler should be called when reading is clicked', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(
      <BookcardStatusMenu
        statusOnClickHandler={onClickHandler}
        deleteOnClickHandler={vi.fn}
        status="a"
      />,
    );
    const button = screen.getByText('Reading');
    await userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalled();
    expect(onClickHandler).toHaveBeenCalledWith({ status: 'reading' });
  });
  it('Status onClick Handler should be called when finished is clicked', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(
      <BookcardStatusMenu
        statusOnClickHandler={onClickHandler}
        deleteOnClickHandler={vi.fn}
        status="a"
      />,
    );
    const button = screen.getByText('Finished');
    await userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalled();
    expect(onClickHandler).toHaveBeenCalledWith({ status: 'finished' });
  });
  it('Should Display correct status when book is not saved', () => {
    render(
      <BookcardStatusMenu
        statusOnClickHandler={vi.fn}
        deleteOnClickHandler={vi.fn}
        status=""
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Track This');
  });
  it('Should Display correct status when book is saved', () => {
    render(
      <BookcardStatusMenu
        statusOnClickHandler={vi.fn}
        deleteOnClickHandler={vi.fn}
        status="planned"
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Planned');
  });
  it('Should not display remove button if book is not saved', () => {
    render(
      <BookcardStatusMenu
        statusOnClickHandler={vi.fn}
        deleteOnClickHandler={vi.fn}
        status=""
      />,
    );
    const button = screen.queryByText('Remove');
    expect(button).not.toBeInTheDocument();
  });
  it('Should display remove button if book is saved', () => {
    render(
      <BookcardStatusMenu
        statusOnClickHandler={vi.fn}
        deleteOnClickHandler={vi.fn}
        status="planned"
      />,
    );
    const button = screen.getByText('Remove');
    expect(button).toBeInTheDocument();
  });
  it('Delete onClick Handler should be called when Remove is clicked', async () => {
    const onClickHandler = vi.fn().mockImplementation(() => {});
    render(
      <BookcardStatusMenu
        statusOnClickHandler={vi.fn}
        deleteOnClickHandler={onClickHandler}
        status="planned"
      />,
    );
    const button = screen.getByText('Remove');
    await userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalled();
  });
});
