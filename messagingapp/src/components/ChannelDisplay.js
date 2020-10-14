import React, { useState, useEffect } from "react";
import { getChannels } from "../helpers/db";

const ChannelDisplay = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getChannels().then((response) => {
      const channels = [];
      response.forEach((channel) => {
        channels.push({...channel.data(), docId: channel.id});
      });
      setChannels(channels);
    });
  }, []);

  return (
    <div className="channel-display">
    <div className="channel-header">
      <span>Create a channel</span>
      <span className="create-channel-button">+</span>
    </div>
      {channels.map((channel, index) => (
        <div key={index} className="channel-select-button">{channel.name}</div>
      ))}
    </div>
  );
};

export default ChannelDisplay;
