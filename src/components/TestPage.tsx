// src/components/TestPage.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

// TypeScript interfeyslari
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TestData {
  [subject: string]: {
    [topicId: number]: Question[];
  };
}

interface Results {
  total: number;
  correct: number;
  percentage: number;
  details: {
    [questionId: number]: {
      isCorrect: boolean;
      userAnswer: number;
      correctAnswer: number;
    };
  };
}

// Test ma'lumotlari (namuna)
const testData: TestData = {
  matematika: {
    1: [
      {
        id: 1,
        question:
          "O'zbekiston SSRning Mustaqillik Deklaratsiyasi qachon qabul qilingan?",
        options: [
          "1990-yil 21-iyul",
          "1991 yil 20-iyun",
          "1990 yil 20-iyun",
          "1990 yil 19-avgust",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "2 + 2 nechi bo'ladi?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "3 × 5 ifodaning qiymati qanchaga teng?",
        options: ["10", "15", "20", "25"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "10 - 3 ifodaning qiymati qanchaga teng?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "16 ÷ 4 ifodaning qiymati qanchaga teng?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
    ],
  },
  fizika: {
    1: [
      {
        id: 1,
        question: "Nyutonning birinchi qonuni nima deb ataladi?",
        options: [
          "Inersiya qonuni",
          "Ta'sir va qarshi ta'sir qonuni",
          "Gravitatsiya qonuni",
          "Energiyaning saqlanish qonuni",
        ],
        correctAnswer: 0,
      },
    ],
  },
};

export default function TestPage() {
  const { subject, topicId } = useParams<{
    subject: string;
    topicId: string;
  }>();

  const [mode, setMode] = useState<"sequential" | "all" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [results, setResults] = useState<Results | null>(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 daqiqa
  const [showDetails, setShowDetails] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<{
    [key: number]: boolean;
  }>({});

  const subjectKey = subject || "";
  const topicIdNum = parseInt(topicId || "0");
  const questions = useMemo(() => {
    return (testData[subjectKey] && testData[subjectKey][topicIdNum]) || [];
  }, [subjectKey, topicIdNum]);
  const totalQuestions = questions.length;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswer = (questionId: number, answerIndex: number): void => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));

    // Faqat ketma-ket rejimda tekshirish va keyingi savolga o'tish
    if (mode === "sequential") {
      setCheckedQuestions((prev) => ({ ...prev, [questionId]: true }));

      // Ketma-ket rejimda keyingi savolga o'tish
      if (currentQuestion < totalQuestions - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
      }
    }
  };

  const handleFinishTest = useCallback((): void => {
    let correctCount = 0;
    const questionResults: Results["details"] = {};

    questions.forEach((question) => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      if (isCorrect) {
        correctCount++;
      }

      questionResults[question.id] = {
        isCorrect,
        userAnswer: answers[question.id] ?? -1,
        correctAnswer: question.correctAnswer,
      };
    });

    setResults({
      total: totalQuestions,
      correct: correctCount,
      percentage: Math.round((correctCount / totalQuestions) * 100),
      details: questionResults,
    });
  }, [answers, questions, totalQuestions]);

  // Vaqtni hisoblash
  useEffect(() => {
    if (mode && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishTest();
    }
  }, [mode, timeLeft, handleFinishTest]);

  const resetTest = (): void => {
    setMode(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setTimeLeft(1800);
    setShowDetails(false);
    setCheckedQuestions({});
  };

  if (!mode) {
    return (
      <Container maxWidth="md" sx={{ py: 4, mt: 8 }}>
        <Button
          component={Link}
          to={`/subject/${subject}/topic/${topicId}`}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Mavzuga qaytish
        </Button>

        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Testni boshlash
          </Typography>

          <Typography variant="h6" color="primary" gutterBottom>
            {subject?.toUpperCase()} fanining {topicId}-mavzusi
          </Typography>

          <Typography variant="body1" sx={{ my: 4 }}>
            Testni ishlash uchun quyidagi rejimlardan birini tanlang:
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: 3,
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setMode("sequential")}
              >
                <Typography variant="h6" gutterBottom>
                  Ketma-ket rejim
                </Typography>
                <Typography variant="body2">
                  Testlarni birin-ketin ishlaysiz. Har bir javobingizdan keyin
                  keyingi savolga o'tasiz.
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  p: 3,
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setMode("all")}
              >
                <Typography variant="h6" gutterBottom>
                  Ko'p qismli rejim
                </Typography>
                <Typography variant="body2">
                  Barcha testlar bir sahifada ko'rinadi. Istalgan tartibda javob
                  berishingiz mumkin.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          <Card
            sx={{
              backgroundColor: "grey.100",
              mt: 4,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Test haqida ma'lumot:
            </Typography>
            <Typography variant="body2">
              • Savollar soni: {totalQuestions} ta
              <br />
              • Vaqt: 30 daqiqa
              <br />• Murojaatlar: Cheklanmagan
            </Typography>
          </Card>
        </Box>
      </Container>
    );
  }

  if (results) {
    return (
      <Container maxWidth="md" sx={{ py: 4, mt: 8 }}>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Test yakunlandi
          </Typography>

          <Card sx={{ p: 4, my: 4, textAlign: "center" }}>
            <Typography variant="h3" color="primary" gutterBottom>
              {results.percentage}%
            </Typography>
            <Typography variant="h6" gutterBottom>
              To'g'ri javoblar: {results.correct} / {results.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {results.percentage >= 70
                ? "A'lo!"
                : results.percentage >= 50
                ? "Qoniqarli!"
                : "Qoniqarsiz, yana urunib ko'ring!"}
            </Typography>
          </Card>

          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Natijalarni yashirish" : "Tafsilotlarni ko'rsatish"}
          </Button>

          <Button variant="outlined" sx={{ mr: 2 }} onClick={resetTest}>
            Qayta urunish
          </Button>

          <Button
            component={Link}
            to={`/subject/${subject}/topic/${topicId}`}
            variant="outlined"
          >
            Mavzuga qaytish
          </Button>
        </Box>

        {showDetails && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Test tafsilotlari
            </Typography>

            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = results.details[question.id].isCorrect;
              const correctAnswerIndex = question.correctAnswer;

              return (
                <Card
                  key={question.id}
                  sx={{
                    p: 3,
                    mb: 2,
                    border: isCorrect
                      ? "1px solid #4caf50"
                      : "1px solid #f44336",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {isCorrect ? (
                      <CheckIcon color="success" sx={{ mr: 1 }} />
                    ) : (
                      <ClearIcon color="error" sx={{ mr: 1 }} />
                    )}
                    <Typography variant="h6">
                      Savol {index + 1}: {question.question}
                    </Typography>
                  </Box>

                  <Box sx={{ ml: 4 }}>
                    {question.options.map((option, optIndex) => {
                      let bgColor = "transparent";
                      let icon = null;

                      if (optIndex === correctAnswerIndex) {
                        bgColor = "#e8f5e9";
                        icon = (
                          <CheckIcon
                            color="success"
                            sx={{ fontSize: 16, mr: 1 }}
                          />
                        );
                      } else if (!isCorrect && optIndex === userAnswer) {
                        bgColor = "#ffebee";
                        icon = (
                          <ClearIcon
                            color="error"
                            sx={{ fontSize: 16, mr: 1 }}
                          />
                        );
                      }

                      return (
                        <Box
                          key={optIndex}
                          sx={{
                            p: 1,
                            mb: 1,
                            borderRadius: 1,
                            backgroundColor: bgColor,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {icon}
                          <Typography>
                            {option}
                            {optIndex === correctAnswerIndex &&
                              " (To'g'ri javob)"}
                            {!isCorrect &&
                              optIndex === userAnswer &&
                              " (Sizning javobingiz)"}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Button
          component={Link}
          to={`/subject/${subject}/topic/${topicId}`}
          startIcon={<ArrowBackIcon />}
        >
          Mavzuga qaytish
        </Button>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Qolgan vaqt: <strong>{formatTime(timeLeft)}</strong>
          </Typography>
          <Button variant="outlined" size="small" onClick={handleFinishTest}>
            Testni yakunlash
          </Button>
        </Box>
      </Box>

      {/* TEST NAVIGATSIYA QATORI - IKKALA REJIM UCHUN */}
      <Box
        sx={{
          mb: 3,
          position: "sticky",
          top: 100,
          backgroundColor: "background.paper",
          zIndex: 1000,
          py: 2,
          borderRadius: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {questions.map((question, index) => {
            const isAnswered = answers[question.id] !== undefined;

            // Ketma-ket rejim uchun ranglar
            let chipColor: "default" | "primary" | "success" | "error" =
              "default";
            let chipVariant: "filled" | "outlined" = "outlined";

            if (mode === "sequential") {
              const isCorrect =
                isAnswered && answers[question.id] === question.correctAnswer;
              const isChecked = checkedQuestions[question.id];

              if (currentQuestion === index) {
                chipColor = "primary";
                chipVariant = "filled";
              } else if (isAnswered && isChecked) {
                chipColor = isCorrect ? "success" : "error";
                chipVariant = "filled";
              } else if (isAnswered) {
                chipVariant = "filled";
              }
            } else {
              // Ko'p qismli rejim - faqat javob berilganligini ko'rsatish
              chipVariant = isAnswered ? "filled" : "outlined";
              chipColor = isAnswered ? "primary" : "default";
            }

            return (
              <Chip
                key={index}
                label={`${index + 1}`}
                onClick={() => {
                  setCurrentQuestion(index);
                  if (mode === "all") {
                    const element = document.getElementById(
                      `question-${question.id}`
                    );
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                color={chipColor}
                variant={chipVariant}
                sx={{
                  minWidth: 40,
                  fontWeight: isAnswered ? "bold" : "normal",
                }}
              />
            );
          })}
        </Box>
      </Box>

      {mode === "sequential" ? (
        // Ketma-ket rejim
        <Card sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Savol {currentQuestion + 1} / {totalQuestions}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>

          <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
            <RadioGroup>
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrectAnswer =
                  index === questions[currentQuestion].correctAnswer;
                const isUserAnswer =
                  answers[questions[currentQuestion].id] === index;
                const isChecked =
                  checkedQuestions[questions[currentQuestion].id];

                let optionStyle = {};
                if (isChecked) {
                  if (isCorrectAnswer) {
                    optionStyle = {
                      backgroundColor: "#e8f5e9",
                      borderRadius: 1,
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                    };
                  } else if (isUserAnswer && !isCorrectAnswer) {
                    optionStyle = {
                      backgroundColor: "#ffebee",
                      borderRadius: 1,
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                    };
                  }
                }

                return (
                  <FormControlLabel
                    key={index}
                    value={index.toString()}
                    control={<Radio />}
                    label={
                      <Box sx={optionStyle}>
                        {option}
                        {isChecked && isCorrectAnswer && (
                          <CheckIcon
                            color="success"
                            sx={{ fontSize: 16, ml: 1 }}
                          />
                        )}
                        {isChecked && isUserAnswer && !isCorrectAnswer && (
                          <ClearIcon
                            color="error"
                            sx={{ fontSize: 16, ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                    onChange={() =>
                      handleAnswer(questions[currentQuestion].id, index)
                    }
                    checked={answers[questions[currentQuestion].id] === index}
                    disabled={checkedQuestions[questions[currentQuestion].id]}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="outlined"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Oldingi
            </Button>

            <Button
              variant="outlined"
              disabled={currentQuestion === totalQuestions - 1}
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Keyingi
            </Button>
          </Box>
        </Card>
      ) : (
        // Ko'p qismli rejim - faqat javob berish, tekshirish emas
        <Box>
          <Typography variant="h5" gutterBottom>
            Barcha Savollar
          </Typography>

          <Grid container spacing={2}>
            {questions.map((question, index) => (
              <Grid
                size={{ xs: 12 }}
                key={question.id}
                id={`question-${question.id}`}
              >
                <Card sx={{ p: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Savol {index + 1}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    {question.question}
                  </Typography>

                  <FormControl
                    component="fieldset"
                    sx={{ mt: 1, width: "100%" }}
                  >
                    <RadioGroup>
                      {question.options.map((option, optIndex) => (
                        <FormControlLabel
                          key={optIndex}
                          value={optIndex.toString()}
                          control={<Radio />}
                          label={option}
                          onChange={() => handleAnswer(question.id, optIndex)}
                          checked={answers[question.id] === optIndex}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
