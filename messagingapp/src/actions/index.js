import { ADD_COMMENT, CHANNEL_ADD, CHANNEL_CHANGE, CHANNEL_LIST, GET_USER, MESSAGE_ADDED, USER_AUTHENTICATED, USER_DISCONNECTED } from '../helpers/types';

export const getUser = user => {
    return {
        type: GET_USER,
        payload: {
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            website: user.website,
            bio: user.bio
        }
    }
}

export const authenticateUser = () => {
    return {
        type: USER_AUTHENTICATED,
        payload: {
            authenticated: true
        }
    }
}

export const disconnectUser = () => {
    return {
        type: USER_DISCONNECTED,
        payload: {
            authenticated: false
        }
    }
}

export const updateChannels = channels => {
    return {
        type: CHANNEL_LIST,
        payload: {
            channels
        }
    }
}

export const channelChange = channel => {
    return {
        type: CHANNEL_CHANGE,
        payload: {
            channel: channel
        }
    }
}

export const updateMessages = messages => {
    return {
        type: MESSAGE_ADDED,
        payload: {
            messages
        }
    }
}

export const updateComments = comments => {
    return {
        type: MESSAGE_ADDED,
        payload: {
            comments
        }
    }
}