import { Button, Card, TextareaAutosize, TextField, Typography } from "@material-ui/core";
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
            <Typography variant="subtitle2" key={comment.userId}>
              {comment.displayName}:{" "}
            </Typography>
            <Typography variant="caption">{comment.commentBody}</Typography>
          </div>
        );
      }
    });
    return result;
  };

  return (
    <Card className="message-card">
      <Typography variant="h5" className="message-title">{props.username}</Typography>
      <Typography className="message-timestamp">{props.dateCreated}</Typography>
      <Typography variant="body1" className="message-body">{props.messageBody}</Typography>
      {displayComments()}
      <TextField
        placeholder="Post a comment!"
        id="outlined-multiline-static"
        label="Post a comment!"
        multiline
        fullwidth="true"
        rows={2}
        value={comment}
        variant="outlined"
        onChange={(e) => setComment(e.target.value)}
        className="comment-box"
      />
      <Button
        type="button"
        variant="contained"
        className="post-button"
        color="primary"
        onClick={handleComment}
      >
        Post
      </Button>
      <Button variant="contained" className="like-button">
        Like
      </Button>
    </Card>
  );
};

export default MessageCard;
