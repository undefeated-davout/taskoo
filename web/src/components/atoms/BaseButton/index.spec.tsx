import { RenderResult, render, screen } from '@testing-library/react';

import BaseButton from './index';

describe('BaseButton', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<BaseButton onClick={() => {}}>hoge</BaseButton>);
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('ボタン表示', () => {
    const buttonNode = screen.getByText('hoge');
    expect(buttonNode).toHaveTextContent('hoge');
  });
});
