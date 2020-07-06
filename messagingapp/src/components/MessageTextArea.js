import React from 'react'
import { useState } from 'react'

const MessageTextArea =() => {
    const [message, setMessage] = useState(null)


    // const handleMessageChange = () => {

    // }

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        console.log(message)

    }
    return (
        <div>
            <form>
                <input type='textarea' onChange={e => setMessage(e.target.value)}/>
                <button type='submit' onClick={handleMessageSubmit}>Send</button>
            </form>

        </div>
    )
}

export default MessageTextArea