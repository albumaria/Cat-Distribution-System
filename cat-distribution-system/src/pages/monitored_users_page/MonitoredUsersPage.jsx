import React, {useEffect, useState} from "react";
import '../mischief_records_page/MischiefPage.css';
import {getMonitoredUsersBackend} from "../../backend/BackendUserManagement";

const MonitoredUsersPage = () => {
    const [monitoredUsers, setMonitoredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getMonitoredUsersBackend();
                setMonitoredUsers(data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        fetchUsers();

        const interval = setInterval(() => {
            fetchUsers();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="wrapper-mischief">
            {monitoredUsers.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="table-mischief">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Creation Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {monitoredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.createdate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MonitoredUsersPage;
