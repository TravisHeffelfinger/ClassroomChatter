import { Container, Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { updateChannels, updateMessages } from "../actions";
import ChannelDisplay from "../components/ChannelDisplay";
import MessageCard from "../components/MessageCard";
import MessageTextArea from "../components/MessageTextArea";
import { getMessages, getChannels } from "../helpers/db";
import Profile from "./Profile";

class Home extends React.Component {
  componentDidMount() {
    getMessages().then((response) => {
      let messages = [];
      response.forEach((message) => {
        messages.push({ ...message.data(), docId: message.id });
      });
      this.props.updateMessages(messages);
    });

    getChannels().then((response) => {
      const channels = [];
      response.forEach((channel) => {
        channels.push({ ...channel.data(), docId: channel.id });
      });
      this.props.updateChannels(channels);
    });
  }

  displayChannelMessages = () => {
    const { selectedChannel, posts } = this.props;
    const { messages } = posts;
    const result = messages.map((message, index) => {
      if (message.channelId === selectedChannel.docId)
        return (
          <MessageCard
            channelId={selectedChannel.docId}
            key={index}
            messageBody={message.body}
            userImg={message.userImg}
            username={message.displayName}
            docId={message.docId}
          />
        );
    });
    return result;
  };

  render() {
    return (
      //<div className="home-container">
      <Grid container direction="row" justify="center" >
          <Grid item xs={3} >
        {/* <div className="channel-container"> */}
          <ChannelDisplay />
        {/* </div> */}
        </Grid>
        {/* <div className="message-container"> */}
          <Grid item xs={6}>
          <MessageTextArea user={this.props.user} selectedChannel={this.props.selectedChannel}/>
            {this.displayChannelMessages()}

          </Grid>
        {/* </div> */}
        {/* <div className="profile-container"> */}
        <Grid item xs={3}>
        <Profile />
        </Grid>
        {/* </div> */}
    </Grid>
      //</div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedChannel: state.channels.selectedChannel,
  posts: state.posts,
  user: state.user,
});

const mapDispatchToProps = {
  updateChannels,
  updateMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
