import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import AccountPage from './AccountPage';
import Header from './Header';
import Search from './Search';

import HomePage from './HomePage';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
// import LoggedInApp from "./components/LoggedInApp";
// import LoggedOutApp from "./components/LoggedOutApp";


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
      <>
      <Header />
      <NavBar user={user} setUser={setUser} />
      <main>
      <Switch>
      <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/account">
          <AccountPage />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/user/:id">
          <AccountPage />
        </Route>
      </Switch>
      </main>
      </>
      
    </div>
  );
}

export default App;
