module.exports = {
  entry : [`babel-polyfill`, `./client/index.js`],
  mode : `development`,
  output : {
    path : __dirname, // assumes your bundle.js will be in the root of your project folder
    filename : `./public/bundle.js`,
  },
  devtool : `source-maps`,
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : {loader : `babel-loader`},
      },
      {
        test : /\.css/,
        use : [
          `style-loader`,
          `css-loader`,
        ],
      },
      {
        test : /\.(png|jpg|gif)$/i,
        use : [
          {
            loader : `url-loader`,
            options : {
              limit : 50000, // kinda a magic number for maximum size of file to inline in bundle
              // works much more simply and reliably than allowing it to fallback to file loader
            },
          },
        ],
      },
    ],
  },
}
