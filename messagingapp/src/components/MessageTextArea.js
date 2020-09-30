import React from 'react'
import { useState } from 'react'

import { addChannel } from '../helpers/db'

const MessageTextArea =() => {
    const [message, setMessage] = useState(null)
    const [channel, setChannel] = useState(null)


    // const handleMessageChange = () => {

    // }

    const handleMessageSubmit = (event) => {
        event.preventDefault()

        console.log(message)
    }
    const handleAddChannel = (event) => {
        event.preventDefault()
        console.log('Wat ', channel)
    }
    return (
        <div>
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