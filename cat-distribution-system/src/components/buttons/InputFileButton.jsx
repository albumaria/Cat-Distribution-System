import "./InputFileButton.css"
import React, { useState, useRef } from "react";

const InputFileButton = ( { onFileSelect } ) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);  // Create URL from file
            setFileName(file.name);
            onFileSelect(imageUrl);
        }
    };

    return (
        <div className="file-button-container">
            <button className="file-button" onClick={handleClick}>
                Select Image
            </button>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                data-testid="file-input"
            />
            {fileName && <p className="file-name">{fileName}</p>}
        </div>
    );
};

export default InputFileButton;