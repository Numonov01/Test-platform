// src/components/TestPage.tsx
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";

export default function TestPage() {
  const { subject, topicId } = useParams<{
    subject: string;
    topicId: string;
  }>();

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Button
        component={Link}
        to={`/subject/${subject}/topic/${topicId}`}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Mavzuga qaytish
      </Button>

      <Box sx={{ textAlign: "center", my: 8 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Test Sahifasi
        </Typography>

        <Typography variant="h5" color="primary" gutterBottom>
          {subject?.toUpperCase()} fanining {topicId}-mavzusi
        </Typography>

        <Typography variant="body1" sx={{ my: 4 }}>
          Bu yerda test ishlash imkoniyati bo'ladi. Hozircha bu sahifa ishlab
          chiqilmoqda.
        </Typography>

        <Button variant="outlined" size="large" sx={{ mt: 2 }} disabled>
          Test Yaqinda Ishlaga Tushadi
        </Button>
      </Box>
    </Container>
  );
}
