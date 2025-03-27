import "./Button.css"
import React from "react";

const Button = ({ content, color, width, onClick }) => {
    return (
        <button onClick={onClick} className="button" style={{backgroundColor: color, width: width}}>
            {content}
        </button>
    );
};

export default Button;