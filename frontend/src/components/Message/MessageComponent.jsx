import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
// import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "../RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  // const { sender, content, attachments = [], createdAt } = message;

  // const sameSender = sender?._id === user?._id;
  const sameSender = true;

  // const timeAgo = moment(createdAt).fromNow();
  const content = "this is a demo message and is hard typed."

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "rgba(255, 234, 0, 0.858)",
        color: "black",
        borderRadius: "20px",
        padding: "10px",
        // width: "fit-content",
        width: "250px",
        margin: "5px",
      }}
    >
      {!sameSender && (
        <Typography fontWeight={"600"} variant="caption">
          {/* {sender.name} */}
          test user
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {/* {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography> */}
    </motion.div>
  );
};

export default memo(MessageComponent);
