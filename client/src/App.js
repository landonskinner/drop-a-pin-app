import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import AccountPage from './AccountPage';
import Header from './Header';
import Search from './Search';

function App() {
  return (
    <div className="App">
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
      
      
    </div>
  );
}

export default App;
