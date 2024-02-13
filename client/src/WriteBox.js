import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useState, useContext } from "react";
import { SocketContext } from "./context/socket";
import SendIcon from "@mui/icons-material/Send";

function WriteMessage({ messageList, setMessageList }) {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <TextField
          fullWidth
          size="small"
          placeholder="Message..."
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#864AF9",
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={1}>
        {message.trim() !== "" && (
          <Button
            fullWidth
            size="large"
            sx={{
              color: "white",
              backgroundColor: "#7743DB",
              "&:hover": { backgroundColor: "#C3ACD0" },
            }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMsg}
          ></Button>
        )}
      </Grid>
    </Grid>
  );
}

export default WriteMessage;
