import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Signup from './Signup';
import { ThemeProvider } from '@mui/material'; // able to use theme prop
import theme from '../theme'; // library css styles

/** Should React-Router be imported in App or index.js? Does it matter? */
class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path ='/' element={<Login/>} />
          <Route path ='/signup' element={<Signup/>} />
          <Route path ='/main' element={<Dashboard/>} />
        </Routes>
      </Router>
      </ThemeProvider>
    )
  }

}

export default App;

