import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DECORATION_CLASS_NAME, User } from './helper';

const _styles: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  zIndex: 1
};

const initialState = {
  left: -100000,
  top: -100000
};

export default class SuggestionContainer extends React.PureComponent<
  {},
  typeof initialState
> {
  state = initialState;

  el: HTMLElement;

  updatePosition = () => {
    const el = document.querySelector(`.${DECORATION_CLASS_NAME}`);
    if (!el) {
      this.setState(initialState);
    } else {
      const rect = el.getBoundingClientRect();
      this.setState({ left: rect.left, top: rect.bottom + window.pageYOffset });
    }
  };

  componentDidMount() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  componentWillUnmount() {
    this.el && document.body.removeChild(this.el);
  }

  render() {
    if (!this.el) return null;
    const { children } = this.props;
    return ReactDOM.createPortal(
      <div style={{ ..._styles, ...this.state }}>{children}</div>,
      this.el
    );
  }
}
