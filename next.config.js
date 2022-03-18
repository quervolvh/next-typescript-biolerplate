const path = require('path');

module.exports = {
  images: {
    disableStaticImages: true
  },
  webpack: config => {
    config.resolve.modules.push(path.resolve('./src'));
    config.module.rules.push(
      ...[
        {
          test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2|jpeg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000000
            }
          }
        }
      ]
    );

    return config;
  }
};
