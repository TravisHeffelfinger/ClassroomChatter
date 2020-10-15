import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addMessage, getMessages,  } from '../helpers/db'
import { updateMessages } from '../actions'
import { Card, TextField, Button } from '@material-ui/core'

const MessageTextArea = (props) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch();

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
        <Card elevation={15} className="message-input-box">
            <TextField className="comment-box" color="primary" placeholder="Write a post!" variant="outlined" fullwidth="true" rows={4} multiline={true} onChange={e => setMessage(e.target.value)} value={message}/>
            <Button variant="contained" color="primary" disabled={message !== '' ? false: true} onClick={handleMessageSubmit}>Send</Button>
        </Card>
    )
}

export default MessageTextArea