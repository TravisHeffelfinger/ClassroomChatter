import { combineReducers } from 'redux';
import types from '../helpers/types';

let defaultUser = {
    bio: "I am the first test of Signup",
    displayName: "ExampleProject",
    email: "test@email.com",
    firstName: "Travis",
    lastName: "Heffelfinger",
    photoURL: null,
    uid: "dwCGwI2rwBc42CIQHS8jIJ5ZQR12",
    website: "website.com"
}

function authReducer(state = {authenticated: true}, action) { // TODO: change back to false
    if(action.type === types.USER_AUTHENTICATED) {
        return { ...state, authenticated: action.payload.authenticated }
    } else if (action.type === types.USER_DISCONNECTED) {
        return { ...state, authenticated: action.payload.authenticated }
    }
    return state
}

function userReducer( state = {...defaultUser}, action) {
    if (action.type === types.GET_USER) {
        return { ...state, user: action.payload.user }
    }
    return state
}

function postsReducer(state={messages: []}, action) {
    if(action.type === types.MESSAGE_ADDED) { 
        return { ...state, ...action.payload };
    } else if(action.type === types.ADD_COMMENT) {
        return {...state , comments: action.payload};
    }
    return state
}

function channelReducer(state={selectedChannel: {creatorId: 'default', dateCreated: '00:00:00', name: 'default', public: true, members: [], docId: '6I5S8EZ6wdMEk4DRHY5b' }}, action) {
    if(action.type === types.CHANNEL_CHANGE) {
        return {...state, selectedChannel: action.payload.channel };
    } else if (action.type === types.CHANNEL_ADD) {
        return state;
    }
    return state;
}


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    posts: postsReducer,
    channels: channelReducer
})
