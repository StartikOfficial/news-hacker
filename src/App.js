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
          <Route exact path="/news-hacker" component={MainPage} />
          <Route path="/news-hacker/:id" component={ItemPage} />
        </Switch>
          
      </Router>
    
      
    
  );
}

export default App;
