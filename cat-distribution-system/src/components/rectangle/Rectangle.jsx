import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import "./Rectangle.css";


function Rectangle( {color, width, height}) {
    return (
        <div style={{backgroundColor:color, width:width, height: height}}>
        </div>
    );
}


export default Rectangle;