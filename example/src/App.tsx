import React, { Component } from 'react';
import './App.css';
import ReactRichEditor from 'react-richeditor-skeleton';
import Suggestion from './Suggestion';

class App extends Component {
  render() {
    return (
      <div className={'container'}>
        <ReactRichEditor
          style={{ width: 500, height: 500, padding: '6px 12px' }}
        >
          {{
            suggestionNode: (keywords, onSelect) => (
              <Suggestion keywords={keywords} onSelect={onSelect} />
            )
          }}
        </ReactRichEditor>
      </div>
    );
  }
}

export default App;
