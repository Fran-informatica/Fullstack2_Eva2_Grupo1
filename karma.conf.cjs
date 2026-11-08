// Configuración de Karma: ejecuta las pruebas de Jasmine en un navegador real.
// Webpack + Babel transforman el JSX y babel-plugin-istanbul instrumenta el código para la cobertura.
const path = require('path');

// Navegador elegido con la variable de entorno KARMA_BROWSER (Chrome por defecto).
// Chrome también sirve para Chromium y Ungoogled Chromium indicando su ruta en CHROME_BIN.
const NAVEGADORES = ['Chrome', 'Chromium', 'Firefox'];
const navegador = process.env.KARMA_BROWSER || 'Chrome';
if (!NAVEGADORES.includes(navegador)) {
  throw new Error(`KARMA_BROWSER="${navegador}" no es válido. Usa uno de: ${NAVEGADORES.join(', ')}.`);
}
// Con --single-run (npm run test:ci) se usa la versión sin ventana del navegador
const sinVentana = process.argv.includes('--single-run');

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
                  ['@babel/preset-env', { targets: { chrome: '100', firefox: '100' } }],
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
      clearContext: false, // deja visibles los resultados en la ventana del navegador
    },

    plugins: [
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-chrome-launcher', // Chrome, Chromium y sus versiones Headless
      'karma-firefox-launcher', // Firefox y FirefoxHeadless
      'karma-coverage',
      'karma-webpack',
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [sinVentana ? `${navegador}Headless` : navegador],
    autoWatch: true,
    singleRun: false,
  });
};
