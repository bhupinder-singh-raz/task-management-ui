import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, List } from '@mui/material';
import ListItemDrawer from './components/ListItemDrawer';
import AxiosService from '../../services/api.service';
import LoaderComponent from './components/Loader/index'
import StarsIcon from '@mui/icons-material/Stars';
import { ListItemWrapper, ListItemText, ListContainer } from './styles';
import { TaskType } from './types';
import CreateTaskButton from './components/CreateTaskButton/CreateTaskButton';
import Header from './components/Header/Header';


const initialSelectedItemstate: TaskType = {
  _id: "",
  title: "",
  description: "",
  status: "pending",
  userId: "",
  createdAt: new Date(),
  updatedAt: new Date(),
}


export function TaskPage() {
  const [list, setList] = useState<Array<TaskType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<TaskType>({ ...initialSelectedItemstate });
  const [operationCompletionMsg, setOperationCompletionMsg] = useState<string>("");

  useEffect(() => {
    const getListFromBackend = async () => {
      try {
        refreshTheList();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getListFromBackend();
  }, []);


  const refreshTheList = useCallback(async (message?: string) => {
    const api = new AxiosService();
    const response = await api.get<Array<TaskType>>('/tasks');
    setList(response);
    if (message) {
      setOperationCompletionMsg(message);
      setTimeout(() => {
        setOperationCompletionMsg("");
      }, 1000);
    }
  }, []);


  const updateTheSelectedItem = useCallback((reset: boolean = false, index?: number) => {
    if (reset) {
      setSelectedItem({ ...initialSelectedItemstate });
    }
    else {
      setSelectedItem((prevState: TaskType) => {
        const selectedItem = list[index as number];
        return { ...selectedItem };
      });
    }
  }, [selectedItem, list]);

  const handleCreateTask = () => {
    setSelectedItem({ ...initialSelectedItemstate, _id: "newId", });
  }

  return (
    <>
      <Header />

      <ListContainer>
        <CreateTaskButton onClick={handleCreateTask} />

        {
          loading ?
            <LoaderComponent /> :
            <List>
              {list?.map((item: TaskType, index: number) => (
                <ListItemWrapper key={item._id} onClick={() => updateTheSelectedItem(false, index)}>
                  <StarsIcon />
                  <ListItemText>{item.title}</ListItemText>
                </ListItemWrapper>
              ))}
            </List>
        }

        {
          operationCompletionMsg &&
          <Box><Alert severity="success">{operationCompletionMsg}!</Alert></Box>
        }

        {
          Boolean(selectedItem._id) &&
          <ListItemDrawer
            itemId={selectedItem._id}
            title={selectedItem.title}
            description={selectedItem.description ?? ""}
            status={selectedItem.status}
            drawerOpen={Boolean(selectedItem._id)}
            updateTheSelectedItem={updateTheSelectedItem}
            refreshTheList={refreshTheList}
          />
        }

      </ListContainer>
    </>
  );
}
