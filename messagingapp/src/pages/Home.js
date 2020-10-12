import React from 'react'
import ChannelDisplay from '../components/ChannelDisplay'
import MessageCard from '../components/MessageCard'
import MessageTextArea from '../components/MessageTextArea'
import { getChannel } from '../helpers/db'
import Profile from './Profile'


class Home extends React.Component {

    state={
        selectedChannel: 'potato'
    }

    componentDidMount() {
        getChannel(this.state.selectedChannel).then(resolve => {
            resolve.forEach(doc => {
                this.setState({ channel: doc.data(), docId: doc.id })
            })
        }, reject => {
            console.log('big failure ', reject)
        })  
    }

    displayChannelMessages = () => {
        const { channel } = this.state;
        const { messages } = channel;
        const result = messages.map((message, index) => {
            return <MessageCard key={index} messageBody={message} username={channel.creatorId} comments={channel.comments} docId={this.state.docId} />
        }) 
        return result;
    }
    render() {
        return (
            <div className="home-container">
                <div className="channel-container">
                    <ChannelDisplay />
                </div>
                <div className="message-container">
                    { this.state.channel ? this.displayChannelMessages(): console.log('loading channel')}
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