import React from 'react'
import { useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { Avatar, Button, Card, CardContent, CardHeader, TextField, Typography } from "@material-ui/core";
import { addMessage, getMessages,  } from '../helpers/db'
import { updateMessages } from '../actions'

const MessageTextArea = (props) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch();
    const store = useStore();

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        addMessage( message, props.selectedChannel, props.user);
        getMessages().then(response => {
            let messages = [];
            response.forEach(message => {
                messages.push({ ...message.data(), docId: message.id });
            })
            dispatch(updateMessages(messages));
        });
        setMessage('');
    }

    return (
        <Card className="message-card">
        <CardHeader
          avatar={<Avatar src={store.getState().user.photoURL} />}
          title={
            <Typography variant="h6" className="message-title">
              {props.user.displayName}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" className="message-body">
              Write new posts here!
          </Typography>
        </CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Create a new post!"
            multiline
            fullwidth="true"
            rows={2}
            variant="outlined"
            className="comment-box"
            onChange={e => setMessage(e.target.value)} 
            value={message}
          />
           <Button
           id="post-button"
          type="button"
          variant="contained"
          className="post-button"
          color="primary"
          disabled={(message !== '' && props.selectedChannel.name !== 'default') ? false: true}
          onClick={handleMessageSubmit}
        >
          Post!
        </Button>
      </Card>
        // <Card elevation={15} className="message-input-box">
        //     {console.log(props.user)}
        //     <TextField className="comment-box" color="primary" label="Write a post!" variant="standard" fullwidth="true" rows={2} multiline={true} onChange={e => setMessage(e.target.value)} value={message}/>
        //     <Button variant="contained" color="primary" disabled={(message !== '' && props.selectedChannel.name !== 'default') ? false: true} onClick={handleMessageSubmit}>Send</Button>
        // </Card>
    )
}

export default MessageTextArea