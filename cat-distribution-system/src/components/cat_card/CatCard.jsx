import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./CatCard.css"

const CatCard = ({ cat, onClick, isSelected }) => {
    const navigate = useNavigate();

    const handleDoubleClick = () => {
        navigate(`/${cat.name.toLowerCase()}`);
    };

    return (
        <div className={`cat-card ${isSelected ? "selected" : ""}`} onClick={onClick} onDoubleClick={handleDoubleClick}>
            <img src={cat.image} alt={cat.name} className="cat-image"/>
            <span className="cat-name">{cat.name}</span>
        </div>
    );
};

export default CatCard;