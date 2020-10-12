import React from 'react'

const MessageCard = (props) => {
    return (
        <div className="message-card">
            <h3 className="message-title">{props.username || "MessageBox"}</h3>
            <div className="message-body">
            { props.messageBody || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
            </div>
            <input type="textarea" placeholder="Post a comment!" className="comment-box"/>
            <input type="button" value="Post" className="post-button"/>
            <input type="button" value="Like" className="like-button"/>
        </div>
    )
}

export default MessageCard