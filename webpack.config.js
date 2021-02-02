const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = [
  {
    name: 'library',
    mode: 'production',
    entry: [`${__dirname}/src/components/index.ts`],
    output: {
      path: `${__dirname}/dist`,
      filename: 'franklin-components.js',
      libraryTarget: 'commonjs',
    },
    devtool: 'source-map',
    externals: {
      react: { commonjs: 'react' },
      'react-dom': { commonjs: 'react-dom' },
      'react-router-dom': { commonjs: 'react-router-dom' },
    },
    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          sideEffects: true,
          use: [
            {
              loader: 'style-loader', // creates style nodes from JS strings
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'src/styles')],
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          issuer: /\.(j|t)sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
            },
          ],
        },
        {
          test: /\.svg$/i,
          issuer: /\.(css|scss)?$/,
          loader: 'svg-url-loader',
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsOptions: { source: false },
      }),
    ],
    stats: {
      children: false,
      assetsSort: '!size',
      // groupAssetsByChunk: true,
    },
  },
];
