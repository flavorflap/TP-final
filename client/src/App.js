import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import Items from './components/items'
import Detail from './components/detail'
import Home from './components/home'
import { BrowserRouter, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <SearchBar />
          <Route exact path='/'  component={Home}/>
          <Route exact path='/items' component={Items}/>
          <Route path='/items/:id' component={Detail}/>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
