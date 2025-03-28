import React, {useState} from "react";
import "./MainPage.css"
import CatCard from "../../components/cat_card/CatCard"
import Pagination from "../../components/pagination/Pagination";
import PageSizeDropdown from "../../components/pagination/PageSizeDropdown";
import usePagination from "./functionalities/usePagination";
import ListButton from "../../components/buttons/ListButton";
import {useNavigate} from "react-router-dom";
import useSelectedCat from "./functionalities/useSelectedCat";
import useFiltering from "./functionalities/useFiltering";
import FilterBar from "../../components/input_bars/FilterBar";
import SortDropdown from "../../components/sort_dropdown/SortDropdown";
import Statistics from "../../components/statistics/Statistics";
import useGenerateCats from "./functionalities/useGenerateCats";

const MainPage = ( { catEntities, setSorting, sortConfig, deleteCat, addCat } ) => {
    const { filteredEntities, setSearchTerm, searchTerm, filterByAge } = useFiltering(catEntities);
    const { selectedCat, selectCat } = useSelectedCat();
    const navigate = useNavigate();
    const { paginatedData, currentPage, pageSize, totalPages, handlePageChange, handlePageSizeChange } = usePagination(filteredEntities, 9, searchTerm);
    const [isGenerating, setIsGenerating] = useState(false);

    useGenerateCats(isGenerating, addCat);

    return (
        <div className="main-page-main">

            <div className="all-rectangles-main navbar-main"/>

            <div className="all-rectangles-main title-banner-main">
                <div className="icon-main"><img src="https://i.imgur.com/EBpUlkS.png" style={{width: "100%"}} alt="CatIcon" /></div>
                <div style={{fontSize: "8vh", color: "#51294B"}}>Cat Distribution System</div>
            </div>

            <div  className="all-rectangles-main image-banner-main">
                <div>WHOA</div>
                <img src="https://i.imgur.com/Yx7UrCS.png" style={{width: "50%"}} alt="CatBanner"></img>
            </div>

            <div className="empty-area-main">
                DEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESCRIPTION
            </div>

            <div className="orange-border-container-main">
                <img src="https://i.imgur.com/xt4UO7k.png" alt="orange-border-main"></img>
            </div>

            <div className="filtering-main">
                <SortDropdown onSort={setSorting} currentSort={sortConfig}></SortDropdown>
                <FilterBar onSearch={setSearchTerm}></FilterBar>
            </div>

            <div className="list-container-main">
                <div className="all-rectangles-main buttons-list-main">
                    <ListButton content="Add" color="#F2B45A" onClick={() => navigate(`/add`)}></ListButton>
                    <ListButton content="Delete" color="#F2B45A" disabled={!selectedCat} onClick={() => { deleteCat(selectedCat); selectCat(null);}}></ListButton>
                    <ListButton content="Update" color="#F2B45A" disabled={!selectedCat} onClick={() => { navigate(`/update/${selectedCat.name.toLowerCase()}`); selectCat(null)}}></ListButton>
                    <ListButton content="Show All Cats" color="#FFD5D2"  onClick={() => filterByAge(null, null)}></ListButton>
                    <ListButton content="Show Kittens" color="#FFD5D2" onClick={() => filterByAge(0, 2)}></ListButton>
                    <ListButton content="Show Adult Cats" color="#FFD5D2" onClick={() => filterByAge(3, 10)}></ListButton>
                    <ListButton content="Show Senior Cats" color="#FFD5D2" onClick={() => filterByAge(11, 35)}></ListButton>
                    <ListButton content={isGenerating ? "Stop Generating" : "Start Generating"} color="#FFDD4D" onClick={() => setIsGenerating(!isGenerating)}></ListButton>
                </div>

                <div className="all-rectangles-main cat-list-main">
                    {paginatedData.map((cat) => (
                        <CatCard key={cat.id} cat={cat} onClick={() => selectCat(cat)} isSelected={selectedCat && selectedCat.name === cat.name}/>
                    ))}
                </div>
            </div>

            <div className="pagination-main">
                <PageSizeDropdown pageSize={pageSize} setPageSize={handlePageSizeChange}></PageSizeDropdown>
                <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}></Pagination>
            </div>

            <div className="all-rectangles-main statistics-list-main">
                <Statistics catEntities={catEntities}></Statistics>
            </div>

            <div className="empty-area-main"></div>

            <div className="orange-border-container-main">
                <img src="https://i.imgur.com/j8NIdHK.png" alt="purple-border-main"></img>
            </div>
        </div>
    )
};


export default MainPage;