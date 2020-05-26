import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './auth/layout/Landing';
import Login from './components/layout/Landing';
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path ='/' component= {Landing} />
      </Fragment>
    </Router>
  );
}

export default App;
