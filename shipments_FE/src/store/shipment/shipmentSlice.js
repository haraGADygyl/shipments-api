import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const shipmentSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    setNewState: (state, action) => {
      state.value = [...action.payload];
    },
    addNewShipment: (state, action) => {
      state.value.push(action.payload);
    },
    removeShipment: (state, action) => {
      const shipmentId = action.payload;
      state.value = state.value.filter((state) => {
        return state.id !== shipmentId;
      });

    },
    updateShipment: (state, action) => {
      
      const shipmentId = action.payload.id;
      const findShipment = state.value.find((shi) => shi.id === shipmentId);
      if (findShipment) {
        const shipmentIndex = state.value.indexOf(findShipment);
        state.value[shipmentIndex] = action.payload;
      }
    },
  },
});

export const { setNewState, addNewShipment, removeShipment, updateShipment } =
  shipmentSlice.actions;

export default shipmentSlice.reducer;
