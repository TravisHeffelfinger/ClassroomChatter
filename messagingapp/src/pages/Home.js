import React from 'react'
import { connect } from 'react-redux'
import { updateChannels, channelChange } from '../actions'
import ChannelDisplay from '../components/ChannelDisplay'
import MessageCard from '../components/MessageCard'
import MessageTextArea from '../components/MessageTextArea'
import { getChannel } from '../helpers/db'
import Profile from './Profile'


class Home extends React.Component {

    state = {
        defaultChannel: 'default'
    }

    componentDidMount() {
        console.log(`this is the props:`, this.props)
        console.log(`this is the state:`, this.state)

        if (!this.props.selectedChannel) {
            console.log('if')
            getChannel(this.state.defaultChannel).then(resolve => {
                resolve.forEach(doc => {
                    
                    this.props.channelChange({ channel: doc.data(), docId: doc.id});
                })
            }, reject => {
                console.log('default channel failed to load');
            })
        } else if (this.props.selectedChannel){
            console.log('else ')
            getChannel(this.props.selectedChannel).then(resolve => {
                resolve.forEach(doc => {
                    this.setState({ channel: doc.data(), docId: doc.id })
                })
            }, reject => {
                console.log('big failure ', reject)
            })  
        }
        console.log(`this is the state:`, this.state)
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
        console.log(`this is the state from render:`, this.props)
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
                    <MessageTextArea />
                </div>
                <div className="profile-container">
                    <Profile />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedChannel: state.channels.selectedChannel,
    test: state
})

const mapDispatchToProps = {
    updateChannels,
    channelChange
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)