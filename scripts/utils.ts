import fs from 'fs';

export const lineBreak = '\n';

export const createDirectory = (directory: string): void => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
};

export const createFile = (
  path: string,
  fileName: string,
  contents: string,
): void => {
  const fileEncodingOptions = { encoding: 'utf8' };

  fs.writeFileSync(`${path}${fileName}`, contents, fileEncodingOptions);
};
