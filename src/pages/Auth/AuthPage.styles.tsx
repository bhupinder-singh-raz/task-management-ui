import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const AuthContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "url('/assets/img/authBg.jpg') no-repeat center center fixed",
  backgroundSize: "cover",
}));
