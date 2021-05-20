import { db } from "../services/firebase";

export function addUser(user) {
  return db.collection("users").add({
    id: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
}

export function getUserData(userId) {
    const userPromise = new Promise((resolve, reject) => {
        return db.collection("users").where("uid", "==", userId).get().then((query) => {
          query.forEach((user) => {
            resolve({ ...user.data(), docId: user.id });
          });
        },
          (rej) => {});
    })
    return userPromise
}

export function updateUser(user, newFields) {
  db.collection("users")
    .doc(user.docId)
    .update({ ...newFields })
    .then(() => {
    }, rej => {
    });
}

export function signUpUser(user) {
  return db.collection("users").add({
    ...user, dateCreated: new Date()
  });
}
export function addChannel(channel) {
  return db.collection("channels").add({
    name: channel.name,
    creatorId: channel.uid,
    dateCreated: new Date(),
    members: [],
    public: true,
  });
}

export function getChannels() {
  const channelsPromise = new Promise((resolve, reject) => {
    db.collection("channels")
      .get()
      .then((query) => resolve(query));
  });
  return channelsPromise;
}

export function getMessages() {
  const messagesPromise = new Promise((resolve, reject) => {
    db.collection("messages")
      .orderBy("dateCreated", "desc")
      .get()
      .then((query) => resolve(query));
  });
  return messagesPromise;
}
export function getComments() {
  const commentsPromise = new Promise((resolve, reject) => {
    db.collection("comments")
      .get()
      .then((query) => resolve(query));
  });
  return commentsPromise;
}
export function getChannel(channelName) {
  const channelsPromise = new Promise((resolve, reject) => {
    db.collection("channels")
      .where("name", "==", channelName)
      .get()
      .then((query) => {
        resolve(query);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return channelsPromise;
}

export function addMessage(messageObject, channelRef, userRef) {
  db.collection("messages")
    .add({
      body: messageObject,
      channelId: channelRef.docId,
      userId: userRef.userId,
      userImg: userRef.photoURL,
      displayName: userRef.displayName,
      dateCreated: new Date(),
    })
    .then(() => {
    })
    .catch((error) => {
      console.log("failure", error);
    });
}

export function addMessageComment(commentObject) {
  db.collection("comments").add({ ...commentObject, dateCreated: new Date() });
}
