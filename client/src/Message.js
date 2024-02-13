import { Box, Typography, Avatar, Paper } from "@mui/material";

const Message = ({ message, socketId }) => {
  console.log(message.sender, socketId);
  const isSender = message.sender === socketId;
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
        <Avatar sx={{ bgcolor: isSender ? "primary.main" : "secondary.main" }}>
          {isSender ? "B" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isSender ? 1 : 0,
            mr: isSender ? 0 : 1,
            backgroundColor: isSender ? "primary.light" : "secondary.light",
            borderRadius: isSender
              ? "20px 20px 20px 5px"
              : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.data}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
export default Message;
