import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledLogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#d32f2f",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
  "&:disabled": {
    backgroundColor: "#ef9a9a",
    color: "#ffffff",
  },
}));