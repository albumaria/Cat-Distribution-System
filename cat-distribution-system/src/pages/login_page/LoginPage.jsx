import React, {useState} from "react";
import InputBar from "../../components/input_bars/InputBar";
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";
import {getUserBackend, loginUserBackend} from "../../backend/BackendUserManagement";
import bcrypt from "bcryptjs";
import PasswordInputBar from "../../components/input_bars/PasswordInputBar";
import {setUser} from "../../utils/UserSession";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const validateInputs = () => {
        if (!username || !password ) {
            return "All fields are required.";
        }

        return null;
    };

    const handleLogIn = async () => {
        const validationError = validateInputs();

        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            const response = await loginUserBackend(username, password);
            
            if (response && response.token && response.user) {
                localStorage.setItem("token", response.token);
                setUser(response.user);
                navigate("/main");
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + (error.response?.data?.error || "Invalid username or password"));
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="wrapper-add-page">
            <div className="all-rectangles-add-page header-add-page">Log In</div>

            <div className="all-rectangles-add-page bottom-add-page">
                <InputBar placeHolder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></InputBar>
                <PasswordInputBar placeHolder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></PasswordInputBar>

                <Button content="Log In" color="#51294B" width="30vw" onClick={handleLogIn}></Button>
                <Button content="Sign Up" color="#51294B" width="30vw" onClick={handleSignUp}></Button>
            </div>
        </div>
    );
};

export default LoginPage;