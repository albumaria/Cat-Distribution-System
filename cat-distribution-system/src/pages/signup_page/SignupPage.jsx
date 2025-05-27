import React, {useState} from "react";
import InputBar from "../../components/input_bars/InputBar";
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";
import {addUserBackend} from "../../backend/BackendUserManagement";
import PasswordInputBar from "../../components/input_bars/PasswordInputBar";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [passwordhash, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const validateInputs = () => {
        if (!username || !passwordhash || !email) {
            return "All fields are required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email format.";
        }

        return null;
    };

    const handleSignUp = async () => {
        const validationError = validateInputs();

        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            const user = {
                username,
                passwordhash, // Send as password instead of passwordhash
                email,
                role: "Regular",
                isMonitored: false
            };
            console.log('handleSignUp: Attempting to register user:', username);

            const response = await addUserBackend(user);
            if (response) {
                alert("Registration successful! Please login.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="wrapper-add-page">
            <div className="all-rectangles-add-page header-add-page">Sign Up</div>

            <div className="all-rectangles-add-page bottom-add-page">
                <InputBar placeHolder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></InputBar>
                <PasswordInputBar placeHolder="Password" value={passwordhash} onChange={(e) => setPassword(e.target.value)}></PasswordInputBar>
                <InputBar placeHolder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></InputBar>

                <Button content="Sign Up" color="#51294B" width="30vw" onClick={handleSignUp}></Button>
            </div>
        </div>
    );
};

export default SignupPage;