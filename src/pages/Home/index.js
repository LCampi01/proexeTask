import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SessionActions} from '@actions';
import fromState from '@selectors';


import columns from './Columns';
import Component from './Component';

const headers = [
    {label: 'Id'},
    {label: 'Name'},
    {label: 'Username'},
    {label: 'City'},
    {label: 'Email'},
    {label: 'Edit'},
    {label: 'Delete'}
];

const {loadUserDataRequested, getUserToEdit, deleteUserRequested, sortUsernameRequested} = SessionActions;

const mapStateToProps = state => {
    const users = fromState.Session.getUsers(state);
    return {
        users,
        columns: columns(getUserToEdit),
        headers
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadUserDataRequested,
    getUserToEdit,
    deleteUserRequested,
    sortUsernameRequested
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    // eslint-disable-next-line
    const {getUserToEdit, deleteUserRequested} = dispatchProps;

    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        columns: columns(getUserToEdit, deleteUserRequested)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component);

