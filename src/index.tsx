import React from 'react';
import { Editor, EditorProps, RenderMarkProps } from 'slate-react';
import { Editor as CoreEditor, Value, ValueJSON } from 'slate';
import Toolbar from './components/Toolbar';

import styles from './styles.css';
import { IconButton } from './components/Button';
import { BoldIcon, ItalicIcon } from './components/Icon';
import BoldPlugin from './plugins/Bold';
import { pick } from './components/utils';
const vv: ValueJSON = {
  document: {
    object: 'document',
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '在这里输入文字'
              }
            ]
          }
        ]
      }
    ]
  }
};

const initialValue = Value.fromJSON(vv);

interface IState {
  value: Value;
}

type IProps = {} & React.HTMLAttributes<any>;

const _plugins = [BoldPlugin()];
const plugins = _plugins.map(({ renderButton, ...rest }) => rest);

export default class RichEditor extends React.Component<IProps, IState> {
  state = { value: initialValue };

  editorRef = React.createRef<Editor>();

  onChange = ({ value }: { value: Value }) => {
    this.setState({ value });
  };

  renderEditor = (props: EditorProps, editor: CoreEditor, next: () => any) => {
    const children = next();
    let _buttons = pick(_plugins, 'renderButton').filter(Boolean);
    _buttons.sort((i: any, j: any) => (i.index < j.index ? -1 : 1));
    const buttons = _buttons.map(({ renderButton }) => {
      const { index, ui } = renderButton!(editor);
      return <React.Fragment key={index}>{ui}</React.Fragment>;
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
          ref={this.editorRef}
          value={this.state.value}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }
}
