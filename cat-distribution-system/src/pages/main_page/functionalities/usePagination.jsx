import {useState, useMemo, useEffect} from "react";

const usePagination = (data, initialPageSize = 9) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);

    // reset pagination when data source changes (infinite scroll or simple pagination)
    // useEffect(() => {
    //     if (isInfiniteScroll) {
    //         //set the displayed items
    //         setDisplayedItems(data.slice(0, loadedCount));
    //     } else {
    //         // normal pagination: make sure the current page is valid
    //         if (currentPage > Math.ceil(data.length / pageSize) && data.length > 0) {
    //             setCurrentPage(1);
    //         }
    //     }
    // }, [data, isInfiniteScroll, loadedCount, currentPage, pageSize]);
    // Thought this was necessary

    // when switching to infinite scroll, set the loaded count and displayed items
    useEffect(() => {
        if (isInfiniteScroll) {
            setLoadedCount(initialPageSize);
            setDisplayedItems(data.slice(0, initialPageSize));
        }
    }, [isInfiniteScroll, data, initialPageSize]);

    const totalPages = Math.ceil(data.length / pageSize);

    // the paginated data is the displayed items for infinite scroll or just a portion of the data for normal pagination
    const paginatedData = useMemo(() => {
        if (isInfiniteScroll) {
            return displayedItems;
        }

        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [data, currentPage, pageSize, isInfiniteScroll, displayedItems]);

    // set current page to the new page when pressing next
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // if the page size changes, initialize stuff for the infinite scroll or for normal pagination
    const handlePageSizeChange = (newSize) => {
        if (newSize === "infinite") {
            setIsInfiniteScroll(true);
            setLoadedCount(initialPageSize);
            setDisplayedItems(data.slice(0, initialPageSize));
        }
        else {
            setIsInfiniteScroll(false);
            setPageSize(newSize);
            setCurrentPage(1);
        }
    };

    // for infinite scroll, load items 9 at a time, set the new loaded count and set the displayed items and the loaded count
    const loadMoreItems = () => {
        if (!isInfiniteScroll || loadedCount >= data.length) {
            return false;
        }

        const newLoadedCount = Math.min(loadedCount + 9, data.length);

        if (newLoadedCount > loadedCount) {
            const nextItems = data.slice(loadedCount, newLoadedCount);

            setDisplayedItems(prevItems => {
                const existingIds = new Set(prevItems.map(item => item.id));
                const uniqueNextItems = nextItems.filter(item => !existingIds.has(item.id));
                return [...prevItems, ...uniqueNextItems];
            });
            setLoadedCount(newLoadedCount);
            return true;
        }
        return false;
    }

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