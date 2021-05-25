import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { updateChannels, updateMessages } from "../Redux/actions";
import ChannelDisplay from "../components/ChannelDisplay";
import MessageCard from "../components/MessageCard";
import MessageTextArea from "../components/MessageTextArea";
import { getMessages } from "../helpers/db";
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
  }

  displayChannelMessages = () => {
    const { selectedChannel, posts } = this.props;
    const { messages } = posts;
    const result = messages.map((message, index) => {
      let result;
      if (message.channelId === selectedChannel.docId)
        result = (
          <MessageCard
            channelId={selectedChannel.docId}
            key={index}
            messageBody={message.body}
            userImg={message.userImg}
            username={message.displayName}
            docId={message.docId}
          />
        );

      return result;
    });
    return result;
  };

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={3}>
          <ChannelDisplay />
        </Grid>
        <Grid item xs={6}>
          <MessageTextArea
            user={this.props.user}
            selectedChannel={this.props.selectedChannel}
          />
          {this.displayChannelMessages()}
        </Grid>
        <Grid item xs={3}>
          <Profile />
        </Grid>
      </Grid>
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
