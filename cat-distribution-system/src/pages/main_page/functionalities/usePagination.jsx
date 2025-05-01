import {useState, useMemo, useEffect} from "react";

const usePagination = (data, initialPageSize = 9) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
    const [loadedCount, setLoadedCount] = useState(initialPageSize);
    const [dataSourceId, setDataSourceId] = useState(Date.now()); // used to see if the data source has changed or not


    // when data length changes, check if the data source changed
    useEffect(() => {
        if (data && data.length > 0) {
            const newDataSourceId = Date.now();
            if (Math.abs(data.length - loadedCount) > 9) {
                setDataSourceId(newDataSourceId);
                if (isInfiniteScroll) {
                    setLoadedCount(initialPageSize);
                }
            }
        }
    }, [data.length]);


    // when switching between modes or when data source changes reset items
    useEffect(() => {
        if (isInfiniteScroll) {
            setLoadedCount(initialPageSize);
        } else {
            const maxPage = Math.max(1, Math.ceil(data.length / pageSize));
            if (currentPage > maxPage && data.length > 0) {
                setCurrentPage(1);
            }
        }
    }, [isInfiniteScroll, dataSourceId]);


    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

    // calculate which data is shown based on the mode
    const paginatedData = useMemo(() => {
        if (isInfiniteScroll) {
            return data.slice(0, loadedCount);
        }
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [data, currentPage, pageSize, isInfiniteScroll, loadedCount]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (newSize) => {
        if (newSize === "infinite") {
            setIsInfiniteScroll(true);
            setLoadedCount(initialPageSize);
        } else {
            setIsInfiniteScroll(false);
            setPageSize(Number(newSize));
            setCurrentPage(1);
        }
    };

    // increment the loadCount by 9 for each scroll down, triggered when the div at the end is in view
    const loadMoreItems = () => {
        if (!isInfiniteScroll || loadedCount >= data.length) return false;
        const newLoadedCount = Math.min(loadedCount + 9, data.length);
        setLoadedCount(newLoadedCount);
        return true;
    };


    return {
        paginatedData,
        currentPage,
        pageSize,
        totalPages,
        handlePageChange,
        handlePageSizeChange,
        isInfiniteScroll,
        loadMoreItems,
        hasMore: isInfiniteScroll && loadedCount < data.length
    };
};

export default usePagination;