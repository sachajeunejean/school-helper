import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

import requireTransform from 'vite-plugin-require-transform'

import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
    plugins: [
        viteCommonjs(),
        requireTransform({}),
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react({
            babel: {
                parserOpts: {
                    plugins: ['decorators-legacy', 'classProperties']
                }
            }
        }),
    ],
});
