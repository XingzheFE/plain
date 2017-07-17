import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import banner from 'rollup-plugin-license';
import tslint from 'rollup-plugin-tslint';

export default {
    entry: 'src/plain.ts',
    plugins: [
        typescript({
            include: 'src/**/*.ts'
        }),
        tslint(),
        uglify(),
        banner({
            banner: `This file is created by xingzheFE.\n https://github.com/XingzheFE/ \n${ new Date() }`
        }),
    ],
    sourceMap: false,
    moduleName: 'Plain',
    targets: [
        { dest: 'dist/plain.min.js', format: 'umd' }
    ]
};
