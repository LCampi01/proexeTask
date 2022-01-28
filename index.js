/* eslint-disable lodash/prefer-lodash-method, global-require, camelcase */
require('dotenv').config();
const webpack = require('webpack');
const express = require('express');
const fs = require('fs');
const os = require('os');
const cluster = require('cluster');
const forEach = require('lodash/forEach');

const nativeEvent = require('./server/helpers/nativeEvent');
const logger = require('./server/helpers/logger');

const {
    PORT,
    NODE_ENV
} = process.env;

const publicPath = `${__dirname}/dist`;

const app = express();

const startApp = () => app.listen(PORT, () => logger.info(`\nApp running on port ${PORT} in ${NODE_ENV} environment`));

if (NODE_ENV === 'development') {
    (async () => {
        const middleware = require('webpack-dev-middleware');
        const webpackConfig = require('./webpack.config.dev');
        const compiler = webpack(webpackConfig);

        const webpackApp = express();
        webpackApp.use(express.static(publicPath));
        webpackApp.use('*', express.static(publicPath));

        webpackApp.use(middleware(compiler, {
            methods: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE'],
            writeToDisk: false
        }));

        webpackApp.use(require('webpack-hot-middleware')(compiler));
        app.use(webpackApp);
        startApp();
    })();
}

if (NODE_ENV !== 'development') {
    app.use((_, res, next) => {
        res.set('Cache-control', 'no-cache');
        res.removeHeader('X-Powered-By');
        next();
    });
    app.use(express.static(publicPath));
    app.use('*', express.static(publicPath));
    if (cluster.isMaster) {
        (async () => {
            try {
                fs.rmdirSync(publicPath, {recursive: true});
            // eslint-disable-next-line
            } catch (err) {}
            fs.mkdirSync(publicPath);
            await new Promise((resolve, reject) => {
                webpack(require('./webpack.config.prod')).run((err, stats) => {
                    if (err || stats.hasErrors()) {
                        logger.error(stats.toString());
                        logger.error(stats.hasErrors());
                        reject(Error('Webpack Failed'));
                        return;
                    }
                    logger.info('Dist builded');
                    resolve();
                });
            });

            nativeEvent.process();
            const CPUS = os.cpus();
            forEach(CPUS, () => cluster.fork());
            nativeEvent.cluster(cluster);
        })();
    } else {
        startApp();
    }
}
