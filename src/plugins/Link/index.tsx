import * as React from 'react';
import { RenderNodeProps } from 'slate-react';
import { Editor as CoreEditor, Inline } from 'slate';
import { IconButton } from '../../components/Button';
import { LinkIcon } from '../../components/Icon';
import isEmptyStr from '../../helpers/utils';

const TYPE = 'link';

const hasLinks = (editor: CoreEditor) => {
  const { value } = editor;
  return value.inlines.some((inline: Inline) => inline.type === TYPE);
};

const unwrapLink = (editor: CoreEditor) => {
  editor.unwrapInline(TYPE);
};

const wrapLink = (editor: CoreEditor, href: string) => {
  editor
    .wrapInline({
      type: TYPE,
      data: { href }
    })
    .moveToEnd();
};

const onClickLink = (
  editor: CoreEditor,
  event: React.SyntheticEvent<MouseEvent>
) => {
  event.preventDefault();

  const { value } = editor;
  const _hasLinks = hasLinks(editor);

  if (_hasLinks) {
    unwrapLink(editor);
  } else if (value.selection.isExpanded) {
    const href = window.prompt('enter url:') || '';

    if (isEmptyStr(href)) {
      return;
    }

    wrapLink(editor, href!);
  } else {
    const href = window.prompt('enter url:') || '';

    if (isEmptyStr(href)) {
      return;
    }

    const text = window.prompt('enter text:') || '';
    if (isEmptyStr(text)) return;

    editor.insertText(text).moveFocusBackward(text.length);

    wrapLink(editor, href);
  }
};

function LinkPlugin(option?: {}) {
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
      const isActive = hasLinks(editor);
      return (
        <>
          <IconButton
            active={isActive}
            onMouseDown={event => onClickLink(editor, event)}
          >
            <LinkIcon />
          </IconButton>
        </>
      );
    }
  };
}

export default LinkPlugin;
