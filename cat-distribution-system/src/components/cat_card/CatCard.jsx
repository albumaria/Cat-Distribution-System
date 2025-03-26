import React from "react";
import { useNavigate } from "react-router-dom";
import "./CatCard.css"

const CatCard = ({ cat }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${cat.name.toLowerCase()}`);
    };

    return (
        <div className="cat-card" onClick={handleClick}>
            <img src={cat.image} alt={cat.name} className="cat-image"/>
            <span className="cat-name">{cat.name}</span>
        </div>
    );
};

export default CatCard;