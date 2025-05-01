import "./InputBar.css"
import React from "react";

const InputBar = ( { placeHolder, value, onChange } ) => {
    return (
        <div className="wrapper-input-bar">
            <input className="input-bar" type="text" placeholder={placeHolder} value={value} onChange={onChange}></input>
        </div>
    );

};

export default InputBar;