import React from 'react'
import ChannelDisplay from '../components/ChannelDisplay'
import MessageCard from '../components/MessageCard'


class Home extends React.Component {

    state={
        messages: []
    }

    render() {
        return (
            <div className="home-container">
                <div className="channel-container">
                    <ChannelDisplay />
                </div>
                <div className="message-container">
                    <MessageCard />
                </div>
                <div className="profile-container">

                </div>
                
            </div>
        )
    }
}

export default Home