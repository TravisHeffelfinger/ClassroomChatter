import { db } from "../services/firebase";
import firebase from "firebase";

export function addMessageOld(message) {
  // TODO: review this function when Redux is implemented
  return db.collection("messages").add({
    text: message.text,
    userId: message.userId,
    messageReplies: message.replies,
    dateCreated: new Date(),
  });
}

export function addUser(user) {
  return db.collection("users").add({
    id: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
}

export function updateUser(user, newFields) {
  db.collection("users")
    .doc(user.docId)
    .update({ ...newFields })
    .then((res) => {
      console.log("user updated!");
    });
}

export function signUpUser(user) {
  return db.collection("users").add({
    ...user,
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
      userId: userRef.uid,
      displayName: userRef.displayName,
      dateCreated: new Date(),
    })
    .then(() => {
      console.log("new message created");
    })
    .catch((error) => {
      console.log("failure", error);
    });
}

export function addMessageComment(commentObject) {
  db.collection("comments").add({ ...commentObject, dateCreated: new Date() });
}
