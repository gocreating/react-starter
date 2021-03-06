import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';
import config from '../../configs/webpack.config';

let app = express();

// livereload
let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

// logging
app.use(morgan('dev'));

// render
app.get('/*', (req, res, next) => {
  res.send(`<!doctype html>
<html lang="utf-8">
<head>
  <title>React-Starter</title>
</head>
<body>
  <div id="root"></div>
  <script src="/js/bundle.js"></script>
</body>
</html>`);
  next();
});

let PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App is listening on port ${PORT}`);
});
