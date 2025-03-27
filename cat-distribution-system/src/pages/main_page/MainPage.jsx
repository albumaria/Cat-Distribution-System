import React from "react";
import "./MainPage.css"
import CatCard from "../../components/cat_card/CatCard"
import Pagination from "../../components/pagination/Pagination";
import PageSizeDropdown from "../../components/pagination/PageSizeDropdown";
import usePagination from "./usePagination";
import ListButton from "../../components/buttons/ListButton";
import {useNavigate} from "react-router-dom";
import useSelectedCat from "./useSelectedCat";
import useFiltering from "./useFiltering";
import FilterBar from "../../components/input_bars/FilterBar";
import SortDropdown from "../../components/sort_dropdown/SortDropdown";

const MainPage = ( { catEntities, setSorting, sortConfig, deleteCat } ) => {
    const { filteredEntities, setSearchTerm, searchTerm } = useFiltering(catEntities);
    const { selectedCat, selectCat } = useSelectedCat();
    const navigate = useNavigate();
    const { paginatedData, currentPage, pageSize, totalPages, handlePageChange, handlePageSizeChange } = usePagination(filteredEntities, 9, searchTerm);


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
                <svg width="100%" height="100%" viewBox="0 0 1754 358" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_113_192)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 59.0909V60.6064V330C4 341.046 12.9543 350 24 350H604.79H1612.21H1730C1741.05 350 1750 341.046 1750 330V56.3288C1749.94 57.2439 1749.89 58.1648 1749.87 59.0909H1749.83C1749.04 27.1562 1723.27 1.51544 1691.6 1.51544C1659.93 1.51544 1634.16 27.1562 1633.36 59.0909H1633.33C1632.53 27.1562 1606.77 1.51544 1575.09 1.51544C1575.02 1.51544 1574.95 1.51556 1574.88 1.51581L1574.8 1.51556L1574.68 1.51544C1562.25 1.51544 1550.74 5.56152 1541.34 12.441C1527.59 22.3752 1518.27 38.2175 1516.99 56.3164C1516.79 53.5022 1516.4 50.7426 1515.82 48.0513C1510.73 20.6924 1487.04 0 1458.59 0C1427.56 0 1402.2 24.6032 1400.43 55.625C1397.94 25.3212 1372.9 1.51544 1342.38 1.51544L1342.23 1.51562L1342.08 1.51544C1311.33 1.51544 1286.15 25.6766 1283.98 56.3022C1281.83 25.6766 1256.96 1.51544 1226.6 1.51544C1226.19 1.51544 1225.78 1.51981 1225.37 1.5285C1224.96 1.51981 1224.55 1.51544 1224.14 1.51544C1196.64 1.51544 1173.59 20.8442 1167.47 46.8391C1161.36 20.8442 1138.31 1.51544 1110.81 1.51544C1110.28 1.51544 1109.75 1.52267 1109.22 1.53702C1108.69 1.52267 1108.16 1.51544 1107.63 1.51544C1080.13 1.51544 1057.08 20.8437 1050.97 46.8381C1044.85 20.8437 1021.8 1.51544 994.302 1.51544C993.889 1.51544 993.476 1.51981 993.065 1.5285C992.658 1.51981 992.251 1.51544 991.842 1.51544C963.726 1.51544 940.321 22.2293 935.303 49.6092C930.831 21.4818 906.786 0 877.796 0C862.9 0 849.31 5.67145 839.01 15.0017C828.52 23.7797 821.111 36.2096 818.673 50.3728C813.895 22.6153 790.022 1.51544 761.29 1.51544C760.999 1.51544 760.709 1.51761 760.42 1.52191C760.13 1.51761 759.84 1.51544 759.549 1.51544C728.799 1.51544 703.614 25.6836 701.447 56.3155C699.28 25.6836 674.095 1.51544 643.346 1.51544L643.194 1.51562L643.043 1.51544C612.293 1.51544 587.108 25.6843 584.941 56.3168C582.775 25.6843 557.589 1.51544 526.839 1.51544C495.166 1.51544 469.397 27.1563 468.605 59.0909H468.568C467.785 27.1563 442.334 1.51544 411.052 1.51544C379.771 1.51544 354.32 27.1563 353.537 59.0909H353.5C352.707 27.1563 326.938 1.51544 295.265 1.51544C263.593 1.51544 237.824 27.1563 237.031 59.0909H236.993C236.201 27.1563 210.432 1.51544 178.759 1.51544C147.086 1.51544 121.317 27.1563 120.525 59.0909H120.487C119.695 27.1563 93.9259 1.51544 62.2531 1.51544C30.5803 1.51544 4.81128 27.1563 4.0188 59.0909H4Z" fill="#F2B45A"/>
                    </g>
                </svg>
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

            <div className="all-rectangles-main statistics-list-main"></div>

            <div className="empty-area-main"></div>

            <div className="orange-border-container-main">
                <svg width="100%" height="100%" viewBox="0 0 1754 346" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_113_192)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 57.0649V58.5284V318C4 329.046 12.9543 338 24 338H604.79H1612.21H1730C1741.05 338 1750 329.046 1750 318V54.3975C1749.94 55.2812 1749.89 56.1705 1749.87 57.0649H1749.83C1749.04 26.2252 1723.27 1.46344 1691.6 1.46344C1659.93 1.46344 1634.16 26.2252 1633.36 57.0649H1633.33C1632.53 26.2252 1606.77 1.46344 1575.09 1.46344L1574.88 1.46381L1574.68 1.46344C1562.25 1.46344 1550.74 5.37082 1541.34 12.0144C1527.59 21.6079 1518.27 36.9071 1516.99 54.3855C1516.79 51.6678 1516.4 49.0028 1515.82 46.4038C1510.73 19.9829 1487.04 0 1458.59 0C1427.56 0 1402.2 23.7596 1400.43 53.7178C1397.94 24.453 1372.9 1.46344 1342.38 1.46344L1342.23 1.46362L1342.08 1.46344C1311.33 1.46344 1286.15 24.7962 1283.98 54.3718C1281.83 24.7962 1256.96 1.46344 1226.6 1.46344C1226.19 1.46344 1225.78 1.46768 1225.37 1.47607C1224.96 1.46768 1224.55 1.46344 1224.14 1.46344C1196.64 1.46344 1173.59 20.1295 1167.47 45.2332C1161.36 20.1295 1138.31 1.46344 1110.81 1.46344C1110.28 1.46344 1109.75 1.47043 1109.22 1.48428C1108.69 1.47043 1108.16 1.46344 1107.63 1.46344C1080.13 1.46344 1057.08 20.129 1050.97 45.2322C1044.85 20.129 1021.8 1.46344 994.302 1.46344C993.889 1.46344 993.476 1.46768 993.065 1.47607C992.658 1.46768 992.251 1.46344 991.842 1.46344C963.726 1.46344 940.321 21.4671 935.303 47.9083C930.831 20.7452 906.786 0 877.796 0C862.9 0 849.31 5.47675 839.01 14.4868C828.52 22.9638 821.111 34.9678 818.673 48.6458C813.895 21.8399 790.022 1.46344 761.29 1.46344C760.999 1.46344 760.709 1.46555 760.42 1.4697C760.13 1.46555 759.84 1.46344 759.549 1.46344C728.799 1.46344 703.614 24.803 701.447 54.3847C699.28 24.803 674.095 1.46344 643.346 1.46344L643.194 1.46362L643.043 1.46344C612.293 1.46344 587.108 24.8037 584.941 54.386C582.775 24.8037 557.589 1.46344 526.839 1.46344C495.166 1.46344 469.397 26.2252 468.605 57.0649H468.568C467.785 26.2252 442.334 1.46344 411.052 1.46344C379.771 1.46344 354.32 26.2252 353.537 57.0649H353.5C352.707 26.2252 326.938 1.46344 295.265 1.46344C263.593 1.46344 237.824 26.2252 237.031 57.0649H236.993C236.201 26.2252 210.432 1.46344 178.759 1.46344C147.086 1.46344 121.317 26.2252 120.525 57.0649H120.487C119.695 26.2252 93.9259 1.46344 62.2531 1.46344C30.5803 1.46344 4.81126 26.2252 4.01878 57.0649H4Z" fill="#51294B"/>
                    </g>
                </svg>

            </div>
        </div>
    )
};


export default MainPage;