// All emotion classes start this way
const emotionStartRegex = /^css-\w+-/;
// Some end with a space and extra generated noise
const emotionEndRegex = / \w+$/;

/*
  Custom Emotion serializer for predictable snapshots
  Input:
    css-1nf8ikg-smallCopy-text
    css-1nf8ikg-smallCopy-text ebnp5nq0
  After: smallCopy-text
*/

module.exports = {
  serialize(val: string) {
    const updated = val
      .replace(emotionStartRegex, '')
      .replace(emotionEndRegex, '');
    // Add back quotation marks, which get lost in serialization
    return `"${updated}"`;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(val: any) {
    return val && emotionStartRegex.test(val);
  },
};
