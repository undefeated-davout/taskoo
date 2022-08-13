import { render, screen, RenderResult } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Button text="hoge"></Button>);
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('ボタン表示', () => {
    const buttonNode = screen.getByText('hoge');
    expect(buttonNode).toHaveTextContent('hoge');
  });
});
