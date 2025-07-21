import resolve from '@rollup/plugin-node-resolve';
import { writeFileSync } from 'fs';

export default {
  input: 'src/main.js',
  output: { file: 'dist/bundle.js', format: 'esm' },
  plugins: [
    resolve(),
    {
      name: 'write-bundles-json',
      writeBundle() {
        writeFileSync('dist/bundles.json', JSON.stringify({
          it: { bundleUrl: 'http://localhost:4261/bundle.it.js' },
          en: { bundleUrl: 'http://localhost:4261/bundle.en.js' }
        }, null, 2));
      }
    }
  ]
};
