import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import React from "react";
import MainPage from "./pages/main_page/MainPage";
import "./index.css";
import DetailPage from "./pages/detail_page/DetailPage";
import AddPage from "./pages/add_page/AddPage"
import useCatData from "./pages/main_page/functionalities/useCatData";
import UpdatePage from "./pages/update_page/UpdatePage";
import MischiefPage from "./pages/mischief_records_page/MischiefPage";
import LoginPage from "./pages/login_page/LoginPage";
import SignupPage from "./pages/signup_page/SignupPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import MonitoredUsersPage from "./pages/monitored_users_page/MonitoredUsersPage";
import AdminProtectedRoute from "./components/routing/AdminProtectedRoute";

function App() {
    const { catEntities, setSorting, sortConfig, deleteCat, addCat, updateCat, setNameFilter, filterByAge, isOnline, isServerOnline, isGenerating, startGenerator, stopGenerator } = useCatData();

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login"/>} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/main"
                        element={
                        <ProtectedRoute>
                        <MainPage catEntities={catEntities} setSorting={setSorting} sortConfig={sortConfig} deleteCat={deleteCat} addCat={addCat} setSearchTerm={setNameFilter} filterByAge={filterByAge} isOnline={isOnline} isServerOnline={isServerOnline} isGenerating={isGenerating} startGenerator={startGenerator} stopGenerator={stopGenerator}/>
                        </ProtectedRoute>
                        }
                    />
                    <Route path="/:catName" element={<ProtectedRoute><DetailPage catEntities={catEntities}/></ProtectedRoute>} />
                    <Route path="/add" element={<ProtectedRoute><AddPage catEntities={catEntities} addCat={addCat}/></ProtectedRoute>}/>
                    <Route path="/update/:catName" element={<ProtectedRoute><UpdatePage catEntities={catEntities} updateCat={updateCat}/></ProtectedRoute>}/>
                    <Route path="/:catName/mischief" element={<ProtectedRoute><MischiefPage catEntities={catEntities}/></ProtectedRoute>} />
                    <Route path="/monitoredUsers" element={<AdminProtectedRoute><MonitoredUsersPage/></AdminProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;