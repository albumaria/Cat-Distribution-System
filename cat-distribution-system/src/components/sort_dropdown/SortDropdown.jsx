import "./SortDropdown.css"
import React from 'react';

const SortDropdown = ({ onSort, currentSort }) => {
    const sortOptions = [
        { label: 'No Sorting', value: { key: null, direction: 'none' } },
        { label: 'Name (A-Z)', value: { key: 'name', direction: 'ascending' } },
        { label: 'Name (Z-A)', value: { key: 'name', direction: 'descending' } },
        { label: 'Age (Low-High)', value: { key: 'age', direction: 'ascending' } },
        { label: 'Age (High-Low)', value: { key: 'age', direction: 'descending' } }
    ];

    return (
        <select className="sort-select-dropdown" value={JSON.stringify(currentSort)} onChange={(e) => onSort(JSON.parse(e.target.value))}>
            {sortOptions.map((option, index) => (
                <option key={index} value={JSON.stringify(option.value)}>
                    {option.label}
                </option>
            ))}

        </select>
    );
};

export default SortDropdown;