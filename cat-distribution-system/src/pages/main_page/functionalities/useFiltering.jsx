import { useState, useMemo } from "react";

const useFiltering = (data) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ageFilter, setAgeFilter] = useState(null);

    const filteredEntities = useMemo(() => {
        return data.filter(entity => {
            const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesAge = ageFilter ? (entity.age >= ageFilter.min && entity.age <= ageFilter.max) : true;
            return matchesSearch && matchesAge;
        });
    }, [data, searchTerm, ageFilter]);

    const filterByAge = (min, max) => {
        if (min === null && max === null) {
            setAgeFilter(null);
        } else {
            setAgeFilter({ min, max });
        }
    };

    return {
        filteredEntities,
        setSearchTerm,
        searchTerm,
        filterByAge
    };
};

export default useFiltering;
