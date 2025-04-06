import React from "react";
import "./PageSizeDropdown.css";

const PageSizeDropdown = ({ pageSize, setPageSize, isInfiniteScroll }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        setPageSize(value === "infinite" ? "infinite" : Number(value));
    };

    return (
        <div className="container-page-dropdown">
            <select
                id="pageSize"
                className="page-select-dropdown"
                value={isInfiniteScroll ? "infinite" : pageSize}
                onChange={handleChange}
            >
                <option value={9}>9</option>
                <option value={15}>15</option>
                <option value={21}>21</option>
                <option value={27}>27</option>
                <option value="infinite">all</option>
            </select>
        </div>
    );
};

export default PageSizeDropdown;
