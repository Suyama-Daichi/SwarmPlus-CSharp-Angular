import { StringJoinPipe } from './string-join.pipe';

describe('StringJoinPipe', () => {
  it('create an instance', () => {
    const pipe = new StringJoinPipe();
    expect(pipe).toBeTruthy();
  });
});
