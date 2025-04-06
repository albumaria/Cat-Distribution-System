import React, {useEffect, useRef} from "react";


const LoadMoreObserver = ({onIntersect, isLoading, hasMore }) => {
    // this component will be placed at the end of the list, and has this reference which will be observed by the observer
    const observerRef = useRef();

    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    onIntersect();
                }
            },
        );

        // start observing the element
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        // stop the observer when the component is not in the page anymore (finished loading all)
        return () => {
            if (observerRef["current"]) {
                observer.unobserve(observerRef["current"]);
            }
        }

    }, [onIntersect, isLoading, hasMore]);

    if (!hasMore && !isLoading) return null;

    return (
        <div ref={observerRef} style={{display: 'flex', justifyContent: 'center', color: '#51294B', textAlign: 'center', fontSize: '3vh'}}>
            {isLoading && <div> Loading... </div>}
        </div>
    );
}

export default LoadMoreObserver;