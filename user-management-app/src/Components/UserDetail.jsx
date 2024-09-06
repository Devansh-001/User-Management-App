import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { users } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {

    try {
      const foundUser = users.find(user => user.id === parseInt(id, 10));
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('Failed to fetch user.');
    } finally {
      setLoading(false);
    }

  }, [id])



  const goBack = () => {
    navigate('/');
  }



  return (
    <div id='userDetail'>

      <div>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {user && (
          <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <Link id='edit' to={`/edit/${user.id}`}>Edit</Link>
          </div>
        )}
        <button id='goBack1' onClick={goBack}>Back</button>
      </div>
    </div>
  );
};

export default UserDetail;