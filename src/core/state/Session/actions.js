import constant from 'lodash/constant';

import {
    LOAD_USER_DATA_REQUESTED,
    LOAD_USER_DATA_SUCCEDED,
    ADD_USER_REQUESTED,
    ADD_USER_SUCCEDED,
    GET_USER_TO_EDIT,
    EDIT_USER_REQUESTED,
    EDIT_USER_SUCCEDED,
    DELETE_USER_REQUESTED,
    DELETE_USER_SUCCEDED,
    ERROR_OCCURRED
} from './types';

export const handleError = ({failed, err}) => ({
    type: ERROR_OCCURRED,
    err,
    failed
});
export const loadUserDataRequested = constant({type: LOAD_USER_DATA_REQUESTED});
export const loadUserDataSucceded = users => ({type: LOAD_USER_DATA_SUCCEDED, users});
export const addUserRequested = (name, email, username, city) => ({type: ADD_USER_REQUESTED, name, email, username, city});
export const addUserSucceeded = users => ({type: ADD_USER_SUCCEDED, users});
export const getUserToEdit = user => ({type: GET_USER_TO_EDIT, user});
export const editUserRequested = user => ({type: EDIT_USER_REQUESTED, user});
export const editUserSucceeded = users => ({type: EDIT_USER_SUCCEDED, users});
export const deleteUserRequested = user => ({type: DELETE_USER_REQUESTED, user});
export const deleteUserSucceeded = users => ({type: DELETE_USER_SUCCEDED, users});