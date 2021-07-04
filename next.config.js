const path = require('path');

module.exports = {
  webpack: config => {
    config.resolve.modules.push(path.resolve('./src'));
    config.module.rules.push(
      ...[
        {
          test: /\.(png|jpg|gif|eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        }
      ]
    );

    return config;
  }
};
