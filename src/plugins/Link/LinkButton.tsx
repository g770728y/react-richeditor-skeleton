import * as React from 'react';
import Button, { IconButton } from '../../components/Button';
import { LinkIcon } from '../../components/Icon';
import { Editor as CoreEditor } from 'slate';
import { hasLinks, unwrapLink, wrapLink } from './helper';
import styles from './styles.css';
import isEmptyStr from '../../helpers/utils';
import isUrl from 'is-url';

export interface LinkButtonProps {}

type IProps = {
  editor: CoreEditor;
};

interface IState {
  isShowPanel: boolean;
  text: string;
  url: string;
}

export default class LinkButton extends React.Component<IProps, IState> {
  state = {
    isShowPanel: false,
    text: '',
    url: ''
  };

  togglePanel = () => {
    this.setState({ isShowPanel: !this.state.isShowPanel });
  };

  handleClick = (e: React.SyntheticEvent<MouseEvent>) => {
    const { editor } = this.props;
    e.preventDefault();

    const { value } = editor;
    const _hasLinks = hasLinks(editor);

    if (_hasLinks) {
      unwrapLink(editor);
      return;
    }

    this.togglePanel();
  };

  handleTextChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({ text: (e.target! as any).value });
  };

  handleUrlChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({ url: (e.target! as any).value });
  };

  hidePanel = () => {
    this.setState({ isShowPanel: false });
  };

  handleSubmit = () => {
    const { text, url } = this.state;
    if (isEmptyStr(text) || !isUrl(url)) return;

    const { editor } = this.props;

    const isShowTextInput = editor.value.selection.isCollapsed;

    if (isShowTextInput) {
      editor.insertText(text).moveFocusBackward(text.length);
      wrapLink(editor, url);
    } else {
      wrapLink(editor, url);
    }

    this.hidePanel();
  };

  public render() {
    const { editor } = this.props;
    const { text, url, isShowPanel } = this.state;

    const isShowTextInput = editor.value.selection.isCollapsed;

    const urlInputColor = isUrl(url) ? 'inherit' : 'red';

    const isActive = hasLinks(editor);

    const textInput = (
      <div className={styles.row}>
        <div className={styles.label}>文本:</div>
        <div className={styles.input}>
          <input type="text" value={text} onChange={this.handleTextChange} />
        </div>
      </div>
    );

    const panel = (
      <div className={styles.panel}>
        <form onSubmit={this.handleSubmit}>
          {isShowTextInput && textInput}

          <div className={styles.row}>
            <div className={styles.label}>超链:</div>
            <div className={styles.input}>
              <input
                type="text"
                value={url}
                onChange={this.handleUrlChange}
                style={{ color: urlInputColor }}
              />
            </div>
          </div>

          <div className={styles.row} style={{ alignItems: 'flex-end' }}>
            <div style={{ flexGrow: 1 }} />
            <Button
              type="button"
              value="确定"
              primary
              onClick={this.handleSubmit}
            />
            <div style={{ width: 10 }} />
            <Button type="button" value="取消" onClick={this.hidePanel} />
          </div>
        </form>
      </div>
    );

    return (
      <div className={styles.container}>
        <IconButton active={isActive} onMouseDown={this.handleClick}>
          <LinkIcon />
        </IconButton>
        {isShowPanel && panel}
      </div>
    );
  }
}
