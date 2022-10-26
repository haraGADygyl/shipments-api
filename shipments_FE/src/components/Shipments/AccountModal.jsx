import React, {useState,} from 'react';
import {formatJsDateToYYYYMMDD} from '../../services/dateService'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {validateFields} from '../../services/validation'

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        if( column.accessorKey === 'order_date') acc[column.accessorKey] = formatJsDateToYYYYMMDD(new Date())
        else{
          acc[column.accessorKey ?? ''] = '';
        }
       
        return acc;
      }, {}),
    );
  
    const resetData = () =>{
      setValues(() =>
      columns.reduce((acc, column) => {
        if( column.accessorKey === 'order_date') acc[column.accessorKey] = formatJsDateToYYYYMMDD(new Date())
        else{
          acc[column.accessorKey ?? ''] = '';
        }
        return acc;
      }, {}),)
    }
  
    const handleSubmit = () => {
        // ValidateFields
       const isNotValuesValid =  validateFields(values)

      if(!isNotValuesValid){
        onSubmit(values);
        onClose();
        resetData()
      }else{
        alert(`Error message: ${isNotValuesValid}` )
      }
    };
    
    const handleClose = () => {
      resetData()
      onClose();
    }
    
  
    const fieldType = (column) => {
  
      switch(column.type) {
        case 'dropdown':
          return (
            <FormControl sx={{ m: 1, minWidth: 400 }} cypressid="create-dropdowns">
              <InputLabel id={`demo-simple-select-helper-label-${column.accessorKey}`}>{column.header}</InputLabel>
              <Select
                labelId={`demo-simple-select-helper-label-${column.accessorKey}`}
                id={`demo-simple-select-helper-${column.accessorKey}`}
                value={values[column.accessorKey]}
                label={column.header}
                onChange={(e) =>
                  setValues({ ...values, [column.accessorKey]: e.target.value })}
              >
                {
                column.muiTableBodyCellEditTextFieldProps.children.map((state,index)=>(
                    <MenuItem key={'dropdown'+index+state.props.value} value={state.props.value}>
                      {state.props.value}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          )
          
        case 'date': 
        const isDateValid = values[column.accessorKey]
        const date = isDateValid ? new Date(values[column.accessorKey]) : new Date()
          return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label={column.header}
              inputFormat="YYYY/MM/DD"
              value={date || new Date()}
              disabled = {true}
              onChange={(e) =>
                setValues({ ...values, [column.accessorKey]: formatJsDateToYYYYMMDD(e.$d)  })}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>)
        default:
          return (
            <TextField
            key={column.accessorKey}
            label={column.header}
            name={column.accessorKey}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />)
      }
    }
  
    return (
      <Dialog open={open} cypressid="create-acc-modal">
        <DialogTitle textAlign="center">Create New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {columns.map((column,index) => (
                <React.Fragment key={`fieldType`+index}>
                  {fieldType(column)}
                </React.Fragment>
                
              ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained" cypressid="modal-create-btn">
            Create New Account
          </Button>
        </DialogActions>
      </Dialog>
    );
  };