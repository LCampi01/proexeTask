import get from 'lodash/get'

export const getSuccessAction = () => ({session: {success}}) => success;
export const getUsers = state => get(state, 'session.users');
export const getUser = state => get(state, 'session.user');