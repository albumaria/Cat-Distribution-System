import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import MainPage from "./pages/main_page/MainPage";
import "./index.css";
import DetailPage from "./pages/detail_page/DetailPage";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<MainPage/>}/>
                    <Route path="/:catName" element={<DetailPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;