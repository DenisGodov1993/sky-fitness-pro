import { dividingBlocks } from './dividingBlocks';

describe('dividingBlocks', () => {
  test('splits array into blocks', () => {
    const result = dividingBlocks(['a', 'b', 'c', 'd'], 2);

    expect(result).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});
