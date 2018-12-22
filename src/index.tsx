import React from 'react';
import { Editor, EditorProps, Plugin } from 'slate-react';
import { Editor as CoreEditor, Value } from 'slate';
import Toolbar from './components/Toolbar';

import styles from './styles.css';
import BoldPlugin from './plugins/Bold';
import { pluck } from './components/utils';
import ItalicPlugin from './plugins/Italic';
import _initialValue from './initialValue';
import HeadingPlugin from './plugins/Heading';
import BlockQuotePlugin from './plugins/Quote.tsx';
import OrderedListPlugin from './plugins/OrderedList';
import UnorderedListPlugin from './plugins/UnorderedList';
import LinkPlugin from './plugins/Link';
import ImagePlugin from './plugins/Image';
import MentionPlugin from './plugins/Mention';
import { User } from './plugins/Mention/helper';

const initialValue = Value.fromJSON(_initialValue);

interface IState {
  value: Value;
}

type IProps = {
  children?: {
    suggestionNode?: (
      keyword: string,
      onSelect: (data: User) => void
    ) => React.ReactNode;
  };
} & React.HTMLAttributes<any>;

export default class RichEditor extends React.Component<IProps, IState> {
  state = { value: initialValue };

  onAfterChanges: ((state: IState) => React.ReactNode)[];

  renderButtons: ((editor: CoreEditor) => React.ReactNode)[];

  editorRef = React.createRef<Editor>();
  _plugins: (Plugin & { renderButton?: any; onAfterChange?: any })[];
  plugins: Plugin[];

  constructor(props: IProps) {
    super(props);
    const { children } = this.props;

    this._plugins = [
      BoldPlugin(),
      ItalicPlugin(),
      HeadingPlugin(),
      BlockQuotePlugin(),
      OrderedListPlugin(),
      UnorderedListPlugin(),
      LinkPlugin(),
      ImagePlugin()
    ];

    children &&
      children.suggestionNode &&
      this._plugins.push(
        MentionPlugin({
          editorRef: this.editorRef,
          suggestionNode: children.suggestionNode
        })
      );

    this.plugins = this._plugins.map(
      ({ renderButton, onAfterChange, ...rest }) => rest
    );
    this.onAfterChanges = pluck(this._plugins, 'onAfterChange').filter(Boolean);
    this.renderButtons = pluck(this._plugins, 'renderButton').filter(Boolean);
  }

  // 如果plugin也有onChange方法,则:
  // 1. 在第1个渲染循环里, 先执行plugin.onChange
  // 2. 在第2个渲染循环里, 再执行onChange
  // 如果在render里打日志, 会看到两次输出
  onChange = ({ value }: { value: Value }) => {
    this.setState(
      state => {
        return { ...state, value };
      },
      () => {
        // onAfterChange的意义:
        // 1. 避免上面提到的onChange分两次执行导致的意外
        // 2. 实际应用中, plugin往往并不需要onChange方法去改state, 而是修改其它信息(比如mention.decoration)
        this.onAfterChanges.forEach(cb => cb(this.state));
        console.log('newValue:', JSON.stringify(value.toJSON()));
      }
    );
  };

  renderEditor = (props: EditorProps, editor: CoreEditor, next: () => any) => {
    // TODO: 存在优化空间: 把buttons上移
    const children = next();
    const buttons = this.renderButtons.map((renderButton, index) => {
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
    const { children, ...restProps } = this.props;
    return (
      <div className={styles.container} {...restProps}>
        <Editor
          autoFocus
          plugins={this.plugins}
          value={this.state.value}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          style={{ width: '100%', height: '100%' }}
          ref={this.editorRef}
        />
      </div>
    );
  }
}
