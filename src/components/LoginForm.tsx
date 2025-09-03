import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useLogin } from "../service/login";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  maxWidth: 400,
  margin: "0 auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    position: "relative",
    transform: "none",
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiInputBase-root": {
    marginTop: 0,
  },
}));

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginUser, loading, error } = useLogin();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        await loginUser(username, password);
        onLogin();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledPaper elevation={8}>
        <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
          Tizimga kirish
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Login"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parol"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
}
