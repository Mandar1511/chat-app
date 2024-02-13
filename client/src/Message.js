import { Box, Typography, Avatar, Paper } from "@mui/material";

const Message = ({ message, socketId }) => {
  const isSender = message.sender === socketId;
  const logo2 = message.sender[0];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSender ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSender ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        {!isSender && <Avatar sx={{ bgcolor: "#8E8FFA" }}>{logo2}</Avatar>}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isSender ? 1 : 0,
            mr: isSender ? 0 : 1,
            color: "white",
            backgroundColor: isSender ? "#7752FE" : "#8E8FFA",
            borderRadius: isSender
              ? "15px 15px 15px 4px"
              : "15px 15px 4px 15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1">{message.data}</Typography>
          <Typography variant="body2">{message.timeStamp}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
export default Message;
