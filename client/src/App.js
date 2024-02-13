import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "./context/socket";
function App() {
  const [inChatRoom, setInChatRoom] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);

  const handleStartChat = () => {
    socket.emit("join_chat");
    setInChatRoom(true);
  };

  const handleSendMsg = () => {
    let dateTimeOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    };
    const msg = {
      data: message,
      sender: socket.id,
      timeStamp: new Date().toLocaleTimeString("en-US", dateTimeOptions),
    };
    socket.emit("send_message", msg);
    setMessageList((messageList) => [...messageList, msg]);
    setMessage("");
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
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Message..."
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSendMsg}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default App;
