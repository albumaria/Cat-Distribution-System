import React from "react";
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
            <span className="cat-name">{cat.name}
                {(cat.age >= 0 && cat.age <= 2) ? <span style={{ color: "#ff95b1" }}> ✿</span> : ""}
                {(cat.age >= 3 && cat.age <= 10) ? <span style={{ color: "#51294B" }}> ✿</span> : ""}
                {(cat.age >= 11 && cat.age <= 35) ? <span style={{ color: "#ffab25" }}> ✿</span> : ""}
            </span>
        </div>
    );
};

export default CatCard;