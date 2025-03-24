import React from "react";
import "./MainPage.css"

const MainPage = ({ catEntities, setCatEntities }) => {
    // const navigate = useNavigate();
    //
    // const [searchQuery, setSearchQuery] = useState("");
    // const filteredCats = catEntities.filter(cat =>
    //     cat.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
    // );
    //
    // const [currentPage, setCurrentPage] = useState(1);
    // const [catsPerPage, setCatsPerPage] = useState(10);
    // const handlePageSizeChange = (newPageSize) => {
    //     setCatsPerPage(newPageSize);
    //     setCurrentPage(1);
    // };
    // const startIndex = (currentPage - 1) * catsPerPage;
    //
    // const totalPages = Math.ceil(filteredCats.length / catsPerPage);
    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };
    //
    // const [selectedCat, setSelectedCat] = useState(null);
    // const handleCatSelection = (cat) => {
    //     if (selectedCat === cat) {
    //         setCurrentSort("");
    //         setSortText("Sort ⬆");
    //         setAgeGroup("Show Kittens");
    //
    //         setCatEntities(prevCats => {
    //             const updatedCats = [...prevCats];
    //             navigate(`/${cat.name.toLowerCase()}`); // Navigate after updating
    //             return updatedCats;
    //         });
    //     } else {
    //         setSelectedCat(cat);
    //     }
    // };
    //
    // const handleDelete = () => {
    //     if (!selectedCat) return;
    //     setCatEntities(catEntities.filter(cat => cat !== selectedCat));
    //     setSelectedCat(null);
    //     setSearchQuery("");
    // };
    //
    // const handleAdd = () => {
    //     navigate("/add");
    // };
    //
    // const handleUpdate = () => {
    //     if (selectedCat) {
    //         navigate(`/update/${selectedCat.name.toLowerCase()}`);
    //     }
    // };
    //
    // const originalOrderRef = React.useRef([...catEntities]);
    // const [sortText, setSortText] = useState("Sort ⬆");
    // const [currentSort, setCurrentSort] = useState("");
    // const [preSortCats, setPreSortCats] = useState([]);
    // const handleSort = () => {
    //     if (currentSort === "") {
    //         setCurrentSort("asc");
    //         setPreSortCats([...catEntities]); // Save the current filtered list
    //         const sortedCats = [...catEntities].sort((a, b) => a.name.localeCompare(b.name));
    //         setCatEntities(sortedCats);
    //         setSortText("Sort ⬇");
    //     } else if (currentSort === "asc") {
    //         setCurrentSort("desc");
    //         const sortedCats = [...catEntities].sort((a, b) => b.name.localeCompare(a.name));
    //         setCatEntities(sortedCats);
    //         setSortText("Undo Sort");
    //     } else {
    //         setCurrentSort("");
    //         setCatEntities([...preSortCats]); // Restore the last filtered list, not all cats
    //         setSortText("Sort ⬆");
    //     }
    //
    //     setSelectedCat(null);
    // };
    //
    // const [ageGroup, setAgeGroup] = useState("Show Kittens");
    // const handleAgeGroups = () => {
    //     const allCats = [...originalOrderRef.current];
    //
    //     const kittens = allCats.filter(cat => cat.age >= 0 && cat.age <= 2);
    //     const adultCats = allCats.filter(cat => cat.age >= 3 && cat.age <= 10);
    //     const seniorCats = allCats.filter(cat => cat.age >= 11);
    //
    //     let newCatList;
    //
    //     if (ageGroup === "Show Kittens") {
    //         setAgeGroup("Show Adult Cats");
    //         newCatList = kittens;
    //     } else if (ageGroup === "Show Adult Cats") {
    //         setAgeGroup("Show Senior Cats");
    //         newCatList = adultCats;
    //     } else if (ageGroup === "Show Senior Cats") {
    //         setAgeGroup("Show All");
    //         newCatList = seniorCats;
    //     } else {
    //         setAgeGroup("Show Kittens");
    //         newCatList = allCats;
    //     }
    //
    //     setCatEntities(newCatList);
    //     setPreSortCats(newCatList);
    //     setCurrentSort("");
    //     setSortText("Sort ⬆");
    //     setSelectedCat(null);
    // };



    return (
        <div className="list-page-main">

            <div className="all-rectangles-main navbar-main"/>

            <div className="all-rectangles-main title-banner-main">
                <div className="icon-main"><img src="https://i.imgur.com/EBpUlkS.png" alt="CatIcon" /></div>
            </div>

            <div  className="all-rectangles-main image-banner-main">
                <div>WHOA</div>
                <img src="https://i.imgur.com/Yx7UrCS.png" style={{width: "50%", height: "85%"}} alt="CatBanner"></img>
            </div>

            <div className="orange-border-container-main">
                <svg width="100%" height="100%" viewBox="0 0 1754 358" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_113_192)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 59.0909V60.6064V330C4 341.046 12.9543 350 24 350H604.79H1612.21H1730C1741.05 350 1750 341.046 1750 330V56.3288C1749.94 57.2439 1749.89 58.1648 1749.87 59.0909H1749.83C1749.04 27.1562 1723.27 1.51544 1691.6 1.51544C1659.93 1.51544 1634.16 27.1562 1633.36 59.0909H1633.33C1632.53 27.1562 1606.77 1.51544 1575.09 1.51544C1575.02 1.51544 1574.95 1.51556 1574.88 1.51581L1574.8 1.51556L1574.68 1.51544C1562.25 1.51544 1550.74 5.56152 1541.34 12.441C1527.59 22.3752 1518.27 38.2175 1516.99 56.3164C1516.79 53.5022 1516.4 50.7426 1515.82 48.0513C1510.73 20.6924 1487.04 0 1458.59 0C1427.56 0 1402.2 24.6032 1400.43 55.625C1397.94 25.3212 1372.9 1.51544 1342.38 1.51544L1342.23 1.51562L1342.08 1.51544C1311.33 1.51544 1286.15 25.6766 1283.98 56.3022C1281.83 25.6766 1256.96 1.51544 1226.6 1.51544C1226.19 1.51544 1225.78 1.51981 1225.37 1.5285C1224.96 1.51981 1224.55 1.51544 1224.14 1.51544C1196.64 1.51544 1173.59 20.8442 1167.47 46.8391C1161.36 20.8442 1138.31 1.51544 1110.81 1.51544C1110.28 1.51544 1109.75 1.52267 1109.22 1.53702C1108.69 1.52267 1108.16 1.51544 1107.63 1.51544C1080.13 1.51544 1057.08 20.8437 1050.97 46.8381C1044.85 20.8437 1021.8 1.51544 994.302 1.51544C993.889 1.51544 993.476 1.51981 993.065 1.5285C992.658 1.51981 992.251 1.51544 991.842 1.51544C963.726 1.51544 940.321 22.2293 935.303 49.6092C930.831 21.4818 906.786 0 877.796 0C862.9 0 849.31 5.67145 839.01 15.0017C828.52 23.7797 821.111 36.2096 818.673 50.3728C813.895 22.6153 790.022 1.51544 761.29 1.51544C760.999 1.51544 760.709 1.51761 760.42 1.52191C760.13 1.51761 759.84 1.51544 759.549 1.51544C728.799 1.51544 703.614 25.6836 701.447 56.3155C699.28 25.6836 674.095 1.51544 643.346 1.51544L643.194 1.51562L643.043 1.51544C612.293 1.51544 587.108 25.6843 584.941 56.3168C582.775 25.6843 557.589 1.51544 526.839 1.51544C495.166 1.51544 469.397 27.1563 468.605 59.0909H468.568C467.785 27.1563 442.334 1.51544 411.052 1.51544C379.771 1.51544 354.32 27.1563 353.537 59.0909H353.5C352.707 27.1563 326.938 1.51544 295.265 1.51544C263.593 1.51544 237.824 27.1563 237.031 59.0909H236.993C236.201 27.1563 210.432 1.51544 178.759 1.51544C147.086 1.51544 121.317 27.1563 120.525 59.0909H120.487C119.695 27.1563 93.9259 1.51544 62.2531 1.51544C30.5803 1.51544 4.81128 27.1563 4.0188 59.0909H4Z" fill="#F2B45A"/>
                    </g>
                </svg>
            </div>

            <div className="list-container-main">
                <div className="all-rectangles-main buttons-list-main"></div>

                <div className="all-rectangles-main cat-list-main"></div>
            </div>
        </div>
    )
};


export default MainPage;