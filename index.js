const webpack = require('webpack');
const { readdir } = require('fs').promises;
const { resolve } = require('path');
const path = require('path');

const OUTPUT_DIR = './integrations';
const SOURCE_DIR = './src';
const TARGET_FILE = 'index.js';

async function getFiles(dir) {
  try {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
          return getFiles(res);
        }

        if (dirent.name === TARGET_FILE) {
          return res;
        }
      })
    );
    return files.flat().filter((i) => i !== undefined);
  } catch (error) {
    console.log('Read Files Error: ', error);
  }
}

async function createBundles() {
  try {
    const files = await getFiles(SOURCE_DIR);
    files.forEach((item) => {
      const relativePath = item.replace(__dirname, '.');
      const integrationName = relativePath.split('/').at(-2);

      webpack({
        mode: 'production',
        entry: relativePath,
        module: {
          rules: [
            {
              test: /\.js$/,
              include: [path.resolve(__dirname, SOURCE_DIR)],
              use: {
                loader: 'babel-loader',
              },
            },
          ],
        },
        output: {
          filename: `${integrationName}.bundle.js`,
          path: path.resolve(__dirname, OUTPUT_DIR),
        },
      }).run((err) => {
        if (err === null) {
          console.log(`${integrationName} is ready`);
        } else {
          console.log('Webpack Error: ', err);
        }
      });
    });
  } catch (error) {
    console.log('Create Bundle Error:', error);
  }
}

createBundles();
