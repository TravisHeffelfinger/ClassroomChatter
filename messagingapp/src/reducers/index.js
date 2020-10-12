import { combineReducers } from 'redux'

function authReducer(state = false, action) {
    if(action.type === 'USER_AUTHENTICATED') {
        return { ...state, authenticated: action.payload.authenticated }
    } else if (action.type === 'USER_DISCONNECTED') {
        return { ...state, authenticated: action.payload.authenticated }
    }
    return state
}

function messagesReducer(state=[], action) {
    if(action.type === 'MESSAGE_ADDED') {
        return { ...state, message: action.payload.message }
    }
    return state
}

function channelReducer(state=[], action) {
    if(action.type === 'CHANNEL_CHANGE') {
        return state
    }
    return state
}


export default combineReducers({
    auth: authReducer,
    messages: messagesReducer,
    channels: channelReducer
})
