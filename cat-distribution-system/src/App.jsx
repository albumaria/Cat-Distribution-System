import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import MainPage from "./pages/main_page/MainPage";
import "./index.css";
import DetailPage from "./pages/detail_page/DetailPage";
import AddPage from "./pages/add_page/AddPage"
import useCatData from "./pages/main_page/functionalities/useCatData";
import UpdatePage from "./pages/update_page/UpdatePage";
import MischiefPage from "./pages/mischief_records_page/MischiefPage";

function App() {
    const { catEntities, setSorting, sortConfig, deleteCat, addCat, updateCat, setNameFilter, filterByAge, isOnline, isServerOnline, isGenerating, startGenerator, stopGenerator } = useCatData();

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage catEntities={catEntities} setSorting={setSorting} sortConfig={sortConfig} deleteCat={deleteCat} addCat={addCat} setSearchTerm={setNameFilter} filterByAge={filterByAge} isOnline={isOnline} isServerOnline={isServerOnline} isGenerating={isGenerating} startGenerator={startGenerator} stopGenerator={stopGenerator}/>}/>
                    <Route path="/:catName" element={<DetailPage catEntities={catEntities}/>} />
                    <Route path="/add" element={<AddPage catEntities={catEntities} addCat={addCat}/>}/>
                    <Route path="/update/:catName" element={<UpdatePage catEntities={catEntities} updateCat={updateCat}/>}/>
                    <Route path="/:catName/mischief" element={<MischiefPage catEntities={catEntities}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;