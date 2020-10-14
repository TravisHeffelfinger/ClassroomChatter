import React from 'react'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import { addChannel, addMessage, getMessages, getChannels } from '../helpers/db'
import {updateChannels, updateMessages } from '../actions'

const MessageTextArea =(props) => {
    const [message, setMessage] = useState('')
    const [channel, setChannel] = useState('')
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
    const handleAddChannel = (event) => {
        event.preventDefault()
        addChannel({ name: channel, uid: 'dwCGwI2rwBc42CIQHS8jIJ5ZQR12' }) // TODO: implement proper messaging
        getChannels().then(response => {
            let channels = [];
            response.forEach(channel => {
                channels.push({ ...channel.data(), docId: channel.id})
            })
            dispatch(updateChannels(channels));
        })
        setChannel('')
    }

    return (
        <div className="message-input-box">
            <div>
                
            </div>
            <form>
                <input type="text" onChange={e => setChannel(e.target.value)}/>
                <button type='submit' onClick={handleAddChannel}>Test Add Channel</button>
            </form>
            
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