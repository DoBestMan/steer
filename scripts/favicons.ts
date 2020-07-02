import favicons from 'favicons';
import fs from 'fs';
import path from 'path';

const siteTitleShort = 'SimpleTire';
const themeColor = '#181818';
const backgroundColor = '#ECEBE1';

const dir = path.resolve(__dirname, '../public/static/assets/icons/');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

/* eslint-disable  @typescript-eslint/camelcase*/
const source = 'public/static/assets/master-icon.png';
const configuration = {
  appDescription: null,
  appName: siteTitleShort,
  background: backgroundColor,
  developerName: null,
  developerURL: null,
  dir: 'auto',
  display: 'standalone',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false,
  },
  lang: 'en-US',
  logging: true,
  orientation: 'any',
  path: '/static/assets/icons/',
  start_url: '/',
  theme_color: themeColor,
  version: '1.0',
};
/* eslint-enable  @typescript-eslint/camelcase*/

const callback = function (err, res) {
  if (err) {
    /* eslint no-console: 0 */
    console.log(err.message);
    return;
  }

  res.images.forEach((image) => {
    fs.writeFile(
      path.resolve(__dirname, '../public/static/assets/icons/', image.name),
      image.contents,
      (err) => {
        if (err) {
          /* eslint no-console: 0 */
          console.log(err);
        }
      },
    );
  });

  res.files.forEach((file) => {
    fs.writeFile(
      path.resolve(__dirname, '../public/static/assets/', file.name),
      file.contents,
      (err) => {
        if (err) {
          /* eslint no-console: 0 */
          console.log(err);
        }
      },
    );
  });
};

favicons(source, configuration, callback);
