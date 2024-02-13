import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Message from "./Message";
import { SocketContext } from "./context/socket";
import WriteBox from "./WriteBox";
function App() {
  const [inChatRoom, setInChatRoom] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);

  const handleStartChat = () => {
    socket.emit("join_chat");
    setInChatRoom(true);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((messageList) => [...messageList, data]);
    });
  }, []);

  return (
    <div className="App">
      {!inChatRoom && (
        <button onClick={() => handleStartChat()}>Start Chatting</button>
      )}
      {inChatRoom && (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            bgcolor: "grey.200",
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {messageList.map((item, index) => (
              <Message
                key={index}
                message={item}
                socketId={socket.id}
              ></Message>
            ))}
          </Box>
          <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <WriteBox
              messageList={messageList}
              setMessageList={setMessageList}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default App;
