import * as tsConfigPaths from 'tsconfig-paths/lib'
tsConfigPaths.register({
    baseUrl: './dist',
    paths: require('../tsconfig.json').compilerOptions.paths
})
