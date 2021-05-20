// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Home from './pages/Home';
import Detail from './pages/Detail';
import TvSeries from './pages/TvSeries';
import AddMovie from './pages/AddMovie';
import Edit from './pages/Edit';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div className="App">
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/detail/:id">
            <Detail></Detail>
          </Route>
          <Route exact path="/tv-series">
            <TvSeries></TvSeries>
          </Route>
          <Route exact path="/add-movie">
            <AddMovie></AddMovie>
          </Route>
          <Route exact path="/edit-movie/:id">
            <Edit></Edit>
          </Route>
        </div>
      </Router>
    </>
  );
}

export default App;
