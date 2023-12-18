import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
 const [userID, setUserID] = useState('');
 const [userName, setUserName] = useState('');
 const [userEmail, setUserEmail] = useState('');
 const [editMode, setEditMode] = useState(false);

 useEffect(() => {
    getUsers();
 }, []);

 const getUsers = async () => {
    const result = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(result.data);
 };

 const addUser = async () => {
    const newUser = {
      id: userID,
      name: userName,
      email: userEmail
    };
    const result = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
    setUsers([...users, result.data]);
 };

 const deleteUser = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
 };

 const editUser = async (id) => {
    const updatedUser = {
      id: userID,
      name: userName,
      email: userEmail
    };
    const result = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
    setUsers(users.map(user => user.id === id ? result.data : user));
    setEditMode(false);
 };
  return (
    <div className="App">
      <header className="App-header">
      <div className="App">
      <input type="text" placeholder="Enter ID" value={userID} onChange={e => setUserID(e.target.value)} />
      <input type="text" placeholder="Enter Name" value={userName} onChange={e => setUserName(e.target.value)} />
      <input type="text" placeholder="Enter Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
      {!editMode ? 
        <button onClick={addUser}>Add User</button> : 
        <button onClick={() => editUser(userID)}>Edit User</button>
      }
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => {setEditMode(true); setUserID(user.id); setUserName(user.name); setUserEmail(user.email)}}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </header>
    </div>
  );
}

export default App;
