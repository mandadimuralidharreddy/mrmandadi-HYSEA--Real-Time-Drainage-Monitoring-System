import React ,{Component, useEffect}from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Normal from "./Normal"
export default function App() {
  
  return (
    <div>
      <Router>
        
        <Route
          path="/"
          exact
          render={() => 
          <Normal />}
        />
        
      </Router>
    </div>
    
  );
  
}

