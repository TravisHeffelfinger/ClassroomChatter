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
        <span>Create a channel</span>
        <span
          className="create-channel-button custom-button"
          onClick={() => setChannelButton(!newChannelButton)}
        >
          +
        </span>
        {newChannelButton && (
          <form>
            <input
              type="text"
              onChange={(e) => setChannel(e.target.value)}
              value={channel}
            />
            <button type="submit" onClick={handleAddChannel}>
              Add Channel
            </button>
          </form>
        )}
      </div>
      {store.getState().channels.allChannels.map((channel) => (
        <div
          key={channel.docId}
          className={
            channel.docId !== store.getState().channels.selectedChannel.docId
              ? "channel-select-button-active custom-button"
              : "channel-select-button custom-button"
          }
          onClick={() => handleChannelChange(channel)}
        >
          {channel.name}
        </div>
      ))}
    </div>
  );
};

export default ChannelDisplay;
