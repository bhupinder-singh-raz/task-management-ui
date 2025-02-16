import { Toolbar, Typography } from "@mui/material";
import LogoutButton from "../../../Auth/components/LogoutButton/LogoutButton";
import { StyledAppBar } from "./Header.styles";

export default function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Task Management
        </Typography>
        <LogoutButton />
      </Toolbar>
    </StyledAppBar>
  );
}
