import React, { Component } from 'react';
import BulletEditor from './components/BulletEditor.js';

class App extends Component {

  onNewLineEntered() {
    alert("a new line was entered");
  }

  render() {
    return (
      <BulletEditor onNewLineEntered={this.onNewLineEntered}/>
    );
  }
}

export default App;
