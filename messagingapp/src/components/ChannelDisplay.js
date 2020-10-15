import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { channelChange, updateChannels } from "../actions";
import { getChannels, addChannel } from "../helpers/db";

const ChannelDisplay = () => {
  const [channel, setChannel] = useState("");
  const [newChannelButton, setChannelButton] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    getChannels().then((response) => {
      const channels = [];
      response.forEach((channel) => {
        channels.push({ ...channel.data(), docId: channel.id });
      });
      dispatch(updateChannels(channels));
    });
  }, []);

  const handleChannelChange = (channel) => {
    dispatch(channelChange(channel));
    console.log(store.getState().channels.selectedChannel.docId);
  };

  const handleAddChannel = (event) => {
    event.preventDefault();
    addChannel({ name: channel, uid: store.getState().user.uid }); // TODO: implement proper messaging
    getChannels().then((response) => {
      let channels = [];
      response.forEach((channel) => {
        channels.push({ ...channel.data(), docId: channel.id });
      });
      dispatch(updateChannels(channels));
    });
    setChannel("");
  };

  return (
    <div className="channel-display">
      <div className="channel-header">
        <Typography variant="h6" display="inline">
          Create a channel
        </Typography>
        <IconButton
          className="create-channel-button custom-button"
          onClick={() => setChannelButton(!newChannelButton)}
        >
          +
        </IconButton>
        {newChannelButton && (
          <form>
            <TextField
              variant="standard"
              type="text"
              fullWidth="true"
              onChange={(e) => setChannel(e.target.value)}
              value={channel}
            />
            <Button
              color="primary"
              size="medium"
              type="submit"
              onClick={handleAddChannel}
            >
              Add Channel
            </Button>
          </form>
        )}
      </div>
      {store.getState().channels.allChannels.map((channel) => {
        return (channel.docId === store.getState().channels.selectedChannel.docId) ? (
          <Button
            key={channel.docId}
            variant="outlined"
            fullWidth="true"
            color="primary"
            onClick={() => handleChannelChange(channel)}
          >
            {channel.name}
          </Button>
        ) : (
          <Button
            key={channel.docId}
            variant="text"
            fullWidth="true"
            onClick={() => handleChannelChange(channel)}
          >
            {channel.name}
          </Button>
        );
      })}
    </div>
  );
};

export default ChannelDisplay;
