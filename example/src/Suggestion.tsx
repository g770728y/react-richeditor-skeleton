import * as React from 'react';
import { data } from './data';

interface User {
  name: string;
  [k: string]: any;
}

interface IProps {
  keywords: string;
  onSelect: (data: User) => void;
}

interface IState {
  currentIndex: number;
}

class Suggestion extends React.Component<IProps, IState> {
  state: IState = {
    currentIndex: 0
  };

  items: User[] = [];

  onUp = () => {
    const { currentIndex } = this.state;
    console.log(currentIndex);
    if (currentIndex > 0) {
      this.setState({
        currentIndex: currentIndex - 1
      });
    }
  };

  onDown = () => {
    const { currentIndex } = this.state;
    if (currentIndex < this.items.length - 1) {
      this.setState({
        currentIndex: currentIndex + 1
      });
    }
  };

  onEnter = () => {
    const { currentIndex } = this.state;
    if (currentIndex >= 0 && currentIndex < this.items.length) {
      this.props.onSelect(this.items[currentIndex]);
    }
  };

  // TODO: 当keywords变化时, 重置 currentIndex

  render() {
    const { keywords, onSelect } = this.props;
    const _keywords = keywords.slice(1);
    const _data = data.filter(item => item.name.indexOf(_keywords) >= 0);
    this.items = _data;

    if (_data.length <= 0) return null;

    return (
      <div style={{ background: '#fff', border: '1px solid #ccc' }}>
        {_data.map((item, i) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              style={{
                background:
                  i === this.state.currentIndex ? '#ccc' : 'transparent'
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Suggestion;
