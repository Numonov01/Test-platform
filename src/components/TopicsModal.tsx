// src/components/TopicsModal.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { ListItem } from "@mui/material";

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

interface Topic {
  id: number;
  title: string;
  duration: string;
  description: string;
}

interface TopicsModalProps {
  open: boolean;
  onClose: () => void;
  subject: string;
}

// Har bir fan uchun mavzular ma'lumotlari
const topicsData: Record<string, Topic[]> = {
  Matematika: [
    {
      id: 1,
      title: "Algebraik ifodalar",
      duration: "2 soat",
      description:
        "Algebraik ifodalarni soddalashtirish va ular ustida amallar",
    },
    {
      id: 2,
      title: "Tenglamalar sistemasi",
      duration: "3 soat",
      description: "Chiziqli va chiziqli bo'lmagan tenglamalar sistemasi",
    },
    {
      id: 3,
      title: "Geometrik shakllar",
      duration: "4 soat",
      description: "Geometrik shakllarning xossalari va ularning yuzalari",
    },
  ],
  Fizika: [
    {
      id: 1,
      title: "Mexanika",
      duration: "5 soat",
      description: "Harakat qonunlari va ularning amaliy qo'llanilishi",
    },
    {
      id: 2,
      title: "Elektromagnetizm",
      duration: "4 soat",
      description: "Elektromagnet to'lqinlar va ularning xususiyatlari",
    },
    {
      id: 3,
      title: "Termodinamika",
      duration: "3 soat",
      description: "Issiqlik va haroratning asosiy qonunlari",
    },
  ],
  Kimyo: [
    {
      id: 1,
      title: "Kimyoviy elementlar",
      duration: "3 soat",
      description: "Kimyoviy elementlarning periodik sisteması",
    },
    {
      id: 2,
      title: "Molekula tuzilishi",
      duration: "4 soat",
      description: "Molekulalarning tuzilishi va ularning xossalari",
    },
    {
      id: 3,
      title: "Kimyoviy reaksiyalar",
      duration: "5 soat",
      description: "Kimyoviy reaksiyalar va ularning turlari",
    },
  ],
  Biologiya: [
    {
      id: 1,
      title: "Hujayra biologiyasi",
      duration: "4 soat",
      description: "Hujayra tuzilishi va funksiyalari",
    },
    {
      id: 2,
      title: "Genetika",
      duration: "5 soat",
      description: "Genlar va irsiyatning asosiy qonunlari",
    },
    {
      id: 3,
      title: "Ekologiya",
      duration: "3 soat",
      description: "Organizmlar va atrof-muhit o'rtasidagi munosabatlar",
    },
  ],
  Informatika: [
    {
      id: 1,
      title: "Dasturlash asoslari",
      duration: "6 soat",
      description: "Dasturlashning asosiy tushunchalari va algoritmlar",
    },
    {
      id: 2,
      title: "Ma'lumotlar bazasi",
      duration: "4 soat",
      description: "Ma'lumotlar bazasi tuzish va boshqarish",
    },
    {
      id: 3,
      title: "Veb-dasturlash",
      duration: "5 soat",
      description: "Veb-saytlar yaratish va ularni ishlab chiqish",
    },
  ],
  Adabiyot: [
    {
      id: 1,
      title: "O'zbek adabiyoti",
      duration: "4 soat",
      description: "O'zbek adabiyotining rivojlanish tarixi",
    },
    {
      id: 2,
      title: "Jahon adabiyoti",
      duration: "5 soat",
      description: "Jahon adabiyotining tanikli namunalari",
    },
    {
      id: 3,
      title: "She'riyat tahlili",
      duration: "3 soat",
      description: "She'rlar tahlili va badiiy uslub",
    },
  ],
};

export default function TopicsModal({
  open,
  onClose,
  subject,
}: TopicsModalProps) {
  const navigate = useNavigate();
  const topics = topicsData[subject] || [];

  const handleTopicClick = (topicId: number) => {
    // Mavzuga bosilganda detallar sahifasiga yo'naltirish
    navigate(`/subject/${subject.toLowerCase()}/topic/${topicId}`);
    onClose(); // Modalni yopish
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
        <List sx={{ width: "100%", maxHeight: 400, overflow: "auto" }}>
          {topics.length > 0 ? (
            topics.map((topic) => (
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
                  },
                }}
              >
                <ListItemText
                  primary={topic.title}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.secondary">
                        {topic.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Davomiylik: {topic.duration}
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
      </Box>
    </Modal>
  );
}
