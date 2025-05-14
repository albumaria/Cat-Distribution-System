import {useCallback, useEffect, useState} from 'react';
import { fetchCatsBackend, checkBackendStatus, addCatBackend, deleteCatBackend, updateCatBackend } from "../../../backend/BackendCatManagement";
import { fetchCatsFrontend, addCatFrontend, deleteCatFrontend, updateCatFrontend } from "../../../frontend/frontendCatManagement";
import CatEntities from "../../../assets/CatEntities";
import useWebSocket from "./useWebSocket";
import {getUser, setUser} from "../../../utils/UserSession";

const useCatData = () => {
    const [isOnline, setOnlineStatus] = useState(navigator.onLine);
    const [isServerOnline, setServerStatus] = useState(true);

    const [catEntities, setCatEntities] = useState([]);
    const [localCats, setLocalCats] = useState([...CatEntities]);

    const [user, setUserState] = useState(getUser());

    const [searchTerm, setSearchTerm] = useState("");
    const [ageFilter, setAgeFilter] = useState({minAge: undefined, maxAge: undefined});
    const [sortConfig, setSortConfig] = useState({key: "none", direction: 'ascending'});

    const [operationQueue, setOperationQueue] = useState([]);

    const {
        connected: wsConnected,
        subscribe,
        unsubscribe,
        isGenerating,
        startGenerator,
        stopGenerator
    } = useWebSocket('http://localhost:8080/ws-cats')

    useEffect(() => {
        const checkUser = () => {
            const current = getUser();
            setUser(current);
            setUserState(current);
        };

        checkUser();
        const interval = setInterval(checkUser, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (user) {
            loadCats();
        }
    }, [user]);

    useEffect(() => {
        const handleOnline = () => setOnlineStatus(true);
        const handleOffline = () => setOnlineStatus(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const serverStatus = await checkBackendStatus();
            setServerStatus(serverStatus);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (wsConnected && isServerOnline) {
            subscribe('/topic/cats', (newCat) => {
                console.log('New cat received via WebSocket:', newCat);
            });

            subscribe('/topic/cats-list', (updatedCats) => {
                console.log('Updated cat list received via WebSocket:', updatedCats);
                setCatEntities(updatedCats);
                setLocalCats(updatedCats);
            });
        }

        return () => {
            if (wsConnected) {
                unsubscribe('/topic/cats');
                unsubscribe('/topic/cats-list');
            }
        };
    }, [wsConnected, isServerOnline, subscribe, unsubscribe]);

    const loadCats = useCallback(async () => {
        try {
            if(isOnline && isServerOnline) {
                const data = await fetchCatsBackend(searchTerm, sortConfig.key, sortConfig.direction === 'ascending', ageFilter.minAge, ageFilter.maxAge, getUser());
                setCatEntities(data);
                setLocalCats(data);
            }
            else {
                const allCats = fetchCatsFrontend(localCats, searchTerm, ageFilter, sortConfig);

                const currentUser = getUser();
                if (currentUser) {
                    const filteredCats = allCats.filter(cat =>
                        cat.user && cat.user.id === currentUser.id
                    );
                    setCatEntities(filteredCats);
                } else {
                    setCatEntities(allCats);
                }
            }
        } catch (error) {
            console.error("Error loading cats:", error);
        }
    }, [ searchTerm, ageFilter, sortConfig, isOnline, isServerOnline, localCats ]);

    // load the cats with a delay of 500ms, and stop the get requests if the page is not visible
    useEffect(() => {
        let timeoutId = null;

        if (document.visibilityState === 'visible') {
            timeoutId = setTimeout(() => {
                loadCats();
            }, 100);
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                timeoutId = setTimeout(() => {
                    loadCats();
                }, 100);
            } else {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [loadCats]);

    useEffect(() => {
        const syncOfflineOps = async () => {
            if (isOnline && isServerOnline && operationQueue.length > 0) {
                const backendCats = await fetchCatsBackend();

                const nameToIdMap = {};
                backendCats.forEach(cat => {
                    nameToIdMap[cat.name] = cat.id;
                });

                for (const op of operationQueue) {
                    try {
                        switch (op.type) {
                            case 'add':
                                await addCatBackend(op.data);
                                break;
                            case 'delete':
                                await deleteCatBackend(nameToIdMap[op.data.name]);
                                break;
                            case 'update':
                                await updateCatBackend(nameToIdMap[op.data.oldCat.name], op.data.newCat);
                                break;
                            default:
                                console.warn("Unknown operation:", op);
                        }
                    } catch (err) {
                        console.error("Failed to sync op:", op, err);
                    }
                }
                await loadCats();
            }
        };

        syncOfflineOps();
    }, [ isOnline, isServerOnline ]);


    const addCat = async (newCat) => {
        try {
            if (isOnline && isServerOnline) {
                await addCatBackend(newCat);
                await loadCats();
            }
            else {
                const updated = addCatFrontend(localCats, newCat);
                setLocalCats(updated);

                const op = { type: 'add', data: newCat };
                setOperationQueue([...operationQueue, op]);
            }
        } catch (error) {
            console.error("Error adding cat:", error);
        }
    };

    const deleteCat = async (selectedCat) => {
        try {
            if (isOnline && isServerOnline) {
                await deleteCatBackend(selectedCat.id);
                await loadCats();
            }
            else {
                const updated = deleteCatFrontend(localCats, selectedCat.id);
                setLocalCats(updated);

                const op = { type: 'delete', data: selectedCat };
                setOperationQueue([...operationQueue, op]);
            }
        } catch (error) {
            console.error("Error deleting cat:", error);
        }
    };

    const updateCat = async (oldCat, newCat) => {
        try {
            if (isOnline && isServerOnline) {
                await updateCatBackend(oldCat.id, newCat);
                await loadCats();
            }
            else {
                const updated = updateCatFrontend(localCats, oldCat.id, newCat);
                setLocalCats(updated);

                const op = { type: 'update', data: { oldCat, newCat } };
                setOperationQueue([...operationQueue, op]);
            }
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
        filterByAge,
        isOnline,
        isServerOnline,
        isGenerating,
        startGenerator,
        stopGenerator
    };
};

export default useCatData;