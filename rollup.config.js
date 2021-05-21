import rollupPluginTs from 'rollup-plugin-typescript2';
export default {
  input: './src/index.ts',
  output: [
    {
      file: './lib/cjs/index.js',
      format: 'cjs',
    },
    {
      file: './lib/umd/index.js',
      format: 'umd',
      name: 'ErrorParser',
    },
    {
      file: './lib/es/index.js',
      format: 'es',
    },
  ],
  plugins: [
    rollupPluginTs({
      typescript: require('typescript'),
      tsconfig: './tsconfig.json',
      // useTsconfigDeclarationDir:true
    }),
  ],
};
