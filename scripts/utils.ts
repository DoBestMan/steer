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

export function getSVGContent(
  file: string,
  filepath: string,
): {
  constName: string;
  content: string | null;
  hasViewbox: boolean;
  key: string;
  name: string;
  size: { h: number; w: number };
} {
  let hasViewbox = false;
  let content = null;
  let viewbox = null;
  const name = file.replace('.svg', '').toLowerCase();
  const key = name.toUpperCase().replace(/-/g, '_');
  const constName =
    name.replace(/-/g, '').charAt(0).toUpperCase() +
    name.replace(/-/g, '').slice(1);
  let size = { h: 0, w: 0 };

  if (filepath.indexOf('.svg') > -1) {
    content = fs.readFileSync(filepath, { encoding: 'utf-8' });
    /* eslint no-useless-escape: 0 */
    const viewboxArr = content.match(/viewBox\=\"([\d*\.?\d* ]*)\"/g);

    hasViewbox = viewboxArr !== null && viewboxArr.length > 0;

    if (!hasViewbox) {
      console.error(
        '/!/ WARNING -  No viewBox found in:',
        filepath,
        ', therefore not added to the sprite. ',
      );
    } else {
      viewbox = viewboxArr[0]
        .replace('viewBox="', '')
        .replace('"', '')
        .substr(4);

      const aSize = viewbox.split(' ');
      size = {
        h: +aSize[1],
        w: +aSize[0],
      };

      const width = content.match(/ width="/g);
      const height = content.match(/ height="/g);

      // add width/height attributes if not existing
      if (!width) {
        content = content.replace('<svg', `<svg width="${size.w}" `);
      }

      if (!height) {
        content = content.replace('<svg', `<svg height="${size.h}" `);
      }
    }
  }

  return { constName, content, hasViewbox, key, name, size };
}

export function compareIconsArray(a, b) {
  return a.key.localeCompare(b.key);
}
