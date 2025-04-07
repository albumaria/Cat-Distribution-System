import React, {useEffect, useRef} from "react";


const LoadMoreObserver = ({onIntersect, isLoading, hasMore }) => {
    const observerRef = useRef();
    const observerInstance = useRef(null);

    useEffect(() => {
        if (!hasMore) return;

        if (observerInstance.current) {
            observerInstance.current.disconnect();
        }

        observerInstance.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    onIntersect();
                }
            },
            {threshold: 0.1}
        );

        if (observerRef.current) {
            observerInstance.current.observe(observerRef.current);
        }

        return () => {
            if (observerRef["current"]) {
                observerInstance.current.disconnect();
            }
        }

    }, [onIntersect, isLoading, hasMore]);

    if (!hasMore) return null;

    return (
        <div ref={observerRef} style={{display: 'flex', justifyContent: 'center', color: '#51294B', textAlign: 'center', fontSize: '3vh'}}>
            {isLoading && <div> Loading... </div>}
        </div>
    );
}

export default LoadMoreObserver;