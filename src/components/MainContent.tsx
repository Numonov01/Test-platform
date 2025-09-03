// src/components/MainContent.tsx
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import TopicsModal from "./TopicsModal";
import { useSubjects } from "../service/subjects";
import { Grid } from "@mui/material";
import type { Subject } from "../types/subjects";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({
  authors,
  theme_count,
}: {
  authors: {
    first_name: string;
    last_name: string;
    profile_photo: string | null;
  }[];
  theme_count: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={`${author.first_name} ${author.last_name}`}
              src={author.profile_photo || undefined}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((a) => `${a.first_name} ${a.last_name}`).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">Mavzular soni: {theme_count}</Typography>
    </Box>
  );
}

interface SubjectCardProps {
  data: Subject;
  index: number;
  focusedCardIndex: number | null;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
  onClick: () => void;
}

function SubjectCard({
  data,
  index,
  focusedCardIndex,
  handleFocus,
  handleBlur,
  onClick,
}: SubjectCardProps) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <SyledCard
        variant="outlined"
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        onClick={onClick}
        tabIndex={0}
        className={focusedCardIndex === index ? "Mui-focused" : ""}
        sx={{ height: "100%" }}
      >
        <SyledCardContent>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            color="primary"
          >
            {data.category?.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {data.name}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {data.description}
          </StyledTypography>
        </SyledCardContent>
        <Author authors={data.authors} theme_count={data.theme_count} />
      </SyledCard>
    </Grid>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Fanni qidirish…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );
  const [activeFilter, setActiveFilter] = React.useState("Barcha fanlar");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState("");

  const { subjects, loading, error } = useSubjects();

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCardClick = (subject: string) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filteredData: Subject[] =
    activeFilter === "Barcha fanlar"
      ? subjects
      : subjects.filter((item: Subject) => item.name === activeFilter);

  if (loading) {
    return <Typography>Yuklanmoqda...</Typography>;
  }

  if (error) {
    return <Typography color="error">Xatolik yuz berdi: {error}</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <div>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Fanlar ro'yxati
        </Typography>
        <Typography color="text.secondary">
          O'quv dasturimizdagi barcha fanlar haqida to'liq ma'lumot
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 1,
            overflow: "auto",
            flexWrap: "wrap",
          }}
        >
          {["Barcha fanlar", ...subjects.map((s: Subject) => s.name)].map(
            (filter: string) => (
              <Chip
                key={filter}
                onClick={() => handleFilterClick(filter)}
                size="medium"
                label={filter}
                variant={activeFilter === filter ? "filled" : "outlined"}
                color={activeFilter === filter ? "primary" : "default"}
              />
            )
          )}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {filteredData.map((subject: Subject, index: number) => (
          <SubjectCard
            key={subject.id}
            data={subject}
            index={index}
            focusedCardIndex={focusedCardIndex}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            onClick={() => handleCardClick(subject.name)}
          />
        ))}
      </Grid>

      <TopicsModal
        open={modalOpen}
        onClose={handleCloseModal}
        subject={selectedSubject}
      />
    </Box>
  );
}
