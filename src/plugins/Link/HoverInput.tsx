import * as React from 'react';
import ReactDOM from 'react-dom';
import { HoverInputDim, TYPE } from './helper';
import { Editor as CoreEditor, Inline } from 'slate';
import isEmptyStr from '../../helpers/utils';
import isUrl from 'is-url';

export interface HoverInputProps {
  styles?: React.CSSProperties;
  value: string;
  editor: CoreEditor;
}

const _styles: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'stretch',
  alignItems: 'center',
  width: HoverInputDim.width,
  height: HoverInputDim.height,
  position: 'absolute',
  zIndex: 1,
  top: -100000,
  left: -100000,
  opacity: 0,
  backgroundColor: '#f6f6f6',
  borderRadius: 4,
  transition: 'opacity 0.75s'
};

const getLinks = (editor: CoreEditor) => {
  const { value } = editor;
  return value.inlines.find((inline: Inline) => inline.type === 'link');
};

const inputStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: 0,
  padding: '0 10px',
  background: 'transparent',
  borderBottom: '1px solid #e5e5e5'
};

class HoverInput extends React.Component<
  HoverInputProps,
  { invalidUrl: boolean }
> {
  state = { invalidUrl: false };

  changeHref = (e: React.SyntheticEvent) => {
    const { editor } = this.props;
    const linkNode = getLinks(editor);
    // 如果没有显示则不处理, 否则可能报错

    if (!linkNode) {
      return;
    }

    const href = (e.target! as any).value;
    if (isEmptyStr(href)) {
      editor.unwrapInlineByKey(linkNode.key, TYPE);
    } else {
      this.setState({ invalidUrl: !isUrl(href) });
      editor.setNodeByKey(linkNode.key, { type: TYPE, data: { href: href } });
    }
  };

  removeLink = () => {
    const { editor } = this.props;
    const linkNode = getLinks(editor);
    editor.unwrapInlineByKey(linkNode.key, TYPE);
  };

  render() {
    const { styles, value } = this.props;
    const { invalidUrl } = this.state;
    const root = window.document.getElementById('root');
    return ReactDOM.createPortal(
      <div style={{ ..._styles, ...styles }}>
        <input
          type="text"
          style={{ ...inputStyles, color: invalidUrl ? 'red' : undefined }}
          value={value || ''}
          onChange={this.changeHref}
        />
      </div>,
      root!
    );
  }
}

export default HoverInput;
