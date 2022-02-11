import './App.css';
import { useState, useEffect } from "react";
import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import AccountPage from './AccountPage';
import Header from './Header';
import Search from './Search';
import PostContainer from './PostContainer';
import Login from "./Login";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <Header />
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/home">
          <PostContainer user={user}/>
        </Route>
        <Route path="/account">
          <AccountPage user={user} name="account"/>
        </Route>
        <Route path="/search">
          <Search user={user}/>
        </Route>
        {/* <Route path="/user/:id">
          <AccountPage user={user} />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
