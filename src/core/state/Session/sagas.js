/* eslint-disable consistent-return */
/* global localStorage, window */
import {
    call,
    put,
    takeLatest,
    all,
    select
} from 'redux-saga/effects';

import SessionService from '@services/Session';
import fromState from '@selectors';

import {
    ERROR,
    LOADING,
    SUCCESS,
    UPDATED,
    loginStatus
} from '@constants';

import {
    ADD_USER_REQUESTED,
    LOAD_USER_DATA_REQUESTED,
    EDIT_USER_REQUESTED,
    DELETE_USER_REQUESTED,
    SORT_USERNAME_REQUESTED
} from './types';

import {
    handleError,
    loadUserDataSucceded,
    addUserSucceeded,
    editUserSucceeded,
    deleteUserSucceeded,
    sortUsernameSucceded
} from './actions';

import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty';
import remove from 'lodash/remove';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import last from 'lodash/last';

async function fetchUser() {
    return await fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
    .then(resp => {
        if (resp.status === 200) {
            return resp.json();
        }
    }).then(dataJson => {
        return dataJson;
    })
}

const orderUsers = listOfUsers => orderBy(listOfUsers, 'id')

function* loadUserDataRequested() {
    try {
        if(localStorage.getItem('flag') === '1') {
            yield put(loadUserDataSucceded(JSON.parse(localStorage.getItem('users'))));
        } else {
            const users = yield call(fetchUser);
            yield localStorage.setItem('flag', '1');
            yield localStorage.setItem('users', JSON.stringify(users));
            yield put(loadUserDataSucceded(users));
        }
    } catch (error) {
        yield put(handleError(error));
    }
}

function* editUserRequested({user}) {
try {
    let users = cloneDeep(yield select(state => fromState.Session.getUsers(state)));
    if(isEmpty(users)) {
        users = cloneDeep(yield call(fetchUser));
    }
    const newUsers = remove(users, u => u.id !== user.id);
    newUsers.push(user);
    const listOfUsers = orderUsers(newUsers)
    yield localStorage.setItem('users', JSON.stringify(listOfUsers));
    yield put(editUserSucceeded(listOfUsers));
} catch (error) {
    yield put(handleError(error));
}
}

function* addUserRequested({name, email, username, city}) {
try {
    let users = cloneDeep(yield select(state => fromState.Session.getUsers(state)));
    if(isEmpty(users)) {
        users = cloneDeep(yield call(fetchUser));
    }
    const newUser = {
        id: get(last(users), 'id') + 1,
        name,
        email,
        address: {
            city
        },
        username
    }
    users.push(newUser);
    yield localStorage.setItem('users', JSON.stringify(users));
    yield put(addUserSucceeded(users));
} catch (error) {
    yield put(handleError(error));
}
}

function* deleteUserRequested({user}) {
    try {
        let users = cloneDeep(yield select(state => fromState.Session.getUsers(state)));
        if(isEmpty(users)) {
            users = cloneDeep(yield call(fetchUser));
        }
        const newUsers = remove(users, u => u.id !== user.id);
        const listOfUsers = orderUsers(newUsers)
        yield localStorage.setItem('users', JSON.stringify(listOfUsers));
        yield put(deleteUserSucceeded(listOfUsers));
    } catch (error) {
        yield put(handleError(error));
    }
    }

function* sortUsernameRequested({param}) {
    try {
        let users = cloneDeep(yield select(state => fromState.Session.getUsers(state)));
        if(isEmpty(users)) {
            users = cloneDeep(yield call(fetchUser));
        }
        if(param === 1) {
            users = orderBy(users, 'username');
        }
        else if(param === 2) {
            users = orderBy(users, 'username', 'desc');
        }
        else {
            users = orderBy(users, 'id');
        }
        yield put(sortUsernameSucceded(users));
    } catch (error) {
        yield put(handleError(error));
    }
    }

export default function* sessionSaga() {
    yield all([
        takeLatest(LOAD_USER_DATA_REQUESTED, loadUserDataRequested),
        takeLatest(ADD_USER_REQUESTED, addUserRequested),
        takeLatest(EDIT_USER_REQUESTED, editUserRequested),
        takeLatest(DELETE_USER_REQUESTED, deleteUserRequested),
        takeLatest(SORT_USERNAME_REQUESTED, sortUsernameRequested)
    ]);
}
