import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Upload from './Upload/Upload';
import Visualizer from './Visualizer';
import { useDispatch, useSelector } from "react-redux";


const Routing = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path='/Player' element={<Visualizer />} />
      <Route path='/Upload' element={<Upload />} />
    </Routes>
  );
};

export default Routing;
