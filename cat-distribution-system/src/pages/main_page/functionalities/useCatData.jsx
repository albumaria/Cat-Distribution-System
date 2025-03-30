import {useCallback, useEffect, useState} from 'react';
import { fetchCats, addCat as apiAddCat, deleteCat as apiDeleteCat, updateCat as apiUpdateCat } from "../../../backend/catService";

const useCatData = () => {
    const [catEntities, setCatEntities] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [ageFilter, setAgeFilter] = useState({minAge: undefined, maxAge: undefined});

    const [sortConfig, setSortConfig] = useState({key: "none", direction: 'ascending'});

    const loadCats = useCallback(async () => {
        try {
            const sortBy = sortConfig.key;
            const ascending = sortConfig.direction === 'ascending';

            const data = await fetchCats(searchTerm, sortBy, ascending, ageFilter.minAge, ageFilter.maxAge);

            setCatEntities(data);
        } catch (error) {
            console.error("Error loading cats:", error);
        }
    }, [searchTerm, ageFilter, sortConfig]);

    useEffect(() => {
        loadCats();
    }, [loadCats]);

    const deleteCat = async (selectedCat) => {
        try {
            await apiDeleteCat(selectedCat.id);
            await loadCats();
        } catch (error) {
            console.error("Error deleting cat:", error);
        }
    };

    const addCat = async (newCat) => {
        try {
            await apiAddCat(newCat);
            await loadCats();
        } catch (error) {
            console.error("Error adding cat:", error);
        }
    };

    const updateCat = async (oldCat, newCat) => {
        try {
            await apiUpdateCat(oldCat.id, newCat);
            await loadCats();
        } catch (error) {
            console.error("Error updating cat:", error);
        }
    };

    const setSorting = (sortOption) => {
        setSortConfig(sortOption);
    };

    const setNameFilter = (term) => {
        setSearchTerm(term);
    };

    const filterByAge = (min, max) => {
        setAgeFilter({
            minAge: min,
            maxAge: max
        });
    };

    return {
        catEntities,
        setSorting,
        sortConfig,
        deleteCat,
        addCat,
        updateCat,
        setNameFilter,
        filterByAge
    };
};

export default useCatData;