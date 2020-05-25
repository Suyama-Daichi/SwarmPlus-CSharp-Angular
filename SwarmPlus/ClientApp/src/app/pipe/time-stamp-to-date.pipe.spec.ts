import { TimeStampToDatePipe } from './time-stamp-to-date.pipe';

describe('TimeStampToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeStampToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
