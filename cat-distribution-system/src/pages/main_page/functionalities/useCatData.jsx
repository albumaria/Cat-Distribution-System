import {useMemo, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import CatEntities from '../../../assets/CatEntities';

const useCatData = () => {
    const [catEntities, setCatEntities] = useState(CatEntities);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'none'
    });

    const deleteCat = (selectedCat) => {
        if (!selectedCat) return;

        setCatEntities(prevCats =>
            prevCats.filter(cat => cat.name !== selectedCat.name)
        );
    };

    const addCat = (newCat) => {
        setCatEntities(prevCats => {
            const newCatWithId = { ...newCat, id: uuidv4() };
            return [...prevCats, newCatWithId];
        });
    };

    const updateCat = (oldCat, newCat) => {
        setCatEntities(prevCats =>
            prevCats.map(cat =>
                cat.id === oldCat.id ? newCat : cat
            )
        );
    };


    const sortedEntities = useMemo(() => {
        if (sortConfig.direction === 'none' || !sortConfig.key)
            return catEntities;

        return [...catEntities].sort((a, b) => {
            if (sortConfig.direction === 'ascending') {
                return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
            } else {
                return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
            }
        });
    }, [catEntities, sortConfig]);

    const setSorting = (sortOption) => {
        setSortConfig(sortOption);
    };


    return {
        catEntities: sortedEntities,
        setSorting,
        sortConfig,
        deleteCat,
        addCat,
        updateCat
    };
};

export default useCatData;