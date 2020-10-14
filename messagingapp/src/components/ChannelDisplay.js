import React, { useState, useEffect } from "react";
import { useDispatch, useStore } from 'react-redux'
import { channelChange } from "../actions";
import { getChannels } from "../helpers/db";
import types from '../helpers/types'

const ChannelDisplay = () => {
  const [channels, setChannels] = useState([]);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    getChannels().then((response) => {
      const channels = [];
      response.forEach((channel) => {
        channels.push({...channel.data(), docId: channel.id});
      });
      setChannels(channels);
    });
  }, []);

  const handleChannelChange = (channel) => {
    dispatch(channelChange(channel))
    console.log(store.getState().channels.selectedChannel.docId);
  }

  return (
    <div className="channel-display">
    <div className="channel-header">
      <span>Create a channel</span>
      <span className="create-channel-button custom-button">+</span>
    </div>
      {channels.map((channel) => (
        <div key={channel.docId} className={(channel.docId !== store.getState().channels.selectedChannel.docId) ? "channel-select-button-active custom-button": "channel-select-button custom-button"} onClick={() => handleChannelChange(channel)}>{channel.name}</div>
      ))}
    </div>
  );
};

export default ChannelDisplay;
