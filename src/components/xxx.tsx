// src/components/MainContent.tsx
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";

const cardData = [
  {
    tag: "Matematika",
    title: "Matematika fanini o'rganishning zamonaviy usullari",
    description:
      "Zamonaviy matematika darslarida interfaol usullar va amaliy misollar orqali murakkab tushunchalarni osonlashtirish. Yangi pedagogik texnologiyalar va dasturlar haqida batafsil.",
    authors: [
      { name: "Aliyev Sanjar", avatar: "/static/images/avatar/1.jpg" },
      { name: "Hasanova Dilnoz", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
  {
    tag: "Fizika",
    title: "Fizika laboratoriya tajribalari va amaliy qo'llanma",
    description:
      "Fizika fanini tushunishda laboratoriya tajribalarining ahamiyati. Yangi uskunalar va virtual laboratoriyalar yordamida fizik hodisalarni o'rganish metodikasi.",
    authors: [{ name: "Karimov Jasur", avatar: "/static/images/avatar/6.jpg" }],
  },
  {
    tag: "Kimyo",
    title: "Kimyo fanini hayotiy misollar bilan o'rganish",
    description:
      "Kundalik hayotdagi kimyoviy jarayonlar va ularning izohlari. Kimyoviy formulalarni yodlash emas, balki tushunishga qaratilgan innovatsion o'qitish usullari.",
    authors: [
      { name: "Olimova Shahnoza", avatar: "/static/images/avatar/7.jpg" },
    ],
  },
  {
    tag: "Biologiya",
    title: "Biologik tadqiqotlar va tabiatni o'rganish",
    description:
      "Zamonaviy biologiya fanidagi so'nggi kashfiyotlar va ularning amaliy ahamiyati. O'simliklar va hayvonlar dunyosidagi qiziqarli hodisalar haqida batafsil ma'lumot.",
    authors: [
      { name: "Yusupova Feruza", avatar: "/static/images/avatar/3.jpg" },
    ],
  },
  {
    tag: "Informatika",
    title: "Dasturlash asoslari va algoritmik tafakkur",
    description:
      "Zamonaviy informatika darslarida dasturlish tillari va ularning qo'llanilishi. Algorithmik muammolarni yechishda mantiqiy fikrlashni rivojlantirish usullari.",
    authors: [
      { name: "Temirov Aziz", avatar: "/static/images/avatar/4.jpg" },
      { name: "G'aniyeva Madina", avatar: "/static/images/avatar/5.jpg" },
    ],
  },
  {
    tag: "Adabiyot",
    title: "Adabiyotshunoslik va she'riyat tahlili",
    description:
      "Adabiy asarlarni chuqur tahlil qilish va badiiy uslubni o'rganish. O'zbek va jahon adabiyotining tanqli namunalari va ularning tahliy usullari.",
    authors: [
      { name: "Nosirova Laylo", avatar: "/static/images/avatar/2.jpg" },
    ],
  },
];

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

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
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
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">Dars soati: 45 daqiqa</Typography>
    </Box>
  );
}

function SubjectCard({
  data,
  index,
  focusedCardIndex,
  handleFocus,
  handleBlur,
}: {
  data: (typeof cardData)[0];
  index: number;
  focusedCardIndex: number | null;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
}) {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <SyledCard
        variant="outlined"
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
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
            {data.tag}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {data.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {data.description}
          </StyledTypography>
        </SyledCardContent>
        <Author authors={data.authors} />
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

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredData =
    activeFilter === "Barcha fanlar"
      ? cardData
      : cardData.filter((item) => item.tag === activeFilter);

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
          {[
            "Barcha fanlar",
            "Matematika",
            "Fizika",
            "Kimyo",
            "Biologiya",
            "Informatika",
            "Adabiyot",
          ].map((filter) => (
            <Chip
              key={filter}
              onClick={() => handleFilterClick(filter)}
              size="medium"
              label={filter}
              variant={activeFilter === filter ? "filled" : "outlined"}
              color={activeFilter === filter ? "primary" : "default"}
            />
          ))}
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
      <Grid container spacing={2} columns={12}>
        {filteredData.map((data, index) => (
          <SubjectCard
            key={index}
            data={data}
            index={index}
            focusedCardIndex={focusedCardIndex}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        ))}
      </Grid>
    </Box>
  );
}
