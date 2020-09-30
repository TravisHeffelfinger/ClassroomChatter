import React, { useState, useEffect } from "react";
import { getChannels } from "../helpers/db";

const ChannelDisplay = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getChannels().then((response) => {
      const channels = [];
      console.log(typeof(response), response)
      response.forEach((channel) => {
        channels.push(channel.data());
      });
      setChannels(channels);
    });
  }, []);

  return (
    <div>
      {channels.map((channel, index) => (
        <div key={index}>{channel.name}</div>
      ))}
    </div>
  );
};

export default ChannelDisplay;
