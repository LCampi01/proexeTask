import {
    LOAD_USER_DATA_SUCCEDED,
    ADD_USER_SUCCEDED,
    GET_USER_TO_EDIT,
    EDIT_USER_SUCCEDED,
    DELETE_USER_SUCCEDED,
    SORT_USERNAME_SUCCEDED
} from './types';

const initialState = {
    users: [],
    user: {}
};

export default function session(state = initialState, action) {
    switch (action.type) {
        case GET_USER_TO_EDIT:
            return {...state, user: action.user};
        case LOAD_USER_DATA_SUCCEDED:
        case ADD_USER_SUCCEDED:
        case EDIT_USER_SUCCEDED:
        case DELETE_USER_SUCCEDED:
        case SORT_USERNAME_SUCCEDED:
            return {...state, users: action.users};
        default:
            return state;
    }
}
