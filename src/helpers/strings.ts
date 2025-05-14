export const mergeClass = (
  ...classes: (string | undefined | [boolean, string])[]
) => {
  return classes
    .filter(
      (x) =>
        typeof x !== 'undefined' &&
        x !== null &&
        ((typeof x === 'string' && !!x.trim()) || (Array.isArray(x) && !!x[0]))
    )
    .map((x) => (typeof x === 'string' ? x : x![1]))
    .join(' ');
};
