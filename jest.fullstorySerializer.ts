// Target data attributes added by @fullstory/babel-plugin-annotate-react, and remove them for the test
const regex = /(data-element|data-source-file|data-component)=\"[^"]+"/g;

/*
  Custom FullStory serializer for predictable snapshots
  Input:
        <svg
          data-element="svg"
          data-source-file="Icon.tsx"
          height="12"
          viewBox="0 0 14 12"
          width="14"
        >
  After:
        <svg
          height="12"
          viewBox="0 0 14 12"
          width="14"
        >
*/

module.exports = {
  serialize(val: string) {
    const updated = val.replace(regex, '');
    return updated;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(val: any) {
    return val && regex.test(val);
  },
};
