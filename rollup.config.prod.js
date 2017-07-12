import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import banner from 'rollup-plugin-license';

// import alias from 'rollup-plugin-alias';
// import path from 'path';

export default {
    entry: 'src/plain.ts',
    plugins: [
        typescript({
            include: 'src/**/*.ts'
        }),
        uglify(),
        banner({
            banner: `This file is created by xingzheFE.\n https://github.com/XingzheFE/ \n${ new Date() }`
        })
    ],
    sourceMap: false,
    moduleName: 'Plain',
    targets: [
        { dest: 'dist/plain.min.js', format: 'umd' }
    ]
};
