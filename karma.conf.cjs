// Configuración de Karma: ejecuta las pruebas de Jasmine en Chrome.
// Webpack + Babel transforman el JSX y babel-plugin-istanbul instrumenta el código para la cobertura.
const path = require('path');

module.exports = function configurarKarma(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],

    // Todas las pruebas: *.test.js y *.test.jsx dentro de src/
    files: [
      { pattern: 'src/**/*.test.@(js|jsx)', watched: false },
      // Imágenes y video de public/, para que los componentes las carguen igual que en la app
      { pattern: 'public/assets/**/*', watched: false, included: false, served: true },
    ],
    proxies: {
      '/assets/': '/base/public/assets/',
    },
    preprocessors: {
      'src/**/*.test.@(js|jsx)': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            // Con "type": "module", webpack exigiría la extensión en cada import; Vite no la exige
            test: /\.m?jsx?$/,
            resolve: { fullySpecified: false },
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [
                  // Cobertura solo del código de la aplicación, no de las pruebas
                  ['istanbul', { exclude: ['**/*.test.js', '**/*.test.jsx', 'src/tests/**'] }],
                ],
              },
            },
          },
        ],
      },
    },

    // progress: avance en la terminal; kjhtml: resultados de Jasmine en el navegador;
    // coverage: reportes de cobertura en coverage/
    reporters: ['progress', 'kjhtml', 'coverage'],
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'text' }],
    },

    client: {
      jasmine: { random: false },
      clearContext: false, // deja visibles los resultados en la ventana de Chrome
    },

    plugins: [
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-webpack',
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
  });
};
