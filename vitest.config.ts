import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Custom Vitest config for Angular + Ionic.
 * Alias for @ionic/core/components can be used when adding component tests
 * that load Ionic (e.g. with Vitest browser mode).
 */
export default {
  resolve: {
    alias: {
      '@ionic/core/components': path.resolve(
        __dirname,
        'node_modules/@ionic/core/components/index.js'
      ),
    },
  },
};
