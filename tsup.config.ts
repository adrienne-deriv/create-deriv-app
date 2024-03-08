import { defineConfig } from 'tsup';

const isDev = process.env.npm_lifecycle_event === 'dev';

export default defineConfig({
    clean: true,
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    // minify: !isDev,
    target: 'esnext',
    outDir: 'dist',
    onSuccess: isDev ? 'node dist/index.js' : undefined,
    sourcemap: true,
});
