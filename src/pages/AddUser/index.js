
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SessionActions} from '@actions';
import fromState from '@selectors';

import Component from './Component';

const {addUserRequested} = SessionActions;

const mapStateToProps = state => {
    const users = fromState.Session.getUsers(state);
    return {
        users
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addUserRequested
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Component);
