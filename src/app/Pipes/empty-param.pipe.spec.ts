import { EmptyParamPipe } from './empty-param.pipe';

describe('EmptyParamPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyParamPipe();
    expect(pipe).toBeTruthy();
  });
});
