import * as React from 'react';
import { RenderNodeProps, getEventTransfer, EditorProps } from 'slate-react';
import { Editor as CoreEditor, Inline } from 'slate';
import { IconButton } from '../../components/Button';
import { LinkIcon } from '../../components/Icon';
import isEmptyStr from '../../helpers/utils';
import isUrl from 'is-url';
import HoverInput from './HoverInput';
import {
  HoverInputDim,
  hasLinks,
  unwrapLink,
  wrapLink,
  TYPE,
  getLinks
} from './helper';
import LinkButton from './LinkButton';

function LinkPlugin(option?: {}) {
  let lastRange: Range;

  return {
    renderNode(props: RenderNodeProps, editor: CoreEditor, next: () => any) {
      const { attributes, children, node } = props;
      if (TYPE === node.type) {
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href} target="_blank">
            {children}
          </a>
        );
      }
      return next();
    },

    renderButton(editor: CoreEditor) {
      return <LinkButton editor={editor} />;
    },

    onPaste(event: ClipboardEvent, editor: CoreEditor, next: () => any) {
      const transfer = getEventTransfer(event!);
      const { type, text } = transfer as any;
      if (~['text', 'html'].indexOf(type) && isUrl(text)) {
        // 如果没有选中文本, 那么直接使用链接作为文本
        if (editor.value.selection.isCollapsed) {
          editor.insertText(text).moveAnchorBackward(text.length);
        }

        if (hasLinks(editor)) {
          unwrapLink(editor);
        }
        wrapLink(editor, text);
      } else {
        return next();
      }
    },

    renderEditor(props: EditorProps, editor: CoreEditor, next: () => any) {
      const { value } = editor;
      const { fragment, selection } = value;
      let styles: React.CSSProperties;
      const linkNode = getLinks(editor);
      let hrefValue: string = '';

      if (!linkNode) {
        styles = {};
      } else {
        if (!selection.isBlurred) {
          lastRange = window.getSelection().getRangeAt(0);
        }
        const rect = lastRange.getBoundingClientRect();

        hrefValue = linkNode.data.get('href');

        styles = {
          opacity: 1,
          top: `${rect.top + window.pageYOffset + rect.height + 10}px`,
          left: `${rect.left +
            window.pageXOffset -
            HoverInputDim.width / 2 +
            rect.width / 2}px`
        };
      }

      const children = next();
      return (
        <>
          {children}
          <HoverInput styles={styles} value={hrefValue} editor={editor} />
        </>
      );
    }
  };
}

export default LinkPlugin;
