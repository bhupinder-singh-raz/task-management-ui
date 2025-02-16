import React, { useEffect, useState } from 'react';
import {
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ButtonStyle, FormContainerStyle, ListDrawerHeadingContainerStyle, cusorPointerStyle, drawerContainerStyle, inputStyle, inputWrapperStyle, labelStyle, submitButtonContainerStyle, titleStyle } from './styles';
import { IProps, ItemFormType, Operation } from './types';
import AxiosService from '../../../../services/api.service';
import { TaskType } from '../../types';
import CancelIcon from '@mui/icons-material/Cancel';


const ListItemDrawer: React.FC<IProps> = (props: IProps) => {
  const { title, description, status, drawerOpen, updateTheSelectedItem, itemId, refreshTheList } = props;
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<ItemFormType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    reset({
      title,
      description,
      status,
    });
  }, [itemId]);

  const closeDrawer = () => {
    updateTheSelectedItem(true, undefined);
  }

  const updateDataInDB = async (data: ItemFormType) => {
    const api = new AxiosService();
    await api.put<Array<TaskType>>(`/tasks/${itemId}`, data);
    refreshTheList("Updation Successful");
    setLoading(false);
    closeDrawer();
  }

  const deleteDataInDB = async () => {
    const api = new AxiosService();
    await api.delete<Array<TaskType>>(`/tasks/${itemId}`);
    refreshTheList("Deletion Successful");
    setLoading(false);
    closeDrawer();
  }

  const addNewDataInDB = async (data: ItemFormType) => {
    const api = new AxiosService();
    await api.post<Array<TaskType>>(`/tasks`, data);
    refreshTheList("Addition Of New Item Successful");
    setLoading(false);
    closeDrawer();
  }

  const onSubmit = async (data: ItemFormType) => {
    if (data) {
      try {
        setLoading(true);
        if (data.operationToBePerformed === Operation.UPDATE) {
          await updateDataInDB(data);
        }
        else if (data.operationToBePerformed === Operation.DELETE) {
          await deleteDataInDB();
        }
        else if (data.operationToBePerformed === Operation.ADD) {
          await addNewDataInDB(data);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      anchor='right'
      variant='persistent'
      sx={drawerContainerStyle}
      PaperProps={{
        sx: { width: "350px" },
      }}
    >
      <Box
        sx={ListDrawerHeadingContainerStyle}
      >
        <Typography variant="h2" sx={titleStyle}>
          Details
        </Typography>
        <CancelIcon sx={cusorPointerStyle} onClick={closeDrawer} />
      </Box>

      <Box sx={FormContainerStyle}>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={inputWrapperStyle}>
            <Typography variant="body1" sx={labelStyle}>Title</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id="Item_Name"
              size="small"
              autoFocus
              {...register('title', {
                required: 'Title is required',
                maxLength: { value: 32, message: "Title should not exceed 32 characters" }
              })}
              defaultValue={title}
              sx={inputStyle}
              error={Boolean(errors?.title)}
              helperText={errors?.title?.message}
            />
          </Box>

          <Box sx={inputWrapperStyle}>
            <Typography variant="body1" sx={labelStyle}>Description</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id="Item_Name"
              size="small"
              autoFocus
              {...register('description', {
                required: 'Description is required',
                maxLength: { value: 100, message: "Description should not exceed 100 characters" }
              })}
              defaultValue={description}
              sx={inputStyle}
              error={Boolean(errors?.description)}
              helperText={errors?.description?.message}
            />
          </Box>

          <Typography variant="body1" sx={labelStyle}>Status</Typography>
          <Controller
            name="status"
            control={control}
            defaultValue={status}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                <FormControlLabel value="completed" control={<Radio />} label="Completed" />
              </RadioGroup>
            )}
          />

          
          <Typography variant="body1" sx={labelStyle}>Which Operation To Performed</Typography>
          <Controller
            name="operationToBePerformed"
            control={control}
            defaultValue={Operation.ADD}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value={Operation.DELETE} control={<Radio />} label="Delete" />
                <FormControlLabel value={Operation.UPDATE} control={<Radio />} label="Update" />
                <FormControlLabel value={Operation.ADD} control={<Radio />} label="Add New Item" />
              </RadioGroup>
            )}
          />
          
          <Box sx={submitButtonContainerStyle}>
            <Button type="submit" variant='outlined' sx={ButtonStyle}>{ loading ? <CircularProgress size={20} />  : "Submit" }</Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default React.memo(ListItemDrawer);
