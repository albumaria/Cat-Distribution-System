import React, {useState} from "react";
import InputBar from "../../components/input_bars/InputBar";
import Button from "../../components/buttons/Button";
import {useNavigate} from "react-router-dom";
import {getUserBackend} from "../../backend/backendUserManagement";
import bcrypt from "bcryptjs";
import PasswordInputBar from "../../components/input_bars/PasswordInputBar";

const LoginPage = ( { catEntities, addCat }) => {
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

        const user = await getUserBackend(username);

        if (!user || user.username === "USER_NOT_FOUND") {
            alert("Invalid username");
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordhash);

        if (!isMatch) {
            alert("Invalid password");
            return;
        }

        navigate('/main');
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