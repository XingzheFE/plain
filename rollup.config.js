import typescript from 'rollup-plugin-typescript';
// import alias from 'rollup-plugin-alias';
// import path from 'path';

export default {
    entry: 'src/plain.ts',
    plugins: [
        typescript({
            include: 'src/**/*.ts'
        }),
    ],
    sourceMap: true,
    moduleName: 'Plain',
    targets: [
        { dest: 'dist/plain.js', format: 'umd' }
    ]
};