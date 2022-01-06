import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import AccountPage from './AccountPage';
import Header from './Header';
import Search from './Search';

function LoggedInApp({ setCurrentUser, currentUser }) {
  const handleLogout = () => {
    setCurrentUser(null);
    fetch("/logout", { method: "DELETE" });
  };
  return (
    <div>
      Welcome {currentUser.username}!

      <Header />
      <NavBar />
      <Switch>
        <Route path="/account">
          <AccountPage />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>

      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
}

export default LoggedInApp;
