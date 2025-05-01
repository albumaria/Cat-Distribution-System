import "./MischiefButton.css"
import React from "react";

const MischiefButton = ({ content, color, width, onClick }) => {
    return (
        <button onClick={onClick} className="mischief-button" style={{backgroundColor: color, width: width}}>
            {content}
        </button>
    );
};

export default MischiefButton;