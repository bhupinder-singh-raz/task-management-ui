import { Typography } from "@mui/material";
import { StyledCreateTaskButton } from "./CreateTaskButton.styles";

interface CreateTaskButtonProps {
  onClick: () => void;
}

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ onClick }) => {
  return (
    <StyledCreateTaskButton variant='outlined' onClick={onClick}>
      <Typography variant="h6">Create Task</Typography>
    </StyledCreateTaskButton>
  );
};

export default CreateTaskButton;
