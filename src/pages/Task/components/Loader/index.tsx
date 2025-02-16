import { Skeleton } from "@mui/material";
import { ListContainer, ListItemWrapper } from "./styles";

const LoaderComponent: React.FC = () => {
  return (
    <ListContainer>
      {[...Array(5)].map((_, index) => (
        <ListItemWrapper key={index}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width="80%" height={20} />
        </ListItemWrapper>
      ))}
    </ListContainer>
  );
};
export default LoaderComponent;