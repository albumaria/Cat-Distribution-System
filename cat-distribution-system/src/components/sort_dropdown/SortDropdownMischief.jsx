import React from 'react';
import './SortDropdownMischief.css';

const SortDropdownMischief = ({ onSortChange, onWasCaughtChange, currentSort, currentWasCaught }) => {
    const sortOptions = [
        { label: 'No Sorting', value: { sortBy: null, ascending: null } },
        { label: 'Severity (Low-High)', value: { sortBy: 'severity', ascending: true } },
        { label: 'Severity (High-Low)', value: { sortBy: 'severity', ascending: false } },
        { label: 'Description (A-Z)', value: { sortBy: 'description', ascending: true } },
        { label: 'Description (Z-A)', value: { sortBy: 'description', ascending: false } },
    ];

    const wasCaughtOptions = [
        { label: 'All', value: null },
        { label: 'Caught', value: true },
        { label: 'Not Caught', value: false },
    ];

    return (
        <div className="sort-dropdown-wrapper">
            <select
                className="sort-select-mischief-dropdown-first"
                value={JSON.stringify(currentSort)}
                onChange={(e) => onSortChange(JSON.parse(e.target.value))}
            >
                {sortOptions.map((option, index) => (
                    <option key={index} value={JSON.stringify(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>

            <select
                className="sort-select-mischief-dropdown-second"
                value={JSON.stringify(currentWasCaught)}
                onChange={(e) => onWasCaughtChange(JSON.parse(e.target.value))}
            >
                {wasCaughtOptions.map((option, index) => (
                    <option key={index} value={JSON.stringify(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdownMischief;
