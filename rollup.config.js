import typescript from 'rollup-plugin-typescript';
// import alias from 'rollup-plugin-alias';
// import path from 'path';

export default {
	entry: 'src/plain.ts',
	plugins: [
		typescript({
            include: 'src/*'
        }),
		// alias({
		// 	'@': path.resolve(__dirname, './src/')
		// }),
	],
	sourceMap: true,
	moduleName: 'Plain',
	targets: [
		{ dest: 'dist/plain.js', format: 'umd' }
	]
};
