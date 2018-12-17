import React from 'react';
import { Editor as CoreEditor } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import { RenderMarkProps } from 'slate-react';
import { IconButton } from './components/Button';
import { BoldIcon } from './components/Icon';

export function onKeyDown({ type, hotkey }: { type: string; hotkey: string }) {
  return function _onKeyDown(
    event: KeyboardEvent,
    editor: CoreEditor,
    next: () => any
  ) {
    if (isKeyHotkey(hotkey)(event)) {
      event.preventDefault();
      editor.toggleMark(type);
    } else {
      return next();
    }
  };
}

export function renderMark({
  type,
  tagName
}: {
  type: string;
  tagName: string;
}) {
  return function _renderMark(
    props: RenderMarkProps,
    editor: CoreEditor,
    next: () => any
  ) {
    const { children, mark, attributes } = props;
    if (mark.type === type) {
      return React.createElement(tagName, attributes, children);
    } else {
      return next();
    }
  };
}

const hasMark = (editor: CoreEditor, type: string) => {
  const { value } = editor;
  return value.activeMarks.some(mark => mark!.type === type);
};

const onClickMark = (
  editor: CoreEditor,
  event: React.MouseEvent,
  type: string
) => {
  event.preventDefault();
  editor.toggleMark(type);
};

export function renderButton({
  type,
  icon
}: {
  type: string;
  icon: React.FunctionComponent;
}) {
  return function renderButton(editor: CoreEditor) {
    const isActive = hasMark(editor, type);
    const IconClass = icon;
    return {
      index: 0,
      ui: (
        <>
          <IconButton
            active={isActive}
            onMouseDown={event => onClickMark(editor, event, type)}
          >
            <IconClass />
          </IconButton>
        </>
      )
    };
  };
}
