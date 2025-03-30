import {useState, useMemo} from "react";

const usePagination = (data, initialPageSize = 9) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.ceil(data.length / pageSize);

    const paginatedData = useMemo(() => {
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [data, currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return {
        paginatedData,
        currentPage,
        pageSize,
        totalPages,
        handlePageChange,
        handlePageSizeChange
    };
};

export default usePagination;