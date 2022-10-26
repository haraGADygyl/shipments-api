import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import {
  setNewState,
  addNewShipment,
  removeShipment,
  updateShipment,
} from "../../store/shipment/shipmentSlice";

export const useCrudActionsDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { setNewState, addNewShipment, removeShipment, updateShipment },
    dispatch
  );
};
