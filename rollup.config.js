import typescript from 'rollup-plugin-typescript';

export default {
	entry: 'src/plain.ts',
	plugins: [
	    typescript({
            include: 'src/*'
        })
	],
	sourceMap: true,
	moduleName: 'plain',
	targets: [
		{ dest: 'dist/plain.js', format: 'umd' }
	]
};
