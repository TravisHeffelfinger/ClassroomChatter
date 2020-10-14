import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { addMessageComment, getComments } from "../helpers/db";
import { addComment } from "../actions";

const MessageCard = (props) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    getComments().then((response) => {
      const comments = [];
      response.forEach((comment) => {
        comments.push({ ...comment.data(), docId: comment.id });
      });
      dispatch(addComment(comments));
    });
  }, []);

  const handleComment = async () => {
    let comments = [];
    addMessageComment({
      commentBody: comment,
      userId: store.getState().user.uid,
      displayName: store.getState().user.displayName,
      messageId: props.docId,
    });
    await getComments().then((response) => {
      response.forEach((commentDoc) => {
        comments.push({ ...commentDoc.data(), docId: commentDoc.id });
      });
    });
    dispatch(addComment(comments));
    setComment("");
  };

  const displayComments = () => {
    const result = store.getState().posts.comments.map((comment) => {
      if (comment.messageId === props.docId) {
        return (
          <div key={comment.docId}>
            <span key={comment.userId}>{comment.displayName}: </span>
            {comment.commentBody}
          </div>
        );
      }
    });
    return result;
  };

  return (
    <Card>
      <div className="message-card">
        <h3 className="message-title">{props.username}</h3>
        <h5 className="message-timestamp">{props.dateCreated}</h5>
        <div className="message-body">{props.messageBody}</div>
        {displayComments()}
        <input
          type="textarea"
          placeholder="Post a comment!"
          className="comment-box"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <input
          type="button"
          value="Post"
          className="post-button"
          onClick={handleComment}
        />
        <input type="button" value="Like" className="like-button" />
      </div>
    </Card>
  );
};

export default MessageCard;
