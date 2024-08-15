import React, { useEffect, useState } from "react";
import "./Chatbox.css";
import music from "./iphone-sms.mp3";

const Chatbox = ({ socket, name, room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const notification = new Audio(music);
  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = {
        id: Math.random(),
        text: input,
        room: room,
        username: name, // You can replace this with dynamic usernames if needed
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      await socket.emit("send_message", newMessage);
      setMessages((list) => [...list, newMessage]);
      setInput("");
      notification.play();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      setMessages((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceiveMsg);
    return () => {
      socket.off("receive_message", handleReceiveMsg);
    };
  }, [socket]);

  return (
    <>
      <h2 style={{ margin: "10px auto" }}>Welcome {name}</h2>
      <div className="chatbox-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div className="message-content">{message.text}</div>
              <div className="message-info">
                <span className="username">{message.username}</span>
                <span className="time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
