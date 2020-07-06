import db from '../services/firebase'

export function addMessage(message) {
    return db.collection('messages').add({
        text: message.text,
        userId: message.userId,
        dateCreated: new Date()
    })
}

export function addUser(user) {
    return db.collection('users').add({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
    })
}

export function addChannel(channel) {
    return db.collection('channels').add({
        
    })
}