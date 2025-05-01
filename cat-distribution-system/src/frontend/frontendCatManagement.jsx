import { v4 as uuidv4 } from 'uuid';

export const fetchCatsFrontend = (localCats, searchTerm, ageFilter, sortConfig) => {
    let filteredCats = [...localCats];

    if (searchTerm) {
        filteredCats = filteredCats.filter(cat =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (ageFilter.minAge !== undefined) {
        filteredCats = filteredCats.filter(cat => cat.age >= ageFilter.minAge);
    }

    if (ageFilter.maxAge !== undefined) {
        filteredCats = filteredCats.filter(cat => cat.age <= ageFilter.maxAge);
    }

    if (sortConfig.key !== 'none') {
        filteredCats.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    return filteredCats;
};

export const addCatFrontend = (localCats, catData) => {
    catData.id = uuidv4();
    return [...localCats, catData];
};

export const deleteCatFrontend = (localCats, id) => {
    return localCats.filter(cat => cat.id !== id);
};

export const updateCatFrontend = (localCats, id, catData) => {
    return localCats.map(cat => cat.id === id ? { ...cat, ...catData } : cat);
};

