const webpack = require('webpack');
const { readdir } = require('fs').promises;
const { resolve } = require('path');
const path = require('path');

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return getFiles(res);
      }

      if (dirent.name === 'index.js') {
        return res;
      }
    })
  );

  return files.filter((i) => i !== undefined).flat();
}

async function createBundles() {
  const files = await getFiles('./src');
  files.forEach((item) => {
    const relativePath = item.replace(__dirname, '.');
    const parentDir = relativePath.split('/').at(-2);

    webpack({
      mode: 'production',
      entry: relativePath,
      module: {
        rules: [
          {
            test: /\.js$/,
            include: [path.resolve(__dirname, './src')],
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
      output: {
        filename: `${parentDir}/${parentDir}.bundle.js`,
        path: path.resolve(__dirname, './dist'),
      },
    }).run((err) => {
      if (err === null) {
        console.log(`${parentDir} is ready`);
      } else {
        console.log(err);
      }
    });
  });
}

createBundles();
