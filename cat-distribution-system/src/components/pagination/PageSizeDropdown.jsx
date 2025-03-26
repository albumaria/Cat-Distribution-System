import React from "react";
import "./PageSizeDropdown.css";

const PageSizeDropdown = ({ pageSize, setPageSize }) => {
    return (
        <div className="container-dropdown">
            <select
                id="pageSize"
                className="dropdown-select"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                <option value={3}>3</option>
                <option value={9}>9</option>
                <option value={15}>15</option>
                <option value={21}>21</option>
                <option value={27}>27</option>
            </select>
        </div>
    );
};

export default PageSizeDropdown;
