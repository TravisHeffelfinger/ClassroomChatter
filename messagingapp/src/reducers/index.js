import { combineReducers } from 'redux';
import { ADD_COMMENT, CHANNEL_ADD, CHANNEL_CHANGE, GET_USER, MESSAGE_ADDED, USER_AUTHENTICATED, USER_DISCONNECTED } from '../helpers/types';

function authReducer(state = false, action) {
    if(action.type === USER_AUTHENTICATED) {
        return { ...state, authenticated: action.payload.authenticated }
    } else if (action.type === USER_DISCONNECTED) {
        return { ...state, authenticated: action.payload.authenticated }
    }
    return state
}

function userReducer( state = {}, action) {
    if (action.type=== GET_USER) {
        return { ...state, user: action.payload.user }
    }
    return state
}

function messagesReducer(state=[], action) {
    if(action.type === MESSAGE_ADDED) {
        let currentMessages = state.messages;
        currentMessages.push(action.payload.message);
        return { ...state, messages: currentMessages };
    } else if(action.type === ADD_COMMENT) {
        let currentComments = state.comments;
        currentComments.push(action.payload.comments);
        return {...state , comments: currentComments};
    }
    return state
}

function channelReducer(state={}, action) {
    if(action.type === CHANNEL_CHANGE) {
        return {...state, selectedChannel: action.payload.channel };
    } else if (action.type === CHANNEL_ADD) {
        return state;
    }
    return state;
}


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    messages: messagesReducer,
    channels: channelReducer
})
