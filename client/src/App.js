import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";


import Home from './pages/Home/Home';
import About from './pages/About/About';
import Editor from './pages/Editor/Editor';




import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div ClassName="App">

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about" component={About}></Route>
          <Route path="/editor"><Editor /></Route>
          <Route path="/" exact><Home /></Route>
        </Switch>
      </div>
    );
  }

}


export default App;