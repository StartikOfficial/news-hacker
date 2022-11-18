import './App.css';
import React from 'react';
import Header from './components/Header';
import MainPage from './components/MainPage';
import ItemPage from './components/ItemPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
      <Router>
        <Header />


        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/:id" component={ItemPage} />
        </Switch>
          
      </Router>
    
      
    
  );
}

export default App;
