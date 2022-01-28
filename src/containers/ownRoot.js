import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

const ownRoot = ({store, App}) => (
    <Provider
        store={store}
    >
        <App/>
    </Provider>
);

ownRoot.propTypes = {
    store: PropTypes.shape({}).isRequired,
    App: PropTypes.func.isRequired
};

export default ownRoot;
