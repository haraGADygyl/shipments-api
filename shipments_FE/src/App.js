import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Layouts/Header/Header";
import Shipments from "./components/Shipments/Shipments";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Shipments/>} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
