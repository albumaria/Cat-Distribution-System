import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import MainPage from "./pages/main_page/MainPage";
import "./index.css";
import DetailPage from "./pages/detail_page/DetailPage";
import AddPage from "./pages/add_page/AddPage"

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<MainPage/>}/>
                    <Route path="/:catName" element={<DetailPage/>} />
                    <Route path="/add" element={<AddPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;