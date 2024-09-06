import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../api';

const UserList = () => {
    const { users, setUsers } = useContext(UserContext);

    const [error, setError] = useState(null);

    const [gettingData, setGettingData] = useState(false);



    const getUsers = async () => {
        setGettingData(true);
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users.');
        } finally {
            setGettingData(false);
        }
    };


    const clearData = () => {
        setUsers([]);
    }


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter((user) => user.id !== id));
            } catch (err) {
                console.error('Error deleting user:', err);
                setError('Failed to delete user.');
            }
        }
    };

    return (
        <div id='userList'>

            {gettingData && <div>Loading...</div>}

            {error && <div>{error}</div>}

            <h1>User List</h1>

            <div id='navButtons'>

                <button onClick={getUsers}>Get Data</button>

                <Link className='link' to="/create">Create New User</Link>
            </div>

            {users.length === 0 ? <div id='noData'>
                No Data To Show.
            </div> :
                <>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                <Link className='link name' to={`/user/${user.id}`}>{user.name}</Link>

                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>

                                <div>
                                    <Link className='link edit' to={`/edit/${user.id}`}>Edit</Link>

                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearData}>Clear Data</button>
                </>

            }


        </div>
    );
};

export default UserList;