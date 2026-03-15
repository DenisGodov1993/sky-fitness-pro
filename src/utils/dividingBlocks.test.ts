import { dividingBlocks } from './dividingBlocks';

describe('dividingBlocks', () => {
  test('разделяет массив на блоки', () => {
    const result = dividingBlocks(['a', 'b', 'c', 'd'], 2);

    expect(result).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});