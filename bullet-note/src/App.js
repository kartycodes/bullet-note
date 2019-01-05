import React, { Component } from 'react';
import BulletEditor from './components/Editor/BulletEditor.js';
import Nav from './components/Nav.js';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Nav />
        <BulletEditor />
      </div>
    );
  }
}

export default App;
