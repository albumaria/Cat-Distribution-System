import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import MainPage from "./pages/main_page/MainPage";
import "./index.css";


function App() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<MainPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}


export default App;