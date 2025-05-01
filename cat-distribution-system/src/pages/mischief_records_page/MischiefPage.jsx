import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MischiefPage.css";
import {
    addMischiefRecordBackend,
    deleteMischiefRecordBackend,
    fetchMischiefRecordsBackend, updateMischiefRecordBackend
} from "../../backend/backendMischiefRecordsManagement";
import FilterBar from "../../components/input_bars/FilterBar";
import SortDropdownMischief from "../../components/sort_dropdown/SortDropdownMischief";
import MischiefButton from "../../components/buttons/MischiefButton";
import AddMischiefModal from "./AddMischiefModal";
import UpdateMischiefModal from "./UpdateMischiefModal";

const MischiefPage = ({ catEntities }) => {
    const { catName } = useParams();
    const cat = catEntities.find(cat => cat.name.toLowerCase() === catName.toLowerCase());

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchValue, setSearchValue] = useState("");
    const [sortOption, setSortOption] = useState({ sortBy: null, ascending: null });
    const [wasCaught, setWasCaught] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        if (!cat) return;

        const fetchRecords = async () => {
            try {
                const data = await fetchMischiefRecordsBackend(cat.id, searchValue || null, sortOption.sortBy, sortOption.ascending, wasCaught)
                setRecords(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [cat, searchValue, sortOption, wasCaught]);

    const handleUpdateClick = async (record) => {
        try {
            setSelectedRecord(record);
            setShowUpdateForm(true);
        } catch (err) {
            setError(`Error fetching record details: ${err.message}`);
        }
    };

    if (!cat) return <div>Cat not found</div>;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="wrapper-mischief">
            <div className="sorting-filter-bar-mischief">
                <FilterBar onSearch={setSearchValue}></FilterBar>
                <SortDropdownMischief currentSort={sortOption} onSortChange={setSortOption} currentWasCaught={wasCaught} onWasCaughtChange={setWasCaught}></SortDropdownMischief>
            </div>
            {records.length === 0 ? (
                <p>No mischief records found for this cat.</p>
            ) : (
                <table className="table-mischief">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Severity</th>
                        <th>Was Caught</th>
                        <th className="no-table-border-mischief"></th>
                        <th className="no-table-border-mischief">
                            <MischiefButton content="+" color="#51294B" width="3.4vw" onClick={() => setShowAddForm(true)}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>{record.description}</td>
                            <td>{record.severity}</td>
                            <td>{record.was_caught ? "Yes" : "No"}</td>
                            <td><MischiefButton content="×" color="#51294B" width="3.4vw" onClick={() => deleteMischiefRecordBackend(record.id)}></MischiefButton></td>
                            <td><MischiefButton content="⇄" color="#51294B" width="3.4vw" onClick={() => handleUpdateClick(record)}></MischiefButton></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {showAddForm && (
                <AddMischiefModal
                    onClose={() => setShowAddForm(false)}
                    onSubmit={async (newRecord) => {
                        await addMischiefRecordBackend(cat.id, newRecord);
                        const updated = await fetchMischiefRecordsBackend(cat.id, searchValue, sortOption.sortBy, sortOption.ascending, wasCaught);
                        setRecords(updated);
                        setShowAddForm(false);
                    }}
                />
            )}
            {showUpdateForm && (
                <UpdateMischiefModal
                    record={selectedRecord}
                    onClose={() => setShowUpdateForm(false)}
                    onSubmit={async (updatedRecord) => {
                        await updateMischiefRecordBackend(updatedRecord);
                        const updated = await fetchMischiefRecordsBackend(cat.id, searchValue, sortOption.sortBy, sortOption.ascending, wasCaught);
                        setRecords(updated);
                        setShowUpdateForm(false);
                    }}
                />
            )}
        </div>
    );
};

export default MischiefPage;
