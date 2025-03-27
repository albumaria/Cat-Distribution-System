import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import MainPage from "./pages/main_page/MainPage";
import "./index.css";
import DetailPage from "./pages/detail_page/DetailPage";
import AddPage from "./pages/add_page/AddPage"
import useCatData from "./pages/main_page/useCatData";

function App() {
    const { catEntities, setSorting, sortConfig, deleteCat, addCat } = useCatData();

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<MainPage catEntities={catEntities} setSorting={setSorting} sortConfig={sortConfig} deleteCat={deleteCat}/>}/>
                    <Route path="/:catName" element={<DetailPage catEntities={catEntities}/>} />
                    <Route path="/add" element={<AddPage catEntities={catEntities} addCat={addCat}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;