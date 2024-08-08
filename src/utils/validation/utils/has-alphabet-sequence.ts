export const hasAlphabetSequence = (string: string, maxSequenceLength: number) => {
  if (string.length < maxSequenceLength) {
    return false;
  }

  const lowerString = string.toLowerCase();

  for (let i = 0; i < lowerString.length - maxSequenceLength - 1; i++) {
    const conditions = [];

    for (let j = 1; j < maxSequenceLength; j++) {
      conditions.push(lowerString.charCodeAt(i) + j === lowerString.charCodeAt(i + j));
    }

    if (!conditions.includes(false)) {
      return true;
    }
  }

  return false;
};
