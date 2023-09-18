import React from 'react';
import PropTypes from 'prop-types';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';

function LoginPage({ loginSucess }) {
  const [errorMsg, setErrorMsg] = React.useState('');

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    error ? setErrorMsg(data) : loginSucess(data);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body login-container">
              <h2 className="card-title mb-4">
                Login untuk menggunakan aplikasi
              </h2>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              <LoginInput login={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginSucess: PropTypes.func.isRequired,
};

export default LoginPage;
