import { render } from '@testing-library/react';

import Protocol from './protocol';

describe('Protocol', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Protocol />);
    expect(baseElement).toBeTruthy();
  });
});
