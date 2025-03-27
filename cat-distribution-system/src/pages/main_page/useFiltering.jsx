import { useState, useMemo } from "react";

const useFiltering = (data) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEntities = useMemo(() => {
        return data.filter(entity =>
            entity.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    return {
        filteredEntities,
        setSearchTerm,
        searchTerm
    };
};

export default useFiltering;