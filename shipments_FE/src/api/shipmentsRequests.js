import { axios, SHIPMENT_SERVICE } from "../constants/backend";
import {allData} from '../constants/constantData'

const getAllShipmentsRequest = async () => {
  try {
    const shipmentsData = await axios.get(`${SHIPMENT_SERVICE}/`);
    return shipmentsData;
  } catch (error) {
    console.log(error.message);
  }
};

const createShipmentRequest = async (shipmentData) => {
  try {
    return await axios.post(`${SHIPMENT_SERVICE}/`, shipmentData, {});
  } catch (error) {
    console.log(error.message);
  }
};

const editShipmentRequest = async ( shipmentData) => {
  try {
    return await axios.put(`${SHIPMENT_SERVICE}/${shipmentData.id}/`, shipmentData, {});
  } catch (error) {
    console.log(error.message);
  }
};

const deleteShipmentRequest = async (shipmentData,) => {
  try {
    return await axios.delete(`${SHIPMENT_SERVICE}/${shipmentData.id}/`, shipmentData, {});
  } catch (error) {
    console.log(error.message);
  }
};

export { getAllShipmentsRequest, createShipmentRequest, editShipmentRequest, deleteShipmentRequest };
