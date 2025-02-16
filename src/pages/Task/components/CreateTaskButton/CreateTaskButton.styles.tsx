import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCreateTaskButton = styled(Button)(({ theme }) => ({
  padding: '5px 10%',
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
}));