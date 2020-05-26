import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch }
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
}

export default App;
