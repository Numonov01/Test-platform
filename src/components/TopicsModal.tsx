// src/components/TopicsModal.tsx
import * as React from "react";
import {
  Box,
  Modal,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useThemes } from "../service/themes";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};

interface TopicsModalProps {
  open: boolean;
  onClose: () => void;
  subject: string;
}

export default function TopicsModal({
  open,
  onClose,
  subject,
}: TopicsModalProps) {
  const { themes, loading, error } = useThemes(subject);
  const navigate = useNavigate();

  const handleTopicClick = (themeId: string) => {
    onClose();
    navigate(`/subject/${subject}/theme/${themeId}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {subject} fanining mavzulari
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {loading && (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography variant="body2" color="error" sx={{ p: 2 }}>
            Xatolik: {error}
          </Typography>
        )}

        {!loading && !error && (
          <List sx={{ width: "100%", maxHeight: 400, overflow: "auto" }}>
            {themes.length > 0 ? (
              themes.map((topic) => (
                <ListItem
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.id)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    textAlign: "left",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText
                    primary={topic.name}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" color="text.secondary">
                          {topic.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Davomiylik: {topic.duration} min
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                Ushbu fan uchun mavzular mavjud emas.
              </Typography>
            )}
          </List>
        )}
      </Box>
    </Modal>
  );
}
