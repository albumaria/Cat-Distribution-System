import React from "react";
import "./DetailPage.css"
import { useParams } from "react-router-dom";
import {downloadCatImage} from "../../backend/backendFileManagement";
import Button from "../../components/buttons/Button";

const DetailPage = ({catEntities}) => {
    const { catName } = useParams();
    const cat = catEntities.find(cat => cat.name.toLowerCase() === catName.toLowerCase());

    const handleDownloadImage = async () => {
        try {
            await downloadCatImage(cat.id, cat.name);
        } catch (error) {
            console.error("Failed to download image:", error);
        }
    };

    return (
        <div className="wrapper-detail-page">
            <div className="all-rectangles-detail-page left-detail-page">
                <div className="cat-name-detail-page">{cat.name}</div>
                <div className="cat-extra-detail-page">Age: {cat.age}</div>
                <div className="cat-extra-detail-page">Gender: {cat.gender}</div>
                <div className="cat-extra-detail-page">Weight: {cat.weight}</div>
                <div style={{fontSize:"3vh", marginBottom:"5vh"}}>{cat.description}</div>
                <Button content="Download Image" color="#51294B" width="20vw" onClick={handleDownloadImage}></Button>
            </div>

            <div className="all-rectangles-detail-page right-detail-page">
                <img src={cat.image} alt={catName}></img>
            </div>
        </div>
    );
};

export default DetailPage;
