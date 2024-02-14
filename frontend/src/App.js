import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Main from "./components/Main";

const socket = io.connect("https://chat-app-server-opgs.onrender.com/");

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const room = "1234";

  const startChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button onClick={startChat}>Start Chatting</button>
        </div>
      ) : (
        <Main socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;