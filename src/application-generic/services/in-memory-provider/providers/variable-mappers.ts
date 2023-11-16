export const convertStringValues = (value) => {
  if (value === 'undefined') {
    return undefined;
  }
  if (value === 'null') {
    return null;
  }

  return value;
};

// export const convertStringValues = (
//   value: string
// ): string | null | undefined => {
//   if (value === 'undefined') {
//     return undefined;
//   }
//   if (value === 'null') {
//     return null;
//   }

//   return value;
// };
