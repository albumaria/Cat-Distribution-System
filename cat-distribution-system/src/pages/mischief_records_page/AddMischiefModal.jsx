import React, { useState } from "react";
import "./AddMischiefModal.css";
import MischiefButton from "../../components/buttons/MischiefButton";

const AddMischiefModal = ({ onClose, onSubmit }) => {
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
    const [wasCaught, setWasCaught] = useState(false);

    const handleSubmit = () => {
        if (description && severity !== "") {
            onSubmit({
                description,
                severity: parseInt(severity),
                was_caught: wasCaught,
            });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{fontSize: "3vh"}}>Add Mischief Record</h2>
                <label style={{fontSize: "2vh"}}>Description:</label>
                <input style={{backgroundColor: "#FFD5D2", border: "none", outline: "none"}} value={description} onChange={(e) => setDescription(e.target.value)} />

                <label style={{fontSize: "2vh"}}>Severity:</label>
                <input style={{backgroundColor: "#FFD5D2", border: "none", outline: "none"}} type="number" value={severity} onChange={(e) => setSeverity(e.target.value)} />

                <label style={{fontSize: "2vh"}}>Was Caught:</label>
                <select style={{backgroundColor: "#FFD5D2", marginBottom:"1vh", border: "none", outline: "none"}} value={wasCaught} onChange={(e) => setWasCaught(e.target.value === "true")}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <div className="modal-buttons">
                    <MischiefButton content="✓" color="#197314" width="4vw" onClick={handleSubmit} />
                    <MischiefButton content="×" color="#731414" width="4vw" onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default AddMischiefModal;
