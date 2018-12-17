import React from 'react';
import { Editor, EditorProps } from 'slate-react';
import { Editor as CoreEditor, Value } from 'slate';
import Toolbar from './components/Toolbar';

import styles from './styles.css';
import BoldPlugin from './plugins/Bold';
import { pick } from './components/utils';
import ItalicPlugin from './plugins/Italic';
import _initialValue from './initialValue';

const initialValue = Value.fromJSON(_initialValue);

interface IState {
  value: Value;
}

type IProps = {} & React.HTMLAttributes<any>;

const _plugins = [BoldPlugin(), ItalicPlugin()];
const plugins = _plugins.map(({ renderButton, ...rest }) => rest);

export default class RichEditor extends React.Component<IProps, IState> {
  state = { value: initialValue };

  onChange = ({ value }: { value: Value }) => {
    this.setState({ value });
  };

  renderEditor = (props: EditorProps, editor: CoreEditor, next: () => any) => {
    const children = next();
    let _buttons = pick(_plugins, 'renderButton').filter(Boolean);
    const buttons = _buttons.map(({ renderButton }, index) => {
      return (
        <React.Fragment key={index}>{renderButton!(editor)}</React.Fragment>
      );
    });
    return (
      <>
        {children}
        <Toolbar>{buttons}</Toolbar>
      </>
    );
  };

  render() {
    const { ...restProps } = this.props;
    return (
      <div className={styles.container} {...restProps}>
        <Editor
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }
}
