import { useState } from 'react';

const useSelectedCat = () => {
    const [selectedCat, setSelectedCat] = useState(null);

    const selectCat = (cat) => {
        setSelectedCat(cat);
    };



    return {
        selectedCat,
        selectCat,
    };
};

export default useSelectedCat;
