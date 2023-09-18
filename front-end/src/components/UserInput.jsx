import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function UserInput({ addUser }) {
  const [name, nameChangeHandler] = useInput('');
  const [email, emailChangeHandler] = useInput('');
  const [password, passwordChangeHandler] = useInput('');
  const [confPassword, confPasswordChangeHandler] = useInput('');
  const [role, roleChangeHandler] = useInput('user');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    addUser({
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
          placeholder="User Name"
          value={name}
          onChange={nameChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={emailChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={confPassword}
          onChange={confPasswordChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Set Role :</label>
        <select
          className="w-100 border-primary"
          name="role"
          id="role"
          onChange={roleChangeHandler}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

UserInput.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default UserInput;
