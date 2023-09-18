import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../utils/network-data';
import PropTypes from 'prop-types';

function UserUpdate({ updateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('user');
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then(({ data }) => {
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
    });
  }, [id]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    updateUser({
      id,
      name,
      email,
      password,
      confPassword,
      role,
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label className="form-label">User Name</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder=""
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Set Role :</label>
        <select
          className="w-100 border-primary"
          name="role"
          id="role"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

UserUpdate.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default UserUpdate;
