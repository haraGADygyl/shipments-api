
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {
  createShipmentRequest,
  deleteShipmentRequest,
  editShipmentRequest,
  getAllShipmentsRequest,
} from "../../api/shipmentsRequests";
import {validateFields} from '../../services/validation'
import { couriers,status,date } from '../../constants/constantData';
import {
  useCrudActionsDispatch,
} from "../../common/hooks/useActions";
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {CreateNewAccountModal} from './AccountModal'

import './Shipments.scss'

const Shipments = () => {
  
  const { setNewState, addNewShipment, removeShipment, updateShipment } =
    useCrudActionsDispatch();
   //Shipments data
  const data = useSelector((state) => state.shipments.value);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState( () => data);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // GET ALL SHIPMENTS 
    getShipments();
  }, []);

  useEffect(() => {
    // Set the shipments to state
    setTableData(data)

  }, [data || data.length]);


  const getShipments = async () => {
  // GET ALL SHIPMENT
    const shipmentsResult = await getAllShipmentsRequest();
    return setNewState(shipmentsResult.data);
  };

  const handleCreateNewRow = async (values) => {
    // CREATE NEW SHIPMENT
    const response = await createShipmentRequest(values);
    addNewShipment(response.data);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
 
    const isNotValuesValid =  validateFields(values)
    if(!isNotValuesValid){
      values.id = row.original.id
      updateShipment(values);
      await editShipmentRequest(values);
      exitEditingMode(); //required to exit editing mode and close modal
    }
    else{
      alert(`Error message: ${isNotValuesValid}` )
    }
  };

  const handleDeleteRow = useCallback(
    // DELETE ROW
   async (row) => {
      removeShipment(row.original.id);
      await deleteShipmentRequest(row.original);
    },
    [tableData],
  );

  const columns = useMemo(
    () => [
        { 
         accessorKey: 'order_date',
         header: 'Ordered Date',
         enableEditing: false,
         type:'date',
         muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: date.map((orderDate,index) => (
            <MenuItem key={'orderDate'+index+orderDate} value={orderDate}>
              {orderDate}
            </MenuItem>
          )),
        },
        },
        {
           accessorKey: 'product_sku',
           header: 'Product sku',
           type:'text',
           size: 140,
         },
         {
           accessorKey: 'customer_name',
           header: 'Customer Name',
           type:'text',
           size: 140,
         },
         {
           accessorKey: 'delivery_address',
           header: 'Delivery Address',
           size: 140,
           type:'text',
         },

         {
           accessorKey: 'courier',
           header: 'Courier',
           type:'dropdown',
           muiTableBodyCellEditTextFieldProps: {
             select: true, //change to select for a dropdown
             children: couriers.map((state,index) => (
               <MenuItem key={'state'+index+state} value={state}>
                 {state}
               </MenuItem>
             )),
           },
         },
         {
           accessorKey: 'status',
           header: 'Status',
           type:'dropdown',
           muiTableBodyCellEditTextFieldProps: {
             select: true, //change to select for a dropdown
             children: status.map((state,index) => (
               <MenuItem key={'status'+index+state} value={state}>
                 {state}
               </MenuItem>
             )),
           },
         },
    ],
    [],
  );



  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            cypressid="open-create-modal-btn"
          >
            Create New Account
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};


const validateRequired = (value) => !!value.length;



export default Shipments;
