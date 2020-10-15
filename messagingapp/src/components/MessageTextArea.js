import React from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import { addMessage, getMessages,  } from '../helpers/db'
import { updateMessages } from '../actions'
import { Card, TextField, Button } from '@material-ui/core'

const MessageTextArea = (props) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch();
   // const [user, setUser] = useState('dwCGwI2rwBc42CIQHS8jIJ5ZQR12') // TODO: remove test data

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
            <TextField color="primary" variant="outlined" fullwidth={true}  multiline={3} onChange={e => setMessage(e.target.value)} value={message}/>
            <Button variant="contained" color="primary" onClick={handleMessageSubmit}>Send</Button>
        </Card>
    )
}

const mapStateToProps = state => ({
    selectedChannel: state.channels.selectedChannel,
    user: state.user,
})

const mapDispatchToProps = {
    updateMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTextArea)