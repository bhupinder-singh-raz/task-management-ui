import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ListContainer = styled(Box)({
  width: "100%",
  paddingTop: "8px",
});

export const ListItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));