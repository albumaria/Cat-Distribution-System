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
                <div className="icon-main"><img src="https://i.imgur.com/EBpUlkS.png" alt="Icon" /></div>
            </div>

            <div  className="all-rectangles-main image-banner-main"/>


        </div>
    )
};


export default MainPage;