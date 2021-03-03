var fs = require ('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index.js',

  target: 'node',

  // externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: function excludeCondition(path){
          const nonEs5SyntaxPackages = [
            'app',
            'apptwo'
          ]
          // DO transpile these packages
          if (nonEs5SyntaxPackages.some( pkg => path.match(pkg))) {
            return false;
          }

          // Ignore all other modules that are in node_modules
          if (path.includes("node_modules")) { 
            console.log("Testing Exclude condition", path);
            return true;
          }
          
          return false;
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "ie 11" }],
              ["@babel/preset-react", {}]
            ]
          }
        }
      }
    ]
  }
};