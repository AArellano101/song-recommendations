import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FrontPage from "./FrontPage";
import Info from "./Info";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const PORT = 3000;

const App = () => {
  const [data,setData] = useState();
  const [info, setInfo] = useState();
  let location = useLocation();

  const getData = async() =>{
    const response = await Axios.get(`http://localhost:${PORT}${location.pathname}`);
    setData(response.data);
    setInfo(data.map((item) => <li className="item list-group-item">{item}</li>));
  }

  useEffect(() => {
    getData()
  });

  return (
    <>
      <Routes>
        <Route exact path="/" element={<FrontPage/>}/>
        <Route exact path="/info" element={<Info info={ info }/>}/>
      </Routes>
    </>
  )
}

export default App