import React from 'react'
import { connect } from 'react-redux'
import { updateChannels, channelChange, updateMessages } from '../actions'
import ChannelDisplay from '../components/ChannelDisplay'
import MessageCard from '../components/MessageCard'
import MessageTextArea from '../components/MessageTextArea'
import { getChannel, getMessages } from '../helpers/db'
import Profile from './Profile'

class Home extends React.Component {

    state = {};

    componentDidMount() {
        getMessages().then(response => {
            let messages = [];
            response.forEach(message => {
                messages.push({ ...message.data(), docId: message.id });
            })
            this.props.updateMessages(messages);
        });
        if (this.props.selectedChannel) {
            getChannel(this.props.selectedChannel.name).then(resolve => {
                resolve.forEach(doc => {
                    this.setState({ ...doc.data(), docId: doc.id })
                })
            }, reject => {
                console.log('big failure ', reject)
            })  
        }
        console.log(`this is the state after ComponentDidMount:`, this.state)
    }

    displayChannelMessages = () => {
        const { selectedChannel, posts, user } = this.props;
        const { messages } = posts;
        const result = messages.map((message, index) => {
            return <MessageCard channelId={selectedChannel.docId} key={index} messageBody={message.body} username={user.displayName} docId={message.docId} />
        }) 
        return result;
    }
    // TODO: make sure that line 52 works
    render() {
        return (
            <div className="home-container">
                <div className="channel-container">
                    <ChannelDisplay />
                </div>
                <div className="message-container">
                    
                    {this.displayChannelMessages()} 
                
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
    posts: state.posts,
    user: state.user
})

const mapDispatchToProps = {
    updateChannels,
    channelChange,
    updateMessages
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)