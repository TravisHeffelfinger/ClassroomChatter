import React from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import { addMessage, getMessages,  } from '../helpers/db'
import { updateMessages } from '../actions'

const MessageTextArea =(props) => {
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
        <div className="message-input-box">
            <form>
                <input type='textarea' onChange={e => setMessage(e.target.value)} value={message}/>
                <button type='submit' onClick={handleMessageSubmit}>Send</button>
            </form>

        </div>
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