import React, {useState} from "react";
import "./UpdatePage.css"
import InputBar from "../../components/input_bars/InputBar";
import InputFileButton from "../../components/buttons/InputFileButton";
import Button from "../../components/buttons/Button";
import {useNavigate, useParams} from "react-router-dom";

const UpdatePage = ( { catEntities, updateCat }) => {
    const { catName } = useParams();
    const cat = catEntities.find(cat => cat.name.toLowerCase() === catName.toLowerCase());

    const [name, setName] = useState(cat ? cat.name : "");
    const [gender, setGender] = useState(cat ? cat.gender : "");
    const [age, setAge] = useState(cat ? cat.age : "");
    const [weight, setWeight] = useState(cat ? cat.weight : "");
    const [description, setDescription] = useState(cat ? cat.description : "");
    const [imageUrl, setImageUrl] = useState(cat ? cat.image : "");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const validateInputs = () => {
        if (!name.trim()) {
            return "Name must be a non-empty string.";
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

    const handleUpdateCat = () => {
        const validationError = validateInputs();

        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");

        const newCat = {id: cat.id, name: name.trim(), gender: gender.toUpperCase(), age: parseInt(age), weight: parseFloat(weight), description: description.trim(), image: imageUrl};
        updateCat(cat, newCat);

        navigate('/main');
    };

    if (!cat) {
        return <div>Cat not found</div>;
    }

    return (
        <div className="wrapper-update-page">
            <div className="all-rectangles-update-page header-update-page">Update details for {cat.name}</div>

            <div className="all-rectangles-update-page bottom-update-page">
                {error && <div className="error-message-add-page">{error}</div>}
                <InputBar placeHolder="Name" value={name} onChange={(e) => setName(e.target.value)}></InputBar>
                <InputBar placeHolder="Gender (F/M)" value={gender} onChange={(e) => setGender(e.target.value)}></InputBar>
                <InputBar placeHolder="Age" value={age} onChange={(e) => setAge(e.target.value)}></InputBar>
                <InputBar placeHolder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)}></InputBar>
                <InputBar placeHolder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></InputBar>
                <InputFileButton onFileSelect={(url) => setImageUrl(url)}></InputFileButton>

                <Button content="Update Cat" color="#51294B" width="30vw" onClick={handleUpdateCat}></Button>
            </div>
        </div>
    );
};

export default UpdatePage;