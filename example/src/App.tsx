import React, { Component } from 'react';
import './App.css';
import ReactRichEditor from 'react-richeditor-skeleton';

class App extends Component {
  render() {
    return (
      <div className={'container'}>
        <ReactRichEditor style={{ width: 500, height: 500 }} />
      </div>
    );
  }
}

export default App;
