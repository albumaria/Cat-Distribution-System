import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import ListPage from "./pages/list_page/ListPage";
import "./index.css";


function App() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<ListPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}


export default App;