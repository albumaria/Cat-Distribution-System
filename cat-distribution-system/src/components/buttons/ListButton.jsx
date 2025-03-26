import "./ListButton.css"
import React from "react";

const ListButton = ({ content, color, onClick }) => {
    return (
        <button onClick={onClick} className="list-button" style={{backgroundColor: color}}>
            {content}
        </button>
    );
};

export default ListButton;