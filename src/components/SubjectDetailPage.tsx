// src/components/SubjectDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Mavzular ma'lumotlari
type TopicDetail = {
  title: string;
  duration: string;
  description: string;
  content: string;
};

const topicDetails: Record<string, Record<number, TopicDetail>> = {
  matematika: {
    1: {
      title: "Algebraik ifodalar",
      duration: "2 soat",
      description:
        "Algebraik ifodalarni soddalashtirish va ular ustida amallar",
      content:
        "Algebraik ifodalar - bu sonlar va o'zgaruvchilarning arifmetik amallar yordamida bog'langan shakli. Ular matematikada muhim o'rin tutadi va turli masalalarni yechishda qo'llaniladi.",
    },
    2: {
      title: "Tenglamalar sistemasi",
      duration: "3 soat",
      description: "Chiziqli va chiziqli bo'lmagan tenglamalar sistemasi",
      content:
        "Tenglamalar sistemasi - bu bir nechta tenglamalarning birgalikda yechilishi. Chiziqli tenglamalar sistemasi eng ko'p qo'llaniladigan tenglamalar tizimi hisoblanadi.",
    },
    3: {
      title: "Geometrik shakllar",
      duration: "4 soat",
      description: "Geometrik shakllarning xossalari va ularning yuzalari",
      content:
        "Geometrik shakllar - fazoda joylashgan nuqtalar to'plami. Ular o'ziga xos xossalarga ega bo'lib, turli hisoblashlar uchun asos bo'la oladi.",
    },
  },
  fizika: {
    1: {
      title: "Mexanika",
      duration: "3 soat",
      description: "Harakat va kuchlar haqida tushuncha",
      content:
        "Mexanika - fizikaning jismlarning harakati va ularga ta'sir etuvchi kuchlar haqidagi bo'limi.",
    },
  },
  kimyo: {
    1: {
      title: "Atom tuzilishi",
      duration: "2 soat",
      description: "Atomning asosiy qismlari va ularning xossalari",
      content:
        "Atom - materiyaning eng kichik qismi bo'lib, u kimyoviy xossalarni saqlaydi. Atom yadrosi va elektronlardan tashkil topgan.",
    },
  },
};

export default function SubjectDetailPage() {
  const { subject, topicId } = useParams<{
    subject: string;
    topicId: string;
  }>();
  const topic = topicDetails[subject || ""]?.[parseInt(topicId || "0")];

  if (!topic) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Ortga qaytish
        </Button>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Mavzu topilmadi
        </Typography>
        <Typography variant="body1">
          Uzr, so'ralgan mavzu topilmadi yoki o'chirilgan.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Ortga qaytish
      </Button>

      <Typography variant="h4" gutterBottom fontWeight="bold">
        {topic.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {subject?.toUpperCase()} • Davomiylik: {topic.duration}
      </Typography>

      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Mavzu haqida
          </Typography>
          <Typography variant="body1" paragraph>
            {topic.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">{topic.content}</Typography>
        </CardContent>
      </Card>

      {/* Testni boshlash tugmasi */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
        <Button
          component={Link}
          to={`/test/${subject}/${topicId}`}
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          sx={{ px: 2 }}
        >
          Testni boshlash
        </Button>
      </Box>
    </Container>
  );
}
