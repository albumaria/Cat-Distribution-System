import "./InputBar.css"
import React from "react";

const PasswordInputBar = ( { placeHolder, value, onChange } ) => {
    return (
        <div className="wrapper-input-bar">
            <input className="input-bar" type="password" placeholder={placeHolder} value={value} onChange={onChange}></input>
        </div>
    );

};

export default PasswordInputBar;