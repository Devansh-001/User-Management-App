import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import CreateUser from './Pages/CreateUser';
import EditUser from './Pages/EditUser';
import UserDetail from './Components/UserDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App
