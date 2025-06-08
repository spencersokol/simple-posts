export default {
  entries: ['src/index', 'src/vite'],
  externals: ['vite'],
  declaration: 'compatible',
  clean: true,
  rollup: {
    emitCJS: true,
    inlinedependencies: true
  }
};