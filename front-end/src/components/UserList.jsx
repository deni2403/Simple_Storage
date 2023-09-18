import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserList({ users, deleteUser }) {
  return (
    <div className='table-responsive-sm'>
    <table className="table table-striped text-center">
      <thead className="table-primary">
        <tr>
          <th>No</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user, index) => (
          <tr key={user.uuid}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Link to={`/editUser/${user.uuid}`}>
                <button type="button" className="btn btn-success m-1">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteUser(user.uuid)}
                type="button"
                className="btn btn-danger m-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default UserList;
