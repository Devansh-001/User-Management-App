import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser } from '../api';

const UserForm = () => {
  const { users, setUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {

      const fetchUserInfo = users.find(user => user.id === parseInt(id, 10));

      setUser(fetchUserInfo);
    }
    catch (err) {
      setError('Failed to fetch user.');
    }
  };

  useEffect(() => {


    if (id) {
      setIsEditing(true);
      fetchUserData();
    }
  }, [id]);



  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {

        setUsers(prevUsers =>
          prevUsers.map(u => u.id === user.id ? { ...user } : u)
        );

      } else {
        const newUser = (await createUser(user)).data;


        newUser.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;


        setUsers(prevUsers => [...prevUsers, newUser]);
      }


      navigate('/');

    }
    catch (err) {
      setError('Failed to save user.');
      console.error('Error saving user:', err); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate('/');
  }


  return (
    
      <div id='userForm'>
        <div>
          {loading && <div>Loading...</div>}
          <h1>{isEditing ? 'Edit User' : 'Add New User'}</h1>
          {error && <div>{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="number"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
            <div id='formButtons'>
              <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
              <button onClick={goBack}>Back</button>
            </div>
          </form>
        </div>

      </div>
    
  );
};

export default UserForm;
