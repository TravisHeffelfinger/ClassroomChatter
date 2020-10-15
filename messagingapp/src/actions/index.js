import  types from '../helpers/types';

export const getUser = user => {
    return {
        type: types.GET_USER,
        payload: {
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            photoURL: 'http://picsum.photos/200',
            website: user.website,
            bio: user.bio,
            docId: user.docId
        }
    }
}

export const authenticateUser = () => {
    return {
        type: types.USER_AUTHENTICATED,
        payload: {
            authenticated: true
        }
    }
}

export const disconnectUser = () => {
    return {
        type: types.USER_DISCONNECTED,
        payload: {
            authenticated: false
        }
    }
}

export const updateChannels = channels => {
    return {
        type: types.CHANNEL_LIST,
        payload: {
            channels
        }
    }
}

export const channelChange = channel => {
    return {
        type: types.CHANNEL_CHANGE,
        payload: {
           channel
        }
    }
}

export const updateMessages = messages => {
    return {
        type: types.MESSAGE_ADDED,
        payload: {
            messages
        }
    }
}

export const getMessages = messages => {
    return {
        type: types.GET_MESSAGES,
        payload: {
            ...messages
        }
    }
}

export const addComment = comments => {
    return{
        type: types.ADD_COMMENT,
        payload: {
            comments
        }
    }
}