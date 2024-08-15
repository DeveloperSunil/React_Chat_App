import { React, useState } from "react";
import "./Login.css";
import Chatbox from "./Chatbox";
import io from "socket.io-client";
import music from "./mixkit-tile.wav";
const socket = io.connect("http://localhost:5005");

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [boolean, setBoolean] = useState(false);
  const notification = new Audio(music);
  const joinChat = () => {
    if (name !== "" || room !== "") {
      socket.emit("join_room", room);
      setBoolean(true);
      notification.play();
    }
  };
  return (
    <>
      {!boolean && (
        <div className="login-container">
          <h2>Join Chat</h2>
          <form>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="room"
                placeholder="Enter Chat Room"
                required
                onChange={(event) => setRoom(event.target.value)}
              />
            </div>
            <button onClick={joinChat} className="login-button">
              Join
            </button>
          </form>
        </div>
      )}

      {boolean && <Chatbox socket={socket} name={name} room={room} />}
    </>
  );
};

export default Login;
