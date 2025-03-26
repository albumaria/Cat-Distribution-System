import React from "react";
import "./DetailPage.css"
import { useParams } from "react-router-dom";
import CatEntities from "../../assets/CatEntities";

const DetailPage = () => {
    const { catName } = useParams();
    const cat = CatEntities.find(cat => cat.name.toLowerCase() === catName.toLowerCase());

    return (
        <div className="wrapper-detail-page">
            <div className="all-rectangles-detail-page left-detail-page">
                <div className="cat-name-detail-page">{cat.name}</div>
                <div className="cat-extra-detail-page">Age: {cat.age}</div>
                <div className="cat-extra-detail-page">Gender: {cat.gender}</div>
                <div className="cat-extra-detail-page">Weight: {cat.weight}</div>
                <div style={{fontSize:"3vh"}}>{cat.description}</div>
            </div>

            <div className="all-rectangles-detail-page right-detail-page">
                <img src={cat.image} alt={catName}></img>
            </div>
        </div>
    );
};

export default DetailPage;
