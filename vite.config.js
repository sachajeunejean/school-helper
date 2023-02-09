import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
    plugins: [
        commonjs({transformMixedEsModules:true}),
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
