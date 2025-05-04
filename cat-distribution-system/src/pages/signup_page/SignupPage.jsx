import React, {useState} from "react";
import InputBar from "../../components/input_bars/InputBar";
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";
import {addUserBackend} from "../../backend/BackendUserManagement";
import bcrypt from 'bcryptjs';
import PasswordInputBar from "../../components/input_bars/PasswordInputBar";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const validateInputs = () => {
        if (!username || !password || !email) {
            return "All fields are required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Invalid email format.";
        }

        return null;
    };

    const hashPassword = async (plainTextPassword) => {
        const saltRounds = 10;
        return await bcrypt.hash(plainTextPassword, saltRounds);
    }

    const handleSignUp = async () => {
        const validationError = validateInputs();

        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            const hashedPassword = await hashPassword(password);
            const user = {
                username,
                passwordhash: hashedPassword,
                email,
                role: "Regular"
            };

            await addUserBackend(user);
            navigate("/login");
        } catch (error) {
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="wrapper-add-page">
            <div className="all-rectangles-add-page header-add-page">Sign Up</div>

            <div className="all-rectangles-add-page bottom-add-page">
                <InputBar placeHolder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></InputBar>
                <PasswordInputBar placeHolder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></PasswordInputBar>
                <InputBar placeHolder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></InputBar>

                <Button content="Sign Up" color="#51294B" width="30vw" onClick={handleSignUp}></Button>
            </div>
        </div>
    );
};

export default SignupPage;