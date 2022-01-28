import Reactotron from 'reactotron-react-js';
import {reactotronRedux as loadReducers} from 'reactotron-redux';
import loadSagas from 'reactotron-redux-saga';
import packageJson from '@root/package.json';

const ownReactotron = Reactotron
    .configure({name: packageJson.name})
    .use(loadReducers())
    .use(loadSagas())
    .connect();

const reactotronEnhancer = ownReactotron.createEnhancer();
const sagaMonitor = ownReactotron.createSagaMonitor();

export {reactotronEnhancer};
export {sagaMonitor};

export default ownReactotron;
