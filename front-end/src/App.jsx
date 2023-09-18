import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserLogged, logout } from './utils/network-data';
import ThemeContext from './contexts/ThemeContext';
import RoleContext from './contexts/RoleContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import AdminPage from './pages/admin/AdminPage';
import AddUserPage from './pages/admin/AddUserPage';
import EditUserPage from './pages/admin/EditUserPage';
import LoginPage from './pages/LoginPage';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'dark',
  );

  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [role, setRole] = React.useState(null);

  async function onLoginSuccess(userData) {
    setAuthedUser(userData);
    const {data} = await getUserLogged();
    setRole(data)
  }

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
      setRole(data)
    });
  }, []);

  
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  async function onLogout() {
    await logout();
    setAuthedUser(null);
  }

  if (initializing) {
    null;
  }

  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="app-container">
          <header>
            <Navigation />
          </header>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSucess={onLoginSuccess} />}
              />
            </Routes>
          </main>
          <Footer/>
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RoleContext.Provider value={role}>
        <div className="app-container">
          <header>
            <Navigation user={authedUser} logoutHandler={onLogout} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/addPage" element={<AddPage />} />
              <Route path="/editPage/:id" element={<EditPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/addUser" element={<AddUserPage />} />
              <Route path="/editUser/:id" element={<EditUserPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/forbidden" element={<Forbidden />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </RoleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
