import "./FilterBar.css"
import React, { useState } from "react";

const FilterBar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        const newSearchValue = event.target.value;
        setSearchValue(newSearchValue);
        onSearch(newSearchValue);
    };

    return (
        <div className="wrapper-filter-bar">
            <input className="input-filter-bar"
                   type="text"
                   placeholder="Search..."
                   value={searchValue}
                   onChange={handleInputChange}/>
            <svg width="5%" height="70%" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5605 3.67718C21.6576 -1.22573 13.7084 -1.22573 8.80519 3.67718C4.76474 7.71763 4.05717 13.8257 6.67611 18.5939L0.134307 25.136C-0.0447689 25.3151 -0.0447689 25.6057 0.134307 25.7848L4.45261 30.1034C4.63169 30.2825 4.92231 30.2825 5.10138 30.1034L11.6435 23.5613C16.4117 26.1802 22.5198 25.473 26.5602 21.4322C31.4634 16.5293 31.4634 8.58009 26.5605 3.67718ZM12.254 17.9837C9.25573 14.9855 9.25573 10.1242 12.254 7.12598C15.2522 4.12772 20.1135 4.12772 23.1117 7.12598C26.11 10.1242 26.11 14.9855 23.1117 17.9837C20.1135 20.982 15.2522 20.982 12.254 17.9837Z" fill="#51294B"/>
            </svg>

        </div>

    );
};

export default FilterBar;

