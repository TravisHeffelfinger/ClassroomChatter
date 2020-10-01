import { db, firebased } from '../services/firebase'
import firebase from 'firebase'

export function addMessageOld(message) { // TODO: review this function when Redux is implemented
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

export  function getChannel(channelName) {
    const channelsPromise = new Promise((resolve, reject) => {
    db.collection('channels')
        .where("name", "==", channelName)
        .get()
        .then(query => {
            resolve(query)
        })
        .catch(error => {
            reject(error);
        })
    })
    return channelsPromise
}

export function updateChannelMessages(messageObject, channelRef) {
    db.collection('channels')
    .doc(channelRef.id)
    .update({messages: firebase.firestore.FieldValue.arrayUnion(messageObject)})
    
    .then(() => {
        console.log('new message created');
    })
    .catch(error => {
        console.log('failure', error);
    })
}