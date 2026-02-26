// Делит массив на группы нужного размера
export const dividingBlocks = (arr: string[], size: number): string[][] => {
  const result: string[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
};

// // Делит массив на группы нужного размера
// export const dividingBlocks = (arr: string[], size: number): string[][] => {
//   const result: string[][] = [];

//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }

//   return result;
// };
