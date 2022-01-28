if (process.env.NODE_ENV === 'development') {
    module.exports = require('../core/middlewares/reactotron');
} else {
    module.exports = {
        reactotronEnhancer: {},
        sagaMonitor: {}
    };
}
