import React from 'react'
import { useState, useEffect } from 'react'

import { addChannel, getChannel, updateChannelMessages } from '../helpers/db'

const MessageTextArea =(props) => {
    const [message, setMessage] = useState(null)
    const [channel, setChannel] = useState(props.selectedChannel)
    const [channelRef, setchannelRef] = useState(null)
    const [user, setUser] = useState('dwCGwI2rwBc42CIQHS8jIJ5ZQR12') // TODO: remove test data

    useEffect(() => {
        getChannel(channel).then(resolve => {
            resolve.forEach(doc => {
                setchannelRef(doc);
                setChannel(doc.data().name)
            })
        });
        return 
    }, []);

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

export default MessageTextArea