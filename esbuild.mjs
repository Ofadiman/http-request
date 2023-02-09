import esbuild from 'esbuild';

esbuild.buildSync({
    platform: 'node',
    bundle: true,
    minify: true,
    legalComments: 'none',
    format: 'cjs',
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.js',
});
