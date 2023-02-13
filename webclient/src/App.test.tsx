import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    // ARRANGE
    render(<App />);
    // ACT
    // EXPECT

    // expect(screen.getByRole('paragraph')).toHaveTextContent('The Platform ');
  });
});
