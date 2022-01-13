export const arraymove = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number,
) => {
  const newArray = [...array];

  const targetElement = newArray[fromIndex];

  newArray.splice(fromIndex, 1);

  newArray.splice(toIndex, 0, targetElement);

  return newArray;
};
