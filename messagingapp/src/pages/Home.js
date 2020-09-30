import React from 'react'
import ChannelDisplay from '../components/ChannelDisplay'
import MessageCard from '../components/MessageCard'


class Home extends React.Component {

    state={
        messages: []
    }

    render() {
        return (
            <div>
                <div className="channelArea">
                    <ChannelDisplay />
                </div>
                <div className="messageArea">
                    <MessageCard />
                </div>
                <div className="profile">

                </div>
                
            </div>
        )
    }
}

export default Home