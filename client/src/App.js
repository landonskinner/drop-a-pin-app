import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './NavBar';
import AccountPage from './AccountPage';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route path="/account">
          <AccountPage />
        </Route>

      </Switch>
      
      
    </div>
  );
}

export default App;
