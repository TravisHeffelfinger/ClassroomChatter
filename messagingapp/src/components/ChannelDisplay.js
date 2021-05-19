import { Button, CardHeader, IconButton, Card, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { channelChange, updateChannels } from "../actions";
import { getChannels, addChannel } from "../helpers/db";

const ChannelDisplay = () => {
  const [channel, setChannel] = useState("");
  const [newChannelButton, setChannelButton] = useState(false);
  const [ownChannelSelect, setOwnChannelSelect] = useState();

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

  const handleChannelNameChange = (event) => {
    console.log('changed name of channel to')
  }
  const handleChannelDelete = (event) => {
    console.log('deleted Channel')
  }
  return (
    <Card className="channel-display">
      <CardHeader className="channel-header"
       title={<Typography variant="h6" display="inline">
          All Channels <IconButton
          className="create-channel-button custom-button"
          onClick={() => setChannelButton(!newChannelButton)}
        >
          +
        </IconButton>
        </Typography>}/>
   
        
        {newChannelButton && (
          <form>
            <TextField
              variant="standard"
              type="text"
              fullWidth="true"
              onChange={(e) => setChannel(e.target.value)}
              label="Enter channel name..."
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
            <Button
              color="secondary"
              size="medium"
              type="submit"
              onClick={() => setChannelButton(false)}
            >
              Cancel
            </Button>
          </form>
        )}

      {store.getState().channels.allChannels.map((channel) => {
        return (channel.docId === store.getState().channels.selectedChannel.docId) ? (
          <Button
            key={channel.docId}
            variant="contained"
            fullWidth={true}
            color="primary"
            onClick={() => handleChannelChange(channel)}
          >
            {channel.name}
          </Button>
        ) : (
          <Button
            key={channel.docId}
            variant="text"
            fullWidth={true}
            onClick={() => handleChannelChange(channel)}
          >
            {channel.name}
          </Button>
        );
      })}
      <CardHeader title={<Typography variant="h6" display="inline">Your Channels</Typography>}/>
      {store.getState().channels.allChannels.map((channel) => {
        let result = {};
         if(channel.creatorId === store.getState().user.userId) {
          result = <Button
            key={channel.docId}
            variant="text"
            fullWidth={true}
            onClick={() => setOwnChannelSelect(channel.docId)}
          >
            {channel.name}
          </Button>
        } else if (channel.creatorId === store.getState().user.userId && ownChannelSelect === channel.docId) {
          console.log('ding')
          result = <> <Button
            key={channel.docId}
            variant="contained"
            fullWidth={true}
            onClick={() => setOwnChannelSelect('')}
          >
            {channel.name}
          </Button>
          <Button variant="text" fullWidth={true} onClick={() => handleChannelNameChange} color="primary">Change Name</Button>
          <Button variant="text" fullWidth={true} onClick={() => handleChannelDelete} color="secondary">Delete</Button></>
        }
        return result

      })}
    </Card>
  );
};

export default ChannelDisplay;
