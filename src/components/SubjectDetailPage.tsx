// src/components/SubjectDetailPage.tsx - Update to use the new hook
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Select, type SelectChangeEvent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useThemeDetail } from "../service/themes";

// Remove the hardcoded topicDetails and use the API instead

export default function SubjectDetailPage() {
  const { subject, themeId } = useParams<{
    subject: string;
    themeId: string;
  }>();

  const { theme, loading, error } = useThemeDetail(themeId);
  const navigate = useNavigate();

  // Test soni va tartibi uchun state
  const [testCount, setTestCount] = useState<string>("5");
  const [testOrder, setTestOrder] = useState<string>("random");

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          mt: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error || !theme) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Button
          onClick={() => navigate(-1)}
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

  const handleTestCountChange = (event: SelectChangeEvent) => {
    setTestCount(event.target.value);
  };

  const handleTestOrderChange = (event: SelectChangeEvent) => {
    setTestOrder(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Ortga qaytish
      </Button>

      <Typography variant="h4" gutterBottom fontWeight="bold">
        {theme.name}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {subject?.toUpperCase()} • Davomiylik: {theme.duration} min
      </Typography>

      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Mavzu haqida
          </Typography>
          <Typography variant="body1" paragraph>
            {theme.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          {/* Display the HTML content if available */}
          {theme.full_html_file ? (
            <div dangerouslySetInnerHTML={{ __html: theme.full_html_file }} />
          ) : (
            <Typography variant="body1">
              Ushbu mavzu uchun tarkib mavjud emas.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Testni boshlash */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FormControl sx={{ minWidth: 140 }}>
          <Select
            labelId="test-count-label"
            value={testCount}
            label="Test soni"
            onChange={handleTestCountChange}
            size="small"
            sx={{
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <MenuItem value="5">5 ta test</MenuItem>
            <MenuItem value="10">10 ta test</MenuItem>
            <MenuItem value="20">20 ta test</MenuItem>
            <MenuItem value="25">25 ta test</MenuItem>
            <MenuItem value="30">30 ta test</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 140 }}>
          <Select
            labelId="test-order-label"
            value={testOrder}
            label="Test tartibi"
            onChange={handleTestOrderChange}
            size="small"
            sx={{
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <MenuItem value="random">Tasodifiy</MenuItem>
            <MenuItem value="sequential">Ketma-ket</MenuItem>
          </Select>
        </FormControl>
        <Button
          component={Link}
          to={`/test/${subject}/${themeId}?count=${testCount}&order=${testOrder}`}
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          sx={{ px: 3, py: 1 }}
        >
          Testni boshlash
        </Button>
      </Box>
    </Container>
  );
}
