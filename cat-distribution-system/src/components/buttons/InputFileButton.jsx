import "./InputFileButton.css"
import React, { useState, useRef } from "react";

const InputFileButton = ( { onFileSelect, onUploadStart } ) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            if (onUploadStart) {
                onUploadStart();
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result.split(",")[1]; // Keep base64 only

                const formData = new FormData();
                formData.append("image", base64);

                try {
                    const response = await fetch("https://api.imgbb.com/1/upload?key=9b763fed49074f52349c4a1826db3f91", {
                        method: "POST",
                        body: formData,
                    });

                    const data = await response.json();
                    if (data.success) {
                        const imageUrl = data.data.url;
                        onFileSelect(imageUrl);
                    } else {
                        console.error("ImgBB upload failed:", data);
                    }
                } catch (error) {
                    console.error("Error uploading to ImgBB:", error);
                }
            };

            reader.readAsDataURL(file);
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