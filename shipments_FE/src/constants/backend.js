import Axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const SHIPMENT_SERVICE = "/shipments";

const axios = Axios.create({ baseURL: BASE_URL });

export { axios, SHIPMENT_SERVICE};
