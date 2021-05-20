import {
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { addMessageComment, getComments } from "../helpers/db";
import { addComment } from "../Redux/actions";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import SendRounded from "@material-ui/icons/SendRounded";

const MessageCard = (props) => {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
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
  });

  const handleComment = async () => {
    let comments = [];
    addMessageComment({
      commentBody: comment,
      userId: store.getState().user.userId,
      userImg: store.getState().user.photoURL,
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
      let result;
      if (comment.messageId === props.docId) {
        result = (
          <div key={comment.docId}>
            <List dense={true}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={comment.userImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.displayName}
                  secondary={comment.commentBody}
                />
              </ListItem>
            </List>
          </div>
        );
      }
      return result;
    });
    return result;
  };

  return (
    <Card className="message-card">
      <CardHeader
        avatar={<Avatar src={props.userImg} />}
        title={
          <Typography variant="h6" className="message-title">
            {props.username}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" className="message-body">
          {props.messageBody}
        </Typography>
        {displayComments()}
      </CardContent>
      <TextField
        placeholder="Post a comment!"
        label="Post a comment!"
        multiline
        fullwidth="true"
        rows={1}
        value={comment}
        variant="outlined"
        onChange={(e) => setComment(e.target.value)}
        className="comment-box"
      />
      <IconButton
        type="button"
        variant="contained"
        className="post-button"
        color="primary"
        disabled={comment !== "" ? false : true}
        onClick={handleComment}
      >
        <SendRounded />
      </IconButton>
      <IconButton
        variant="contained"
        className="like-button"
        onClick={(e) => setLike(!like)}
      >
        {like ? <Favorite color="primary" /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
};

export default MessageCard;
