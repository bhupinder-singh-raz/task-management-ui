import { styled } from "@mui/material/styles";
import { Box, ListItem } from "@mui/material";

export const ListContainer = styled(Box)({
  width: "100%",
  margin: "auto",
  padding: "16px",
});

export const ListItemWrapper = styled(Box)(({ theme }) => ({
  width: "80%",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: "background 0.3s",
  cursor: "pointer",
  "&:hover": {
    background: theme.palette.action.hover,
  },
}));

export const ListItemText = styled(ListItem)({
  flex: 1,
});
