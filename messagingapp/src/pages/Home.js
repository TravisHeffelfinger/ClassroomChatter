import React from 'react'
import ChannelDisplay from '../components/ChannelDisplay'
import MessageCard from '../components/MessageCard'
import MessageTextArea from '../components/MessageTextArea'
import Profile from './Profile'


class Home extends React.Component {

    state={
        selectedChannel: 'potato'
    }

    render() {
        return (
            <div className="home-container">
                <div className="channel-container">
                    <ChannelDisplay />
                </div>
                <div className="message-container">
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageTextArea selectedChannel={ this.state.selectedChannel } />
                </div>
                <div className="profile-container">
                    <Profile />
                </div>
            </div>
        )
    }
}

export default Home