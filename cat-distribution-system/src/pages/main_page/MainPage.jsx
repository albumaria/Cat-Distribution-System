import React, {useState} from "react";
import "./MainPage.css"
import CatCard from "../../components/cat_card/CatCard"
import LoadMoreObserver from "../../components/cat_card/LoadMoreObserver"
import Pagination from "../../components/pagination/Pagination";
import PageSizeDropdown from "../../components/pagination/PageSizeDropdown";
import usePagination from "./functionalities/usePagination";
import ListButton from "../../components/buttons/ListButton";
import {useNavigate} from "react-router-dom";
import useSelectedCat from "./functionalities/useSelectedCat";
import FilterBar from "../../components/input_bars/FilterBar";
import SortDropdown from "../../components/sort_dropdown/SortDropdown";
import Statistics from "../../components/statistics/Statistics";
import useGenerateCats from "./functionalities/useGenerateCats";

const MainPage = ( { catEntities, setSorting, sortConfig, deleteCat, addCat, setSearchTerm, filterByAge, isOnline, isServerOnline, isGenerating, startGenerator, stopGenerator } ) => {
    const { selectedCat, selectCat } = useSelectedCat();
    const navigate = useNavigate();
    const [isGeneratingFrontend, setIsGeneratingFrontend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { paginatedData, currentPage, pageSize, totalPages, handlePageChange, handlePageSizeChange, isInfiniteScroll, loadMoreItems, hasMore } = usePagination(catEntities, 9);

    useGenerateCats(isGeneratingFrontend, addCat);

    const handleToggleGeneration = () => {
        const useFrontend = !isOnline || !isServerOnline;

        if (useFrontend) {
            setIsGeneratingFrontend(prev => !prev);
        } else {
            if (isGenerating) {
                stopGenerator();
            } else {
                startGenerator();
            }
        }
    };

    // simulate the load of items with a little delay of 1 ms
    const handleLoadMore = () => {
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            loadMoreItems();
            setIsLoading(false);
        }, 100);
    }

    return (
        <div className="main-page-main">
            <div className="all-rectangles-main navbar-main">
                <a href="https://github.com/albumaria/Cat-Distribution-System/tree/main">
                    <div className="navbar-project-link-main">Purroject link 🩷</div>
                </a>
                <div style={{width: "2vw", marginLeft: "0.5vw"}}><img src="https://i.imgur.com/DXtd1ZV.png" alt="github-icon"/></div>
            </div>

            <div className="all-rectangles-main title-banner-main">
                <div className="icon-main"><img src="https://i.imgur.com/EBpUlkS.png" style={{width: "100%"}} alt="CatIcon" /></div>
                <div style={{fontSize: "8vh", color: "#51294B"}}>Cat Distribution System</div>
            </div>

            <div className="all-rectangles-main image-banner-main">
                <div className="image-banner-text-main">
                    <div style={{fontSize: "8vh", marginBottom: "5vh"}}>Find Your Perfect Cat Today!</div>
                    <div style={{fontSize: "3vh", color: "#f4a2b8"}}>Our mission? To match you with your purr-fect furry soulmate! ⋆˚🐈˖°</div>
                </div>
                <img src="https://i.imgur.com/KPAHHrY.png" style={{width: "50%"}} alt="CatBanner"></img>
            </div>

            <div className="empty-area-main">
                <div style={{fontSize: "7vh"}}>How do we reach our objective?</div>
                <div style={{fontSize: "3vh", color: "#f38fa6"}}>
                    Our expert assistants and tailored questionnaire make finding your ideal feline companion effortless. But it’s not just about you—we’re also dedicated to helping each cat find their purr-fect human match.</div>
                <div style={{fontSize: "4vh", color: "#51294B", marginLeft: "8vw", marginRight: "8vw"}}>
                    Because every kitty deserves a loving home, and every home deserves the right kitty! 😺</div>
            </div>

            <div className="orange-border-container-main">
                <div className="orange-border-quiz-button-main">Take the Quiz Now! ⋆˚🐾˖°</div>
            </div>

            <div className="filtering-main">
                <SortDropdown onSort={setSorting} currentSort={sortConfig}></SortDropdown>
                <div className="server-status-main">
                    <div>Server:<>{!isServerOnline ? '🔴' : '🟢'}</></div>
                    <div>Network:<>{!isOnline ? '🔴' : '🟢'}</></div>
                </div>
                <FilterBar onSearch={setSearchTerm}></FilterBar>
            </div>

            <div className="list-container-main">
                <div className="all-rectangles-main buttons-list-main">
                    <ListButton content="Add" color="#F2B45A" onClick={() => navigate(`/add`)}></ListButton>
                    <ListButton content="Delete" color="#F2B45A" disabled={!selectedCat} onClick={() => { deleteCat(selectedCat); selectCat(null);}}></ListButton>
                    <ListButton content="Update" color="#F2B45A" disabled={!selectedCat} onClick={() => { navigate(`/update/${selectedCat.name.toLowerCase()}`); selectCat(null)}}></ListButton>
                    <ListButton content="Show All Cats" color="#FFD5D2"  onClick={() => filterByAge(-1, 35)}></ListButton>
                    <ListButton content={<> Show Kittens <span style={{ color: "#ff95b1" }}> ✿</span> </>} color="#FFD5D2" onClick={() => filterByAge(0, 2)}></ListButton>
                    <ListButton content={<> Show Adult Cats <span style={{ color: "#51294BFF" }}> ✿</span> </>} color="#FFD5D2" onClick={() => filterByAge(3, 10)}></ListButton>
                    <ListButton content={<> Show Senior Cats <span style={{ color: "#ffab25" }}> ✿</span> </>} color="#FFD5D2" onClick={() => filterByAge(11, 35)}></ListButton>
                    <ListButton
                        content={
                            (!isOnline || !isServerOnline)
                                ? (isGeneratingFrontend ? "Stop GeneratingF" : "Start GeneratingF")
                                : (isGenerating ? "Stop GeneratingB" : "Start GeneratingB")
                        }
                        color={
                            (!isOnline || !isServerOnline)
                                ? (isGeneratingFrontend ? "#FFDD4D" : "#f4a2b8")
                                : (isGenerating ? "#FFDD4D" : "#f4a2b8")
                        }
                        onClick={handleToggleGeneration}>
                    </ListButton>
                </div>

                <div className="all-rectangles-main cat-list-main">
                    {paginatedData.map((cat) => (
                        <CatCard key={cat.id} cat={cat} onClick={() => selectCat(cat)} isSelected={selectedCat && selectedCat.id === cat.id}/>
                    ))}

                    {isInfiniteScroll && <LoadMoreObserver onIntersect={handleLoadMore} isLoading={isLoading} hasMore={hasMore}></LoadMoreObserver>}
                </div>
            </div>

            <div className="pagination-main">
                <PageSizeDropdown pageSize={pageSize} setPageSize={handlePageSizeChange} isInfiniteScroll={isInfiniteScroll}></PageSizeDropdown>
                {!isInfiniteScroll &&
                    <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}></Pagination>
                }
            </div>

            <div className="all-rectangles-main statistics-list-main">
                <Statistics catEntities={catEntities}></Statistics>
            </div>

            <div className="empty-area-main"></div>

            <div className="purple-border-container-main">
                <img src="https://i.imgur.com/j8NIdHK.png" alt="purple-border-main"></img>
            </div>
        </div>
    )
};


export default MainPage;