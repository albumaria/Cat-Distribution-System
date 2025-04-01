import React, {useState} from "react";
import "./AddPage.css"
import InputBar from "../../components/input_bars/InputBar";
import InputFileButton from "../../components/buttons/InputFileButton";
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";

const AddPage = ( { catEntities, addCat }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const validateInputs = () => {
        if (!name.trim()) {
            return "Name must be a non-empty string.";
        }
        const isDuplicateName = catEntities.some(cat => cat.name.toLowerCase() === name.toLowerCase());
        if (isDuplicateName) {
            return "A cat with this name already exists.";
        }

        if (!['F', 'M'].includes(gender.toUpperCase())) {
            return "Gender must be 'F' or 'M'.";
        }

        if (!/^\d+$/.test(age) || parseInt(age) < 0 || parseInt(age) > 25) {
            return "Age must be a whole number between 0 and 25.";
        }

        if (!/^\d+(\.\d+)?$/.test(weight) || parseFloat(weight) < 0 || parseFloat(weight) > 30) {
            return "Weight must be a number (e.g., 4.5) between 0 and 30.";
        }

        if (!description.trim()) {
            return "Description cannot be empty.";
        }

        if (!imageUrl) {
            return "You must upload an image.";
        }

        return null;
    };

    const handleAddCat = () => {
        const validationError = validateInputs();

        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");

        const newCat = {id: null, name: name.trim(), gender: gender.toUpperCase(), age: parseInt(age), weight: parseFloat(weight), description: description.trim(), image: imageUrl};

        addCat(newCat);
        navigate('/');
    };



    return (
        <div className="wrapper-add-page">
            <div className="all-rectangles-add-page header-add-page">Add a new kitty</div>

            <div className="all-rectangles-add-page bottom-add-page">
                {error && <div className="error-message-add-page">{error}</div>}
                <InputBar placeHolder="Name" value={name} onChange={(e) => setName(e.target.value)}></InputBar>
                <InputBar placeHolder="Gender (F/M)" value={gender} onChange={(e) => setGender(e.target.value)}></InputBar>
                <InputBar placeHolder="Age" value={age} onChange={(e) => setAge(e.target.value)}></InputBar>
                <InputBar placeHolder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)}></InputBar>
                <InputBar placeHolder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></InputBar>
                <InputFileButton onFileSelect={(url) => setImageUrl(url)}></InputFileButton>

                <Button content="Add Cat" color="#51294B" width="30vw" onClick={handleAddCat}></Button>
            </div>
        </div>
    );
};

export default AddPage;