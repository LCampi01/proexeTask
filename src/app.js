/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import head from 'lodash/head';

import OwnRoot from '@containers/ownRoot';
import store from '@core/store';
import '@styles/ownStyles.scss';
import App from '@App';

ReactDOM.render(
    <AppContainer>
        <OwnRoot
            store={store}
            App={App}
        />
    </AppContainer>,
    head(document.getElementsByTagName('article'))
);
