import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Items from './components/items'
import Detail from './components/detail'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path='/items' component={Items}/>
          <Route path='/items/:id' component={Detail}/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
