import { BsSend } from "react-icons/bs";
import React, { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(message);
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handelSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          
        
        />

        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
