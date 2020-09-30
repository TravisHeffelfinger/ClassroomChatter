import { db } from '../services/firebase'

export function addMessage(message) {
    return db.collection('messages').add({
        text: message.text,
        userId: message.userId,
        messageReplies: message.replies,
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

export function signUpUser(user) {
    return db.collection('users').add(
        {
            ...user
        }
    )
}
export function addChannel(channel) {
    return db.collection('channels').add({
        name: channel.name,
        creatorId: channel.uid,
        messages: [],
        dateCreated: new Date(),
        memebers: [],
        public: true
    })
}

export function getChannels() {
    const channelsPromise = new Promise((resolve, reject) => {
        db.collection('channels').get().then(query => resolve(query))
    })
    return channelsPromise
}