import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { addChannel, getChannel, updateChannelMessages } from '../helpers/db'
import {updateMessages } from '../actions'

const MessageTextArea =(props) => {
    const [message, setMessage] = useState(null)
    const [channel, setChannel] = useState()
    const [channelRef, setchannelRef] = useState(null)
    const [user, setUser] = useState('dwCGwI2rwBc42CIQHS8jIJ5ZQR12') // TODO: remove test data

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        event.target.value = '';
        console.log(channelRef)
        updateChannelMessages( message, channelRef);
    }
    const handleAddChannel = (event) => {
        event.preventDefault()
        event.target.value = '';
        addChannel({ name: channel, uid: 'dwCGwI2rwBc42CIQHS8jIJ5ZQR12' }) // TODO: implement proper messaging
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
                <input type='textarea' onChange={e => setMessage(e.target.value)}/>
                <button type='submit' onClick={handleMessageSubmit}>Send</button>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    selectedChannel: state.channels.selectedChannel
})

const mapDispatchToProps = {
    updateMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTextArea)