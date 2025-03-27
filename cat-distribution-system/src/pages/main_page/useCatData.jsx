import {useMemo, useState} from 'react';
import CatEntities from '../../assets/CatEntities';

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
            const lastId = prevCats.length > 0 ? prevCats[prevCats.length - 1].id : 0;
            return [...prevCats, { ...newCat, id: lastId + 1 }];
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