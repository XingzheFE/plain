import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

// import alias from 'rollup-plugin-alias';
// import path from 'path';

export default {
    entry: 'src/plain.ts',
    plugins: [
        typescript({
            include: 'src/**/*.ts'
        }),
        uglify()
    ],
    sourceMap: false,
    moduleName: 'Plain',
    targets: [
        { dest: 'dist/plain.min.js', format: 'umd' }
    ]
};