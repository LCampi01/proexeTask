
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SessionActions} from '@actions';
import fromState from '@selectors';

import Component from './Component';

const {editUserRequested} = SessionActions;

const mapStateToProps = state => {
    const user = fromState.Session.getUser(state);
    return {
        user
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    editUserRequested
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Component);
