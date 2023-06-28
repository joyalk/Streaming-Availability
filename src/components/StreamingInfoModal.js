import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { platformPrices } from "./MovieList";

const StreamingInfoModal = ({ isOpen, onRequestClose, streamingInfo }) => {
  const closeModal = () => {
    onRequestClose();
  };

  const modalStyles = {
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const headerStyles = {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
  };

  const titleStyles = {
    fontSize: "20px",
    margin: "0",
  };

  const closeStyles = {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  };

  const contentStyles = {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "16px",
    paddingBottom: "60px", // Add bottom padding to prevent cutoff
  };

  const platformStyles = {
    marginBottom: "16px",
  };

  const platformTitleStyles = {
    fontSize: "18px",
    margin: "0",
  };

  const noInfoStyles = {
    margin: "0",
    fontStyle: "italic",
    color: "#888",
  };

  let content;
  if (streamingInfo) {
    content = Object.entries(streamingInfo).map(
      ([platform, options], index) => (
        <Box key={index} sx={platformStyles}>
          <Typography variant="h3" sx={platformTitleStyles}>
            {`${platform.charAt(0).toUpperCase()}${platform.slice(1)}: $${
              platformPrices[platform]
            }`}
          </Typography>
        </Box>
      )
    );
  } else {
    content = (
      <Typography variant="body1" sx={noInfoStyles}>
        No streaming info available
      </Typography>
    );
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="streaming-info-modal"
    >
      <Box sx={modalStyles}>
        <Box sx={headerStyles}>
          <Typography variant="h2" sx={titleStyles}>
            Streaming Information
          </Typography>
          <IconButton sx={closeStyles} onClick={closeModal} aria-label="Close">
            <Close />
          </IconButton>
        </Box>
        <Box sx={contentStyles}>{content}</Box>
      </Box>
    </Modal>
  );
};

export default StreamingInfoModal;