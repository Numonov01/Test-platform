import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Select, type SelectProps } from "@mui/material";

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as "system" | "light" | "dark")
      }
      inputProps={{
        "data-screenshot": "toggle-mode",
      }}
      {...props}
    >
      <MenuItem value="system">Tizim</MenuItem>
      <MenuItem value="light">Yorug‘</MenuItem>
      <MenuItem value="dark">Qorong‘i</MenuItem>
    </Select>
  );
}
